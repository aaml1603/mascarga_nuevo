package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gofrs/uuid"
	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgconn"
	"github.com/jackc/pgx/v4"
	"github.com/jackc/pgx/v4/pgxpool"
	"golang.org/x/crypto/bcrypt"
)

const uri = "postgresql://postgres:XRBXItJPIJZIbexqTSiXPdUFUZifVfHG@shinkansen.proxy.rlwy.net:19248/railway"

// CORS configuration
const CORS_ORIGIN = "http://localhost:3003"

// Secret key for JWT signing
const HMACSecretKey = ";sliudfglkjlkjdsfhglkjsdflgjvnsldfhjgblshfbvvljfhbh"

// Token types
const (
	ACCESS  = 0
	REFRESH = 1
)

// Database models
type Registration struct {
	Nombre     string `json:"nombre"`
	Apellido   string `json:"apellido"`
	Correo     string `json:"correo"`
	Contrasena string `json:"contrasena"`
	Documento  string `json:"documento"`
	Direccion  string `json:"direccion"`
	Ciudad     string `json:"ciudad"`
	Estado     string `json:"estado"`
	Telefono   string `json:"telefono"`
}

type Entrega struct {
	ID            int       `json:"id"`
	UserID        uuid.UUID `json:"user_id"`
	Numero        string    `json:"numero"`
	Origen        string    `json:"origen"`
	Destino       string    `json:"destino"`
	FechaEstimada string    `json:"fecha_estimada"`
	Estado        string    `json:"estado"`
}

type Server struct {
	DB *pgxpool.Pool
}

type SignIn struct {
	Correo     string `json:"correo"`
	Contrasena string `json:"contrasena"`
}

type Claims struct {
	UserID    uuid.UUID
	TokenType int8
	jwt.RegisteredClaims
}

// CORS Middleware
func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", CORS_ORIGIN)
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// Generate JWT token
func GenerateHMac(userID uuid.UUID, tokenType int8, timeframe time.Time) (jwtToken string, err error) {
	if tokenType != ACCESS && tokenType != REFRESH {
		return "", fmt.Errorf("invalid token type")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, Claims{
		UserID:    userID,
		TokenType: tokenType,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    "mascarga",
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			ExpiresAt: jwt.NewNumericDate(timeframe),
		},
	})

	return token.SignedString([]byte(HMACSecretKey))
}

// Validate JWT token
func ValidateHmac(tokenString string) (uuid.UUID, int8, error) {
	if tokenString == "" {
		return uuid.Nil, -1, fmt.Errorf("empty token")
	}

	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(HMACSecretKey), nil
	})

	if err != nil {
		return uuid.Nil, -1, err
	}

	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return uuid.Nil, -1, fmt.Errorf("invalid token")
	}

	if claims.UserID == uuid.Nil || claims.Issuer != "mascarga" {
		return uuid.Nil, -1, fmt.Errorf("invalid token data")
	}

	return claims.UserID, claims.TokenType, nil
}

// Password hashing
func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hashedPassword), err
}

// Compare hashed password
func ComparePassword(plainPassword, hashedPassword string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword)) == nil
}

// Error response
func ErrorWithJson(w http.ResponseWriter, code int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(map[string]interface{}{"error": message, "code": code})
}

// Sign Up
func (s *Server) SignUpHandle(w http.ResponseWriter, r *http.Request) {
	var info Registration
	if err := json.NewDecoder(r.Body).Decode(&info); err != nil {
		log.Println("❌ JSON Decode Error:", err)
		ErrorWithJson(w, http.StatusUnprocessableEntity, "Invalid request payload")
		return
	}

	// Hash password
	hashedPassword, err := HashPassword(info.Contrasena)
	if err != nil {
		log.Println("❌ Password Hashing Error:", err)
		ErrorWithJson(w, http.StatusInternalServerError, "Failed to hash password")
		return
	}
	info.Contrasena = hashedPassword

	// Insert into database
	query := `INSERT INTO usuarios (nombre, apellido, correo, contrasena, documento, direccion, ciudad, estado, telefono)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`

	_, err = s.DB.Exec(context.Background(), query, info.Nombre, info.Apellido, info.Correo, info.Contrasena,
		info.Documento, info.Direccion, info.Ciudad, info.Estado, info.Telefono)

	if err != nil {
		if pgErr, ok := err.(*pgconn.PgError); ok {
			log.Println("❌ Database Error:", pgErr.Message, "| Code:", pgErr.Code) // ✅ Log database errors
			if pgErr.Code == "23505" {                                             // Unique violation
				ErrorWithJson(w, http.StatusConflict, "Email already in use")
				return
			}
		}
		log.Println("❌ Other Database Insert Error:", err) // ✅ Catch all errors
		ErrorWithJson(w, http.StatusInternalServerError, "Database error")
		return
	}

	log.Println("✅ User registered successfully:", info.Correo) // ✅ Success log
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User registered successfully!"})
}

// Sign In
func (s *Server) SignInHandle(w http.ResponseWriter, r *http.Request) {
	var info SignIn
	if err := json.NewDecoder(r.Body).Decode(&info); err != nil {
		ErrorWithJson(w, http.StatusUnprocessableEntity, "Invalid request payload")
		return
	}

	query := `SELECT user_id, contrasena FROM usuarios WHERE correo=$1`
	var userID uuid.UUID
	var storedPassword string

	err := s.DB.QueryRow(context.Background(), query, info.Correo).Scan(&userID, &storedPassword)
	if err == pgx.ErrNoRows {
		ErrorWithJson(w, http.StatusUnauthorized, "Invalid email or password")
		return
	} else if err != nil {
		ErrorWithJson(w, http.StatusInternalServerError, "Database error")
		return
	}

	if !ComparePassword(info.Contrasena, storedPassword) {
		ErrorWithJson(w, http.StatusUnauthorized, "Invalid email or password")
		return
	}

	token, err := GenerateHMac(userID, ACCESS, time.Now().Add(4*time.Hour))
	if err != nil {
		ErrorWithJson(w, http.StatusInternalServerError, "Token generation error")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"access_token": token})
}

func (s *Server) AddDeliveryHandle(w http.ResponseWriter, r *http.Request) {
	var entrega Entrega
	if err := json.NewDecoder(r.Body).Decode(&entrega); err != nil {
		log.Println("❌ JSON Decode Error:", err)
		ErrorWithJson(w, http.StatusUnprocessableEntity, "Invalid request payload")
		return
	}

	// Validate UUID format
	if entrega.UserID == uuid.Nil {
		ErrorWithJson(w, http.StatusBadRequest, "Invalid user ID")
		return
	}

	// Insert delivery into database (Ensure `fecha_estimada` is stored as `DATE`)
	query := `INSERT INTO entregas (user_id, numero, origen, destino, fecha_estimada, estado)
              VALUES ($1, $2, $3, $4, $5::DATE, $6) RETURNING id`

	err := s.DB.QueryRow(context.Background(), query, entrega.UserID, entrega.Numero, entrega.Origen, entrega.Destino, entrega.FechaEstimada, entrega.Estado).Scan(&entrega.ID)

	if err != nil {
		log.Println("❌ Database Insert Error:", err)
		ErrorWithJson(w, http.StatusInternalServerError, "Failed to add delivery")
		return
	}

	log.Println("✅ Delivery added successfully for user:", entrega.UserID)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":     "Delivery added successfully!",
		"delivery_id": entrega.ID,
	})
}

func (s *Server) GetUserDeliveries(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		ErrorWithJson(w, http.StatusUnauthorized, "Missing token")
		return
	}

	tokenString := authHeader[len("Bearer "):]
	userID, _, err := ValidateHmac(tokenString)
	if err != nil {
		ErrorWithJson(w, http.StatusUnauthorized, "Invalid or expired token")
		return
	}

	// Query database and format `fecha_estimada` correctly
	query := `SELECT id, user_id, numero, origen, destino, 
			TO_CHAR(fecha_estimada, 'YYYY-MM-DD') AS fecha_estimada, estado 
			FROM entregas WHERE user_id = $1`

	rows, err := s.DB.Query(context.Background(), query, userID)
	if err != nil {
		log.Println("❌ Database Query Error:", err)
		ErrorWithJson(w, http.StatusInternalServerError, "Database error")
		return
	}
	defer rows.Close()

	var deliveries []Entrega
	for rows.Next() {
		var entrega Entrega
		err := rows.Scan(&entrega.ID, &entrega.UserID, &entrega.Numero, &entrega.Origen, &entrega.Destino, &entrega.FechaEstimada, &entrega.Estado)
		if err != nil {
			log.Println("❌ Data Parsing Error:", err)
			ErrorWithJson(w, http.StatusInternalServerError, "Data processing error")
			return
		}
		deliveries = append(deliveries, entrega)
	}

	// Send JSON response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(deliveries)
}

func (s *Server) UpdateDeliveryHandle(w http.ResponseWriter, r *http.Request) {
	var entrega Entrega
	if err := json.NewDecoder(r.Body).Decode(&entrega); err != nil {
		log.Println("❌ JSON Decode Error:", err)
		ErrorWithJson(w, http.StatusUnprocessableEntity, "Invalid request payload")
		return
	}

	// Validate ID
	if entrega.ID == 0 {
		ErrorWithJson(w, http.StatusBadRequest, "Missing delivery ID")
		return
	}

	// Update the estado field in the database
	query := `UPDATE entregas SET estado = $1 WHERE id = $2`

	_, err := s.DB.Exec(context.Background(), query, entrega.Estado, entrega.ID)
	if err != nil {
		log.Println("❌ Database Update Error:", err)
		ErrorWithJson(w, http.StatusInternalServerError, "Failed to update delivery status")
		return
	}

	log.Println("✅ Delivery updated successfully:", entrega.ID)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Delivery updated successfully!"})
}

// Main function
func main() {
	pool, err := pgxpool.Connect(context.Background(), uri)
	if err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}
	log.Println("Connected to database successfully!") // ✅ Add this log
	defer pool.Close()

	mux := http.NewServeMux()
	s := &Server{DB: pool}

	mux.HandleFunc("POST /signup", s.SignUpHandle)
	mux.HandleFunc("POST /signin", s.SignInHandle)
	mux.HandleFunc("POST /add_delivery", s.AddDeliveryHandle)
	mux.HandleFunc("GET /info", s.GetUserDeliveries)
	mux.HandleFunc("PUT /update_delivery", s.UpdateDeliveryHandle)

	handler := CorsMiddleware(mux)

	log.Println("Server running on port 8080...")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}

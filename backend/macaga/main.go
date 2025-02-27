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
	"github.com/jackc/pgx/v4/pgxpool"
	"golang.org/x/crypto/bcrypt"
)

const uri = "postgresql://postgres:XRBXItJPIJZIbexqTSiXPdUFUZifVfHG@shinkansen.proxy.rlwy.net:19248/railway"

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

const (
	ACCESS = iota
	REFRESH
)

//id:serial, userid:forenkey, number, origin, destination, expevted:date, status:choose form intransit, delivered, proccesing

const HMACSecretKey = ";sliudfglkjlkjdsfhglkjsdflgjvnsldfhjgblshfbvvljfhbh"

func GenerateHMac(userID uuid.UUID, tokenType int8, timeframe time.Time) (jwtToken string, err error) {
	if tokenType != 0 && tokenType != 1 {
		return "", fmt.Errorf("wrong tokent type")
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
	


	tkstring, err := token.SignedString(HMACSecretKey)
	if err != nil {
		return "", err
	}

	return tkstring, nil
}

func AuthMiddleware(next http.HandlerFunc) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")
		if token == "" {
			w.WriteHeader(http.StatusForbidden)
			return
		}

		userID, tokenType, err := ValidateHmac(token)
		if err != nil {
			w.WriteHeader(http.StatusForbidden)
			return
		}

		if tokenType != ACCESS {
			w.WriteHeader(http.StatusForbidden)
			return
		}

		r.Header.Add("X-GAUTH-USERID", userID.String())
		next.ServeHTTP(w, r)
	})
}

// use ts for thje middleware nigga
func ValidateHmac(tokenString string) (UUID uuid.UUID, tokenType int8, err error) {
	if tokenString == "" {
		return uuid.Nil, -1, fmt.Errorf("token is empty")
	}

	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return HMACSecretKey, nil
	})

	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return uuid.Nil, -1, fmt.Errorf("invalid token")
	}

	if claims.UserID == uuid.Nil {
		return uuid.Nil, -1, fmt.Errorf("invalid uuid")
	}

	if claims.Issuer != "mascarga" {
		return uuid.Nil, -1, fmt.Errorf("invalid issuer")
	}

	return claims.UserID, claims.TokenType, nil
}


func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	
	return string(hashedPassword), nil
}

func ComparePassword(hashedPassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}


func ErrorWithJson(w http.ResponseWriter, code int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)

	response := map[string]interface{}{
		"error": message,
		"code":  code,
	}

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

func (s *Server) SignUpHandle(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var info Registration
	if err := json.NewDecoder(r.Body).Decode(&info); err != nil {
		http.Error(w, "Error in signup request", http.StatusUnprocessableEntity)
		return
	}

	query := `INSERT INTO usuarios (nombre, apellido, correo, contrasena, documento, direccion, ciudad, estado, telefono)
			  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`

	hp, err := HashPassword(info.Contrasena)
	if err != nil {
		ErrorWithJson(w,  http.StatusInternalServerError, "failed to hash password")
		return
	}
	info.Contrasena = hp

	_, err = s.DB.Exec(context.Background(), query,
		info.Nombre, info.Apellido, info.Correo, info.Contrasena,
		info.Documento, info.Direccion, info.Ciudad, info.Estado, info.Telefono)

	if err != nil {
		http.Error(w, "Failed to insert data into database", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, "User %s %s registered successfully!", info.Nombre, info.Apellido)
}

func (s *Server) SignInHandle(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var info SignIn
	if err := json.NewDecoder(r.Body).Decode(&info); err != nil {
		http.Error(w, "Error in signup request", http.StatusUnprocessableEntity)
		return
	}

	query := `SELECT user_id, contrasena FROM usuarios WHERE correo=$1 `

	var contrasena string
	var user_id uuid.UUID

	err := s.DB.QueryRow(context.Background(), query, info.Correo).Scan(&user_id, &contrasena)
	if err != nil {
		ErrorWithJson(w, http.StatusInternalServerError, err.Error())
		return
	}

	if !ComparePassword(contrasena, info.Contrasena) {
		ErrorWithJson(w, http.StatusUnauthorized, "Passwords dont match")
		return
	}

	at, err := GenerateHMac(user_id, ACCESS, time.Now().Add(4 * time.Hour))
	if err != nil {
		ErrorWithJson(w, http.StatusInternalServerError, "faile to genberate access token")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(map[string]string{"access_token":at}); err != nil {
		ErrorWithJson(w, http.StatusInternalServerError, "faile to encode jwt token")
		return
	}
}


func (s *Server) UserInfoHandler(w http.ResponseWriter, r *http.Request){
	w.Write([]byte("nigger"))
}

func main() {
	pool, err := pgxpool.Connect(context.Background(), uri)
	if err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}
	defer pool.Close()

	mux := http.NewServeMux()
	s := &Server{DB: pool}
	mux.HandleFunc("POST /signup", s.SignUpHandle)
	mux.HandleFunc("POST /signin", s.SignInHandle)
	mux.HandleFunc("GET /info", s.UserInfoHandler)

	log.Println("Server running on port 8080...")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
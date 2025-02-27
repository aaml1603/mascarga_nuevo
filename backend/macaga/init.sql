CREATE TABLE deliveries (
    id SERIAL PRIMARY KEY,
    userid INT REFERENCES users(user_id), 
    number VARCHAR(50) NOT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    expected DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('intransit', 'delivered', 'processing')) NOT NULL
);


--  chanegh ser id name to name of table of user and name of pirmay key
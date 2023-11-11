CREATE TABLE my_table (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cellphone_number VARCHAR(15) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);


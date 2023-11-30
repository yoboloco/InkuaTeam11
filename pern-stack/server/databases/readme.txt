crear una base de datos llamada PERN
 las tablas a utilizar son 4:

 my_table(guarda los datos del formulario de contacto)

 CREATE TABLE your_table_name (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cellphone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

project(guarda titulo y descripcion de los proyectos)
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

url(guarda las url de las imgenes subidas a cloudinary)
CREATE TABLE url (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

proyectos(guarda titulo, descripcion, url de la imagen cargada en cloudinary y es la que muestra todo en la pagina principal)
CREATE TABLE proyectos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

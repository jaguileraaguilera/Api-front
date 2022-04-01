CREATE TABLE IF NOT EXISTS autores(
id INT(255) NOT NULL AUTO_INCREMENT,
nombre VARCHAR(255) COLLATE 'utf8mb4_spanish_ci',
lugar_nacimiento VARCHAR(255) COLLATE 'utf8mb4_spanish_ci',

PRIMARY KEY (id),
UNIQUE KEY (nombre)
);
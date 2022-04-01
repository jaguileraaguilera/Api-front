CREATE TABLE IF NOT EXISTS libros(
id VARCHAR(255) NOT NULL COLLATE 'utf8mb4_spanish_ci',
id_autor INT(255) NOT NULL,
titulo VARCHAR(255) COLLATE 'utf8mb4_spanish_ci',
editorial VARCHAR(255) COLLATE 'utf8mb4_spanish_ci',
lugar_publicacion VARCHAR(255) COLLATE 'utf8mb4_spanish_ci',
fecha VARCHAR(255) COLLATE 'utf8mb4_spanish_ci',
descripcion VARCHAR(1000) COLLATE 'utf8mb4_spanish_ci',

PRIMARY KEY (id),
CONSTRAINT fk_autor FOREIGN KEY (id_autor) REFERENCES autores(id)
);

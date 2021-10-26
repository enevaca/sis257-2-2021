DROP TABLE usuarios;
DROP TABLE canciones;
DROP TABLE albums;
DROP TABLE generos;
DROP TABLE interpretes;

CREATE TABLE interpretes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  nacionalidad VARCHAR(100) NULL 
);
CREATE TABLE generos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(100)
);
CREATE TABLE albums (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_interprete INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  fecha_lanzamiento DATE NOT NULL,
  CONSTRAINT fk_albums_interpretes FOREIGN KEY(id_interprete) REFERENCES interpretes(id)
);
CREATE TABLE canciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_album INT NOT NULL,
  id_genero INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  duracion TIMESTAMP NOT NULL,
  tags VARCHAR(250) NULL DEFAULT '',
  url VARCHAR(250) NULL DEFAULT ''
);
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(15) NOT NULL,
  clave VARCHAR(500) NOT NULL,
  email VARCHAR(50) NOT NULL,
  rol VARCHAR(20) NOT NULL,
  premium BOOLEAN NOT NULL DEFAULT false
);

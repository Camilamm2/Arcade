-- Crear la base de datos
CREATE DATABASE arcadedb;

-- Usar la base de datos recién creada
USE arcadedb;

-- Crear la tabla de usuarios
CREATE TABLE `users` (
  `PlayerId` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(10) NOT NULL,
  `CreateDate` DATETIME DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`PlayerId`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Crear la tabla de juegos
CREATE TABLE `games` (
  `GameId` INT(11) NOT NULL AUTO_INCREMENT,
  `GameName` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`GameId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertar juegos en la tabla Games
INSERT INTO games (GameName)
VALUES
    ('Piedra, Papel y Tijera'),
    ('Ahorcado'),
    ('Astucia Naval');

-- Crear la tabla de puntajes
CREATE TABLE `scores` (
  `ScoreId` INT(11) NOT NULL AUTO_INCREMENT,
  `PlayerId` INT(11) DEFAULT NULL,
  `GameId` INT(11) DEFAULT NULL,
  `Score` INT(11) DEFAULT NULL,
  PRIMARY KEY (`ScoreId`),
  KEY `PlayerId` (`PlayerId`),
  KEY `GameId` (`GameId`),
  CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`PlayerId`) REFERENCES `users` (`PlayerId`) ON DELETE CASCADE,
  CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`GameId`) REFERENCES `games` (`GameId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Crear la tabla de palabras (para el juego del ahorcado)
CREATE TABLE `words` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `word` VARCHAR(255) NOT NULL,
  `hint` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertar palabras en la tabla Words
INSERT INTO words (word, hint)
VALUES
    ('GATO', 'Animal doméstico'),
    ('CASA', 'Lugar donde vives'),
    ('SOL', 'Estrella de nuestro sistema solar'),
    ('ARBOL', 'Planta de gran tamaño'),
    ('LIBRO', 'Objeto para leer'),
    ('COMPUTADORA', 'Dispositivo electrónico para trabajar'),
    ('MUSICA', 'Arte de combinar sonidos'),
    ('PERRO', 'Animal doméstico conocido por su lealtad'),
    ('MONTANA', 'Elevación natural del terreno'),
    ('LUNA', 'Satélite natural de la Tierra'),
    ('CIELO', 'Espacio sobre la Tierra que vemos durante el día o la noche'),
    ('RAP', 'Género musical caracterizado por la rima rápida'),
    ('CINE', 'Lugar donde se proyectan películas'),
    ('FLORES', 'Plantas con pétalos coloridos utilizadas en decoración'),
    ('CIELO', 'Atmósfera visible sobre la Tierra'),
    ('MAR', 'Gran masa de agua salada que cubre gran parte de la Tierra'),
    ('TIERRA', 'Planeta donde vivimos'),
    ('ESTRELLA', 'Cuerpo celeste que brilla en el cielo durante la noche'),
    ('ABUELO', 'Padre de uno de tus padres');

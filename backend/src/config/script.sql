-- Crear la base de datos
CREATE DATABASE arcadedb;

-- Usar la base de datos recién creada
USE arcadedb;

-- Crear la tabla de usuarios
CREATE TABLE `users` (
  `PlayerId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(10) NOT NULL,
  `CreateDate` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`PlayerId`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Crear la tabla de juegos
CREATE TABLE `games` (
  `GameId` int(11) NOT NULL AUTO_INCREMENT,
  `GameName` varchar(100) NOT NULL,
  PRIMARY KEY (`GameId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Crear la tabla de puntajes
CREATE TABLE `scores` (
  `ScoreId` int(11) NOT NULL AUTO_INCREMENT,
  `PlayerId` int(11) DEFAULT NULL,
  `GameId` int(11) DEFAULT NULL,
  `Score` int(11) DEFAULT NULL,
  PRIMARY KEY (`ScoreId`),
  KEY `PlayerId` (`PlayerId`),
  KEY `GameId` (`GameId`),
  CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`PlayerId`) REFERENCES `users` (`PlayerId`) ON DELETE CASCADE,
  CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`GameId`) REFERENCES `games` (`GameId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- Insertar juegos en la tabla Games
INSERT INTO games (GameName)
VALUES
    ('Piedra, Papel y Tijera'),
    ('Ahorcado'),
    ('Astucia Naval');

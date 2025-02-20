-- Crear la base de datos
CREATE DATABASE ArcadeDB;

-- Usar la base de datos recién creada
USE ArcadeDB;

-- Crear la tabla de usuarios
CREATE TABLE Users (
    PlayerId INT PRIMARY KEY AUTO_INCREMENT,  -- ID único del jugador
    Name VARCHAR(100) NOT NULL UNIQUE,        -- Nombre del jugador (debe ser único)
    TotalScore INT DEFAULT 0,                 -- Puntaje total acumulado
    CreateDate DATETIME DEFAULT CURRENT_TIMESTAMP -- Fecha de creación de la cuenta
);


-- Crear la tabla de juegos
CREATE TABLE Games (
    GameId INT PRIMARY KEY AUTO_INCREMENT,   -- ID único del juego
    GameName VARCHAR(100) NOT NULL           -- Nombre del juego
);

-- Crear la tabla de puntajes
CREATE TABLE Scores (
    ScoreId INT PRIMARY KEY AUTO_INCREMENT,  -- ID único del puntaje
    PlayerId INT,                             -- ID del jugador (FK de la tabla Users)
    GameId INT,                               -- ID del juego (FK de la tabla Games)
    Score INT,                                -- Puntaje obtenido en el juego
    FOREIGN KEY (PlayerId) REFERENCES Users(PlayerId) ON DELETE CASCADE,
    FOREIGN KEY (GameId) REFERENCES Games(GameId) ON DELETE CASCADE
);

-- Insertar juegos en la tabla Games
INSERT INTO Games (GameName)
VALUES
    ('Piedra, Papel y Tijera'),
    ('Ahorcado'),
    ('Astucia Naval');

DROP DATABASE IF EXISTS puffinpowerDB;
CREATE DATABASE puffinpowerDB;

USE puffinpowerDB;

CREATE TABLE Users (
	userIndex INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(100) NOT NULL,
    passwordName VARCHAR(100) NOT NULL,
    accessLevel INT NOT NULL,
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	createdAt TIMESTAMP NOT NULL,
	primary key(userIndex)
);

CREATE TABLE Puffins (
	puffinIndex INT AUTO_INCREMENT NOT NULL,
    puffinName VARCHAR(100),
    gender VARCHAR(100),
    age INT,
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	createdAt TIMESTAMP NOT NULL,
	primary key(puffinIndex)
);

CREATE TABLE Public (
	publicIndex INT AUTO_INCREMENT NOT NULL,
    publicName VARCHAR(100),
    comments TEXT,
    photos VARCHAR(2048),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	createdAt TIMESTAMP NOT NULL,
	primary key(publicIndex)
);

CREATE TABLE Notes (
	notesIndex INT AUTO_INCREMENT NOT NULL,
    notes TEXT NOT NULL,
    puffinIndex INT NOT NULL,
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	createdAt TIMESTAMP NOT NULL,
	primary key (notesIndex),
    FOREIGN KEY (puffinIndex) REFERENCES Puffins(puffinIndex)
);

CREATE TABLE Imageurls (
	imgIndex INT AUTO_INCREMENT NOT NULL,
    imgurl VARCHAR(255),
    artistName VARCHAR(255),
    puffinIndex INT NOT NULL,
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	createdAt TIMESTAMP NOT NULL,
	primary key(imgIndex),
    FOREIGN KEY (puffinIndex) REFERENCES Puffins(puffinIndex)
);
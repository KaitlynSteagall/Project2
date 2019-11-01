DROP DATABASE IF EXISTS puffinpowerDB;
CREATE DATABASE puffinpowerDB;

USE puffinpowerDB;

CREATE TABLE users (
	userIndex INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(100) NOT NULL,
    passwordName VARCHAR(100) NOT NULL,
    accessLevel INT NOT NULL,
	primary key(userIndex)
);

CREATE TABLE puffins (
	puffinIndex INT AUTO_INCREMENT NOT NULL,
    puffinName VARCHAR(100),
    gender VARCHAR(100),
    age INT,
	primary key(puffinIndex)
);

CREATE TABLE public (
	publicIndex INT AUTO_INCREMENT NOT NULL,
    publicName VARCHAR(100),
    comments TEXT,
    photos VARCHAR(2048),
	primary key(publicIndex)
);

CREATE TABLE notes (
	notesIndex INT AUTO_INCREMENT NOT NULL,
    notes TEXT NOT NULL,
    puffinIndex INT NOT NULL,
	primary key (notesIndex),
    FOREIGN KEY (puffinIndex) REFERENCES puffins(puffinIndex),
);

CREATE TABLE imageurls (
	imgIndex INT AUTO_INCREMENT NOT NULL,
    imgurl VARCHAR(255),
    artistName VARCHAR(255),
    puffinIndex INT NOT NULL,
	primary key(imgIndex),
    FOREIGN KEY (puffinIndex) REFERENCES puffins(puffinIndex)
);
DROP DATABASE IF EXISTS puffinpowerDB;
CREATE DATABASE puffinpowerDB;

USE DATABASE puffinpowerDB;

CREATE TABLE users (
	userIndex INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(100) NOT NULL,
    passwordName VARCHAR(100) NOT NULL,
    accessLevel INT NOT NULL,
	primary key(index),
);

USE DATABASE puffinpowerDB;

CREATE TABLE puffins (
	puffinIndex INT AUTO_INCREMENT NOT NULL,
    puffinName VARCHAR(100),
    gender VARCHAR(100),
    age INT,
    photos VARCHAR(10000),
	primary key(index)
);

USE DATABASE puffinpowerDB;

CREATE TABLE public (
	publicIndex INT AUTO_INCREMENT NOT NULL,
    publicName VARCHAR(100),
    comments VARCHAR(100),
    photos VARCHAR(2048),
	primary key(index)
);

USE DATABASE puffinpowerDB;

CREATE TABLE notes (
	notesIndex INT AUTO_INCREMENT NOT NULL,
    puffinName VARCHAR(100) NOT NULL,
    userName VARCHAR(100) NOT NULL,
    notes TEXT NOT NULL,
	primary key(index),
    FOREIGN KEY (puffinName) REFERENCES puffins(puffinName),
    FOREIGN KEY (userName) REFERENCES users(userName)
);
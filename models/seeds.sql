INSERT INTO Public (publicName, comments, createdAt)
VALUES ("jessica", "I spotted this cute puffin with tag 1 on it's leg and took a photo", now());

INSERT INTO Public (publicName, comments, createdAt)
VALUES ("babycakes", "I spotted this cute puffin with tag 8 on it's leg over by the lake", now());

INSERT INTO Public (publicName, comments, createdAt)
VALUES ("jazzyJ", "I spotted this cute puffin but I couldn't make out the tag number, but I took a photo", now());

INSERT INTO Puffins (puffinName, gender, age, createdAt)
VALUES ("blubbers", "female", 15, now());

INSERT INTO Puffins (puffinName, gender, age, createdAt)
VALUES ("feathers", "female", 5, now());

INSERT INTO Puffins (puffinName, gender, age, createdAt)
VALUES ("beaker", "male", 3, now());

INSERT INTO Puffins (puffinName, gender, age, createdAt)
VALUES ("buster", "male", 12, now());

INSERT INTO Puffins (puffinName, gender, age, createdAt)
VALUES ("pecan", "female", 2, now());

INSERT INTO Puffins (puffinName, gender, age, createdAt)
VALUES ("bobby", "male", 1, now());

INSERT INTO Puffins (puffinName, gender, age, createdAt)
VALUES ("jazzy", "male", 8, now());

INSERT INTO Puffins (puffinName, gender, age, createdAt)
VALUES ("pecky", "female", 17, now());

INSERT INTO Puffins (puffinName, gender, age, createdAt)
VALUES ("bubbles", "female", 0, now());

INSERT INTO Puffins (puffinName, gender, age, createdAt)
VALUES ("cuddles", "male", 4, now());

INSERT INTO Users (userName, passwordName, accessLevel, createdAt)
VALUES ("tashton", "test", 1, now());

INSERT INTO Users (userName, passwordName, accessLevel, createdAt)
VALUES ("cvelazquez", "test1", 2, now());

INSERT INTO Users (userName, passwordName, accessLevel, createdAt)
VALUES ("rpetit", "test2", 1, now());

INSERT INTO Users (userName, passwordName, accessLevel, createdAt)
VALUES ("mmartsyalis", "test3", 2, now());

INSERT INTO Users (userName, passwordName, accessLevel, createdAt)
VALUES ("rcarmody", "test4", 2, now());

INSERT INTO Users (userName, passwordName, accessLevel, createdAt)
VALUES ("ksteagall", "test5", 1, now());

INSERT INTO Users (userName, passwordName, accessLevel, createdAt)
VALUES ("mgetsoian", "test6", 1, now());

INSERT INTO Users (userName, passwordName, accessLevel, createdAt)
VALUES ("lebner", "test7", 2, now());

INSERT INTO Users (userName, passwordName, accessLevel, createdAt)
VALUES ("wclements", "test8", 2, now());

INSERT INTO Users (userName, passwordName, accessLevel, createdAt)
VALUES ("nsylwester", "test9", 2, now());

INSERT INTO Notes (notes, puffinIndex, createdAt)
VALUES ("blubbers spent an hour this morning collecting shiny rocks", 1, now());

INSERT INTO Notes (notes, puffinIndex, createdAt)
VALUES ("saw puffin #1 over on the west camera today, she's been wandering", 1, now());

INSERT INTO Imageurlss (imgurl, artistName, puffinIndex, createdAt)
VALUES ("https://mediad.publicbroadcasting.net/p/shared/npr/styles/x_large/nprshared/201908/746246904.jpg", "Jane Doe", 1, now());

INSERT INTO Imageurlss (imgurl, artistName, puffinIndex, createdAt)
VALUES ("https://www.telegraph.co.uk/content/dam/Travel/2018/July/puffin-sad-GettyImages-564344853.jpg", "Jane Doe", 1, now());
CREATE KEYSPACE IF NOT EXISTS rewards WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};

USE rewards;

DROP TABLE IF EXISTS rewards;

CREATE TABLE IF NOT EXISTS rewards (id varchar, projectId int, pledgeAmount int, name text, description text, item1 text, item2 text, item3 text, isLimited boolean, limitCount varchar, estDeliv text, shipsTo text, backers int, PRIMARY KEY (id));

COPY rewards (id, projectId, pledgeAmount, name, description, item1, item2, item3, isLimited, limitCount, estDeliv, shipsTo, backers) FROM 'rewards.csv' WITH HEADER=true and DELIMITER=',';

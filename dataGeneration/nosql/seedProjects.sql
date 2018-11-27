CREATE KEYSPACE IF NOT EXISTS rewards WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};

USE rewards;

CREATE TABLE IF NOT EXISTS projects (id int, location text, PRIMARY KEY (id));

COPY projects FROM 'projects.csv' WITH HEADER=true;
import { promisify } from "util";
import { createConnection } from "mysql";

const connection = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const execQuery = promisify(connection.query.bind(connection));

async function seedDatabase() {
  const dropDatabase = `DROP DATABASE IF EXISTS authors`;
  const createDatabase = `CREATE DATABASE authors`;
  const useDatabase = `USE authors`;

  const CREATE_AUTHORS_TABLE = `
    CREATE TABLE authors (
      author_no INT NOT NULL PRIMARY KEY,
      author_name VARCHAR(50),
      university VARCHAR(50),
      date_of_birth DATE,
      h_index INT,
      gender ENUM ('m' , 'f')
    );`;

  const ADD_MENTOR_COLUMN = `
  ALTER TABLE authors ADD COLUMN mentor INT`;

  const DEFINE_FOREIGN_KEY = `
  ALTER TABLE authors ADD FOREIGN KEY (mentor) REFERENCES authors (author_no)`;

  const INSERT_VALUES = `
  INSERT INTO authors VALUES
    (1, 'Ensar', 'Marmara University', '1989-02-03', 12, 'm', 1),
    (2, 'Ertugrul', 'Istanbul University', '1981-01-01', 15, 'm', 1),
    (3, 'Huseyin', 'Marmara University', '1982-01-01', 17, 'm', 2),
    (4, 'Sina', 'Frij University', '1992-01-01', 10, 'm', 3),
    (5, 'Onur', 'Marmara University', '1993-01-01', 17, 'm', 3),
    (6, 'Talha', 'Istanbul University', '1988-01-01', 15, 'm', 4),
    (7, 'Aykut', 'Marmara University', '1994-01-01', 10, 'm', 5),
    (8, 'Burak', 'Oxford University', '1994-01-01', 9, 'm', 5),
    (9, 'Fedor', 'Marmara University', '1986-01-01', 15, 'm', 3),
    (10, 'Mohammed', 'London University', '1989-01-01', 14, 'm', 3),
    (11, 'Ali', 'Marmara University', '1987-01-01', 12, 'm', 2),
    (12, 'Radhi', 'Harvard University', '1989-01-01', 16, 'm', 3),
    (13, 'Osama', 'Marmara University', '1989-01-01', 17, 'm', 1),
    (14, 'Bashar', 'Oxford University', '1992-01-01', 12, 'm', 1),
    (15, 'Nour', 'Harvard University', '1989-01-01', 20, 'm', F)`;

  connection.connect();
  try {
    await Promise.all[
      (execQuery(dropDatabase),
      execQuery(createDatabase),
      execQuery(useDatabase),
      execQuery(CREATE_AUTHORS_TABLE),
      execQuery(ADD_MENTOR_COLUMN),
      execQuery(DEFINE_FOREIGN_KEY),
      execQuery(INSERT_VALUES))
    ];
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();

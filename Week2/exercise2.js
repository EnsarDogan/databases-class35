import { promisify } from "util";
import { createConnection } from "mysql";

const connection = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "authors",
});

const execQuery = promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_RESEARCH_PAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS research_Papers (
      paper_id INT NOT NULL PRIMARY KEY,
      paper_title VARCHAR(50),
      conference VARCHAR(50),
      publish_date DATE
    );`;

  const CREATE_RESEARCH_PAPERS_AUTHORS_TABLES = `
    CREATE TABLE  IF NOT EXISTS research_Papers_Authors (
      paper_id INT,
      author_no INT,
      FOREIGN KEY (paper_id) REFERENCES research_Papers (paper_id),
      FOREIGN KEY (author_no) REFERENCES authors (author_no),
      PRIMARY KEY (paper_id, author_no)
    );`;

  const INSERT_VALUES_RESEARCH_PAPERS_TABLE = `
    INSERT INTO research_Papers VALUES
        (1, 'HTML', 'Introduction to HTML', '2020-01-01'),
        (2, 'Head in HTML', 'Introduction to Head in HTML', '2020-01-02'),
        (3, 'Body in HTML', 'Introduction to Body in HTML', '2020-01-03'),
        (4, 'ES6 in HTML', 'Introduction to ES6 in HTML', '2020-01-04'),
        (5, 'Basic CSS', 'Introduction to CSS', '2020-01-05'),
        (6, 'IDs in CSS', 'CSS IDs', '2020-01-06'),
        (7, 'Classes in CSS', 'CSS Classes', '2020-01-07'),
        (8, 'Flex in CSS', 'Introduction to Flex', '2020-01-08'),
        (9, 'Grid in CSS', 'Introduction to Grid in CSS', '2020-01-09'),
        (10, 'ES6 in CSS', 'ES6 in CSS', '2020-01-10'),
        (11, 'Basic Javascript', 'Introduction to Javascript', '2020-01-11'),
        (12, 'Variables in JS', 'Variables in JS', '2020-01-12'),
        (13, 'Algorithms in JS', 'Algorithms in JS', '2020-01-13'),
        (14, 'Arrays in JS', 'Arrays in JS', '2020-01-14'),
        (15, 'Objects in JS', 'Objects in JS', '2020-01-15'),
        (16, 'DOM in JS', 'DOM in JS', '2020-01-16'),
        (17, 'Selectors in JS', 'Selectors in JS', '2020-01-17'),
        (18, 'API in JS', 'API in JS', '2020-01-18'),
        (19, 'Public APIs in JS', 'Public APIs in JS', '2020-01-19'),
        (20, 'Private APIs in JS', 'Private APIs in JS', '2020-01-20'),
        (21, 'API KEYS in JS', 'API KEYS in JS', '2020-01-21'),
        (22, 'Basic NODEJS', 'Basic NODEJS', '2020-01-22'),
        (23, 'RESTFUL APIs', 'RESTFUL APIs', '2020-01-23'),
        (24, 'CRUD Operations', 'CRUD Operations', '2020-01-24'),
        (25, 'Introduction to Databases', 'Introduction to Databases', '2020-01-25'),
        (26, 'MYSQL Setup', 'MYSQL Setup', '2020-01-26'),
        (27, 'Queries in MYSQL', 'Queries in MYSQL', '2020-01-27'),
        (28, 'NoSQL', 'NoSQL', '2020-01-28'),
        (29, 'MongoDB', 'MongoDB', '2020-01-29'),
        (30, 'Mongoose', 'Mongoose', '2020-01-30')
    `;

  const INSERT_VALUES_RESEARCH_PAPERS_AUTHORS = `
    INSERT INTO research_Papers_Authors VALUES 
        (1, 1),
        (1, 6),
        (2, 12),
        (3, 13),
        (4, 1),
        (4, 15),
        (5, 7),
        (6, 8),
        (7,10),
        (7, 11),
        (8, 14),
        (9, 15),
        (10, 3),
        (11, 11),
        (11, 5),
        (12, 9),
        (13, 6),
        (14, 10),
        (15, 11),
        (15, 1),
        (16, 2),
        (17, 3),
        (18, 4),
        (18, 5),
        (19, 6),
        (20, 12),
        (21, 13),
        (22, 10),
        (22, 5),
        (23, 6),
        (24, 8),
        (25, 10),
        (26, 11),
        (27, 14),
        (28, 3),
        (28, 5),
        (29, 1),
        (30, 2),
        (20, 15)
    `;

  connection.connect();
  try {
    await Promise.all[
      (execQuery(CREATE_RESEARCH_PAPERS_TABLE),
      execQuery(CREATE_RESEARCH_PAPERS_AUTHORS_TABLES),
      execQuery(INSERT_VALUES_RESEARCH_PAPERS_TABLE),
      execQuery(INSERT_VALUES_RESEARCH_PAPERS_AUTHORS))
    ];
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();

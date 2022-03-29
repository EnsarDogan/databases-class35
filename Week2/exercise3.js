import { createConnection } from "mysql";

const connection = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "authors",
});

const showResults = (query) => {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    } else {
      console.table(results);
    }
  });
};

const SELECT_AUTHORS_AND_MENTORS = `
    SELECT A.author_name , B.author_name AS mentor FROM authors AS A
    INNER JOIN authors AS B
    ON A.mentor = B.author_no`;

const SELECT_AUTHORS_AND_PAPER_TITLES = `
SELECT authors.*, research_papers.paper_title 
FROM authors 
LEFT JOIN research_papers_authors 
ON research_papers_authors.author_no = authors.author_no 
LEFT JOIN research_papers 
ON research_papers_authors.paper_id = research_papers.paper_id;`;

connection.connect();

showResults(SELECT_AUTHORS_AND_MENTORS);
showResults(SELECT_AUTHORS_AND_PAPER_TITLES);

connection.end();

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

const SHOW_ALL_RESEARCH_PAPERS_AND_AUTHORS_COUNT = `
SELECT research_Papers.paper_title, count(research_Papers_Authors.author_no) AS authors_count 
FROM research_Papers 
INNER JOIN research_Papers_Authors 
ON research_Papers.paper_id = research_Papers_Authors.paper_id 
GROUP BY research_papers.paper_title;`;

const SHOW_RESEARCH_PAPERS_PUBLISHED_BY_FEMALE_AUTHORS = `
SELECT COUNT(research_papers_authors.paper_id) from authors 
INNER JOIN research_papers_authors 
ON authors.author_no = research_papers_authors.author_no 
GROUP BY Gender
HAVING gender = 'f';`;

const SHOW_AVG_H_INDEX_PER_UNIVERSITY = `SELECT university, AVG(h_index) FROM authors GROUP BY university;`;

const SHOW_SUM_RESEARCH_PAPERS_PER_UNIVERSITY = `
SELECT university, COUNT(research_papers_authors.paper_id) AS sum_of_research_papers 
FROM authors 
INNER JOIN research_papers_authors 
ON authors.author_no = research_papers_authors.author_no
GROUP BY university;`;

const SHOW_MIN_MAX_H_INDEX_PER_UNIVERSITY = `
SELECT university, MIN(h_index) AS minimum_h_index, MAX(h_index) AS maximum_h_index
FROM authors 
GROUP BY university;`;

connection.connect();

showResults(SHOW_ALL_RESEARCH_PAPERS_AND_AUTHORS_COUNT);
showResults(SHOW_RESEARCH_PAPERS_PUBLISHED_BY_FEMALE_AUTHORS);
showResults(SHOW_AVG_H_INDEX_PER_UNIVERSITY);
showResults(SHOW_SUM_RESEARCH_PAPERS_PER_UNIVERSITY);
showResults(SHOW_MIN_MAX_H_INDEX_PER_UNIVERSITY);

connection.end();

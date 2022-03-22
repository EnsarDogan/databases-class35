var mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

const showResults = (error, results) => {
  if (error) throw error;
  console.log(results);
};

connection.connect();

connection.query(
  "SELECT Name FROM country WHERE Population > 8000000;",
  showResults
);

connection.query(
  "SELECT Name FROM country WHERE Name LIKE '%land%'",
  showResults
);

connection.query(
  "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000",
  showResults
);

connection.query(
  "SELECT Name FROM country WHERE Continent = 'Europe'",
  showResults
);

connection.query(
  "SELECT Name FROM country ORDER BY SurfaceArea DESC",
  showResults
);

connection.query(
  "SELECT Name FROM city WHERE CountryCode = 'NLD'",
  showResults
);

connection.query(
  "SELECT Population FROM city WHERE Name = 'Rotterdam'",
  showResults
);

connection.query(
  "SELECT * FROM country ORDER BY SurfaceArea DESC LIMIT 10",
  showResults
);

connection.query("SELECT SUM(Population) FROM country", showResults);

connection.end();

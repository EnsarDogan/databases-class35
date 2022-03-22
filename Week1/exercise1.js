var mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const showResults = (error, results) => {
  if (error) throw error;
  console.log(results);
};

connection.connect();

connection.query("DROP DATABASE IF EXISTS meetup", showResults);

connection.query("CREATE DATABASE meetup", showResults);

connection.query("USE meetup", showResults);

connection.query(
  `CREATE TABLE Invitee(
      invitee_no INT, invitee_name VARCHAR(50), invited_by VARCHAR(50)
    )`,
  showResults
);

connection.query(
  `CREATE TABLE Room(
          room_no INT, room_name VARCHAR(50), floor_number INT
        )`,
  showResults
);

connection.query(
  `CREATE TABLE Meeting(
        meeting_no INT, meeting_title VARCHAR(50), starting_time DATETIME, ending_time DATETIME, room_no INT
      )`,
  showResults
);

connection.query(
  `INSERT INTO Invitee 
      VALUES 
        (1, 'Ensar', 'HackYourFuture'),
        (2, 'Ertugrul', 'HackYourFuture'),
        (3, 'Huseyin', 'HackYourFuture'),
        (4, 'Sina', 'HackYourFuture'),
        (5, 'Onur', 'HackYourFuture')`,
  showResults
);

connection.query(
  `INSERT INTO Room 
        VALUES 
          (101, 'HTML Hall', 1),
          (201, 'CSS Hall', 2),
          (301, 'Javascript Hall', 3),
          (401, 'Node.js Hall', 4),
          (501, 'Mysql Hall', 5)`,
  showResults
);

connection.query(
  `INSERT INTO Meeting 
      VALUES 
        (1, 'HTML', '2022-04-04 09:00:00', '2022-04-08 17:00:00', 101),
        (2, 'CSS', '2022-04-11 09:00:00', '2022-04-15 17:00:00', 201),
        (3, 'Javascript', '2022-04-18 09:00:00', '2022-04-22 17:00:00', 301),
        (4, 'Node.js', '2022-04-25 09:00:00', '2022-04-29 17:00:00', 401),
        (5, 'Mysql', '2022-05-02 09:00:00', '2022-05-06 17:00:00', 501)`,
  showResults
);

connection.end();

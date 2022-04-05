const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  const dropDatabase = `DROP DATABASE IF EXISTS transactions`;
  const createDatabase = `CREATE DATABASE transactions`;
  const useDatabase = `USE transactions`;

  const CREATE_ACCOUNT_TABLE = `
  CREATE TABLE account (
    account_number INT PRIMARY KEY NOT NULL,
    balance DECIMAL(19, 2)
    )`;

  const CREATE_ACCOUNT_CHANGES_TABLE = `
    CREATE TABLE account_changes (
      change_number INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
      account_number INT,
      amount DECIMAL(19, 2),
      changed_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      remark VARCHAR(50),
      FOREIGN KEY (account_number) REFERENCES account(account_number)
      )`;

  const AUTO_INCREMENT = `ALTER TABLE account_changes AUTO_INCREMENT=1`;
  try {
    await execQuery(dropDatabase);
    await execQuery(createDatabase);
    await execQuery(useDatabase);
    await execQuery(CREATE_ACCOUNT_TABLE);
    await execQuery(CREATE_ACCOUNT_CHANGES_TABLE);
    await execQuery(AUTO_INCREMENT);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();

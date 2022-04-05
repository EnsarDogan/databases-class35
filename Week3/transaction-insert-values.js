const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transactions",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();
  const INSERT_ACCOUNT_TABLE = `
    INSERT IGNORE INTO account VALUES
        (101, 12865.96),
        (102, 0.00),
        (103, 1074.50),
        (104, 2056.05),
        (105, 500.00)`;

  const INSERT_ACCOUNT_CHANGES_TABLE = `
    INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES
        (101, 1050.00, NOW(), "Monthly Rent"),
        (102, 55.97, NOW(), "Supermarket"),
        (103, 500.00, NOW(), "Loan"),
        (104, 800.00, NOW(), "App Purchase"),
        (105, 100.00, NOW(), "Pay for Ukranie")`;

  try {
    await execQuery(INSERT_ACCOUNT_TABLE);
    await execQuery(INSERT_ACCOUNT_CHANGES_TABLE);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();

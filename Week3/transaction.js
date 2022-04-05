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
  const sendMoneyFrom103To105 =
    "UPDATE account SET balance = balance - 100.00 WHERE account_number = 101";
  const getMoneyFrom103as105 =
    "UPDATE account SET balance = balance + 100.00 WHERE account_number = 105";
  const logTheTransaction = `
        INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES
            (101, 100, NOW(), "Sent to 105"),
            (105, 100, NOW(), "Got 100 from 101")`;
  try {
    await execQuery("START TRANSACTION");
    await execQuery(sendMoneyFrom103To105);
    await execQuery(getMoneyFrom103as105);
    await execQuery(logTheTransaction);
    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
}

seedDatabase();

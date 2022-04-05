const prompt = require("prompt");
const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  multipleStatements: true,
});

const input = util.promisify(prompt.get.bind(this));

function cb(error, result) {
  if (error) {
    console.log(error.message);
    return;
  }
  console.log(result);
}

function getPopulation(Country, name, code, cb) {
  connection.query(
    `SELECT Population FROM ${Country}
     WHERE Name = '${name}'
     and code = '${code}'
    `,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result);
    }
  );
}

// If it is not secured, then some malicious users type name: "asd 'OR' 1=1" and code: "asd 'OR' 1=1;" and get all the records on the tables.

// We can just change the function like this and with that way we can prevent malicious users getting all the records

function getPopulation2(Country, name, code, cb) {
  connection.query(
    `SELECT Population FROM ${Country} WHERE Name =` +
      connection.escape(name) +
      " and code =" +
      connection.escape(code),
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result);
    }
  );
}

async function queryDatabase() {
  let tableName = "";
  let countryName = "";
  let countryCode = "";

  prompt.start();

  try {
    const resultTableName = await input(["Table Name"]);
    tableName = resultTableName["Table Name"];

    const resultCountryName = await input(["Country Name"]);
    countryName = resultCountryName["Country Name"];

    const resultCountryCode = await input(["Country Code"]);
    countryCode = resultCountryCode["Country Code"];

    connection.connect();

    // The unsecure function
    //getPopulation(tableName, countryName, countryCode, cb);

    //The secure function
    getPopulation2(tableName, countryName, countryCode, cb);
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

queryDatabase();

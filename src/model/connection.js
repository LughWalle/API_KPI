const Pool = require('pg').Pool

const connection = new Pool(
 {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: true
});

module.exports = connection;
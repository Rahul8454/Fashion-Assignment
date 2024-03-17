const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fasionDB',
  password: 'password',
  port: 5432,
})

// exports pg db connection
module.exports = pool;
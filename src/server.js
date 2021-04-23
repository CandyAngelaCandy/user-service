const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

const port = 8000;
app.listen(port, () => {
  console.log('We are listen on ' + port);
});

createUsersTable()
app.post('/api/user', async function (req, res) {
  addUser()
  res.send("add user success")
})

// create user table
function createUsersTable() {
  const createUsersTableSql = `
  CREATE TABLE users (
    id              bigserial primary key,
    name            varchar(300),
    email           varchar(300),
    phone_number    varchar(50)
 )`

  pool.query(createUsersTableSql, function (err, result) {
    if (err) {
      console.log('add user table error --', err.message);
      return;
    }
    console.log('add users stable error', err)
  });

}

// add user
function addUser() {
  const addSql = 'INSERT INTO users (name, email, phone_number)\n' +
    'VALUES (\'jerry\',\'jerry@test.com\', \'123123\');';

  pool.query(addSql, function (err, result) {
    if (err) {
      console.log('insert error - ', err.message);
      return;
    }

    console.log('insert id:', result);
  });
}




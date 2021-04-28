const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

// check table if exist
function isUsersTableExist() {
  const selectUsersTable = `
    select count(*) from information_schema.tables where table_schema='public' 
    and table_type='BASE TABLE' and table_name='users';
  `
  pool.query(selectUsersTable, function (err, result) {
    if (err) {
      console.log('check users table if exist error --', err.message);
      return;
    }
    console.log('check users table if exist successfully', result)
    return result === 1
  });
}


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
    console.log('add users stable successfully', result)
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

module.exports={
  createUsersTable,
  addUser,
  isUsersTableExist
}

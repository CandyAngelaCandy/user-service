const express = require('express');
const app = express();
const cors = require('cors')
const {createUsersTable, addUser, isUsersTableExist} = require('./database')

app.use(cors())

const port = 8000;
app.listen(port, () => {
  console.log('We are listen on ' + port);
});

if(!isUsersTableExist()) {
  createUsersTable()
}

app.post('/api/user', async function (req, res) {
  addUser()
  res.send("add user success")
})






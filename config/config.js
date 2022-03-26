require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.USERNAME_DB,
    "password": process.env.PASSWORD_DB,
    "database": process.env.NAME_DB,
    "host": process.env.HOST_DB,
    "dialect": "mysql"
  },
  "test": {
     "username": process.env.USERNAME_DB,
    "password": process.env.PASSWORD_DB,
    "database": process.env.NAME_DB,
    "host": process.env.HOST_DB,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USERNAME_DB,
    "password": process.env.PASSWORD_DB,
    "database": process.env.NAME_DB,
    "host": process.env.HOST_DB,
    "dialect": "mysql"
  },
  secretPhrase: process.env.SECRET
}

require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const host = process.env.HOST
const dialect = process.env.DIALECT

const dbHandler = new Sequelize(DB_NAME, DB_USER, '', {
    host, dialect
})

dbHandler.sync()

module.exports = { dbHandler:dbHandler, DataTypes:DataTypes }
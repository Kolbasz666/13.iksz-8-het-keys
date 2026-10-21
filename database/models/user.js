const { dbHandler, DataTypes } = require('../dbConnection')
const table = dbHandler.define('users',{
    id:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    username:{
        allowNull: false,
        type: DataTypes.STRING
    },
    password:{
        allowNull: false,
        type: DataTypes.STRING
    }
},{
    tableName: 'users'
})

module.exports = table
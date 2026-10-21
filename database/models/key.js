const { dbHandler, DataTypes } = require('../dbConnection')
const table = dbHandler.define('keys',{
    id:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    ownerId:{
        allowNull: false,
        type: DataTypes.INTEGER
    },
    room:{
        allowNull: false,
        type: DataTypes.STRING
    }
},{
    tableName: 'keys'
})

module.exports = table
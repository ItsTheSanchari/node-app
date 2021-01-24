const Sequelize = require('sequelize')
const sequelize = require('./../utils/database')

const User = sequelize.define('users',{
    id : {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email : {
        type:Sequelize.STRING,
        allowNull:false,
    },
    name : {
        type:Sequelize.STRING,
    }
})
module.exports = User
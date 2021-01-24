const { INTEGER } = require('sequelize')
const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DOUBLE
    },
    imageUrl: {
        type: Sequelize.STRING
    }

})

module.exports = Product
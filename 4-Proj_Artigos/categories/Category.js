const Sequelize = require('sequelize')
const connection = require('../database/connection')

const Category = connection.define('categories', {
   title: {
      type: Sequelize.STRING,
      allowNull: false
   },
   slug: {
      type: Sequelize.STRING,
      allowNull: false
   }
});

//Category.sync({force: false}) //remover dps de criar

module.exports = Category

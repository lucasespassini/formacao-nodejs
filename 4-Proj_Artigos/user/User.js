const Sequelize = require('sequelize')
const connection = require('../database/connection')

const User = connection.define('users', {
   email: {
      type: Sequelize.STRING,
      allowNull: false
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false
   }
});

//User.sync({force: false}) //remover dps de criar

module.exports = User

const Sequelize = require('sequelize')
const connection = require('../database/connection')
// Relacionamento
const Category = require('../categories/Category')

const Article = connection.define('articles', {
   title: {
      type: Sequelize.STRING,
      allowNull: false
   },
   slug: {
      type: Sequelize.STRING,
      allowNull: false
   },
   body: {
      type: Sequelize.TEXT,
      allowNull: false
   }
});

// Relacionamento
Category.hasMany(Article) //Uma categoria tem muitos artigos
Article.belongsTo(Category) //Um Artigo pertence a uma categoria

//Article.sync({force: false}) //remover dps de criar

module.exports = Article

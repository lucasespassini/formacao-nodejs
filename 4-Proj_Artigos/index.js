const express = require('express')
const app = express()
const session = require('express-session')
const connection = require('./database/connection')

const categoryController = require('./categories/CategoryController')
const articleController = require('./articles/ArticleController')
const userController = require('./user/UserController')

const Article = require('./articles/Article')
const Category = require('./categories/Category')
const User = require('./user/User')

// View engine
app.set('view engine', 'ejs')

// Session 
app.use(session({
   secret: 'alskdjf',
   cookie: {
      maxAge: 60000 * 60 // 1 segundo = 1000 miliSegundos
   }
}))

// Static
app.use(express.static('public'))

// Body parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Database
connection.authenticate().then(() => {
   console.log('Conexão feita com sucesso!')
}).catch((err) => {
   console.log('Error: '+err)
})

app.use('/', categoryController)
app.use('/', articleController)
app.use('/', userController)

app.get('/', (req, res) => {
   Article.findAll({
      order: [
         ['id', 'desc']
      ],
      limit: 4
   }).then((articles) => {
      Category.findAll().then((categories) => {
         res.render('index', {articles: articles, categories: categories})
      }) 
   })
})
app.get('/:slug', (req, res) => {
   let slug = req.params.slug
   Article.findOne({
      where: {
         slug: slug
      }
   }).then((article) => {
      if (article != undefined) {
         Category.findAll().then((categories) => {
            res.render('article', {article: article, categories: categories})
         }) 
      } else {
         res.redirect('/')
      }
   }).catch((err) => {
      res.redirect('/')
   })
})
app.get('/category/:slug', (req, res) => {
   let slug = req.params.slug
   Category.findOne({
      where: {
         slug: slug
      },
      include: [{model: Article}]
   }).then((category) => {
      if (category != undefined) {
         Category.findAll().then((categories) => {
            res.render('index',{articles: category.articles, categories: categories})
         })
      } else {
         res.redirect('/')
      }
   }).catch((err) => {
      res.redirect('/')
   })
})

app.listen(8081)
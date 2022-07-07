const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/aprendendoMongo')
const articleModel = require('./models/Article')
const Article = mongoose.model('Article', articleModel)


// const artigo = new Article({
//   title: 'Começando',
//   author: 'Lucas',
//   body: 'Aprendendo mongoose',
//   special: true,
//   resume: {
//     content: 'bla bla bla',
//     author: 'teste'
//   }
// })

// artigo.save().then(() => {
//   console.log('Artigo salvo')
// }).catch(err => console.log(err))


// Article.find({}).then(articles => {
//   console.log(articles)
// }).catch(err => console.log(err))

// artigo.save().then(() => {
//   console.log('Artigo salvo')
// }).catch(err => console.log(err))


// Article.findByIdAndDelete({ '_id': '62c21e30398081079a6ac5bd' }).then(() => console.log('removido')).catch(err => console.log(err))

// Article.findOne({ '_id': '62c21e30398081079a6ac5bd' }).then(article => {
//   console.log(article)
// }).catch(err => console.log(err))

Article.findByIdAndUpdate('62c21e3c6f22fb4b4bc2faca', {
  title: 'Vue do zero',
  author: 'Mendes',
  body: 'vue.js do zero'
}).then(() => console.log('Atualizado')).catch(err => console.log(err))

Article.find({}).then(article => {
  console.log(article)
}).catch(err => console.log(err))
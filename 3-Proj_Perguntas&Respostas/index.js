const express = require('express')
const app = express()
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')

// Database
connection.authenticate().then(() => {
   console.log('Conectado com sucesso')
}).catch((err) => {
   console.log('ERRO: ' + err)
})
// View Engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
// Body Parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// Rotas
app.get('/', (req, res) => {
   Pergunta.findAll({raw: true, order: [
      ['id', 'desc']
   ]}).then((perguntas) => {
      res.render('index', {
         perguntas: perguntas
      })
   })
})
app.get('/perguntar', (req, res) => {
   res.render('perguntar')
})
app.post('/salvarpergunta', (req, res) => {
   let titulo = req.body.titulo
   let descricao = req.body.descricao
   Pergunta.create({
      titulo: titulo,
      descricao: descricao
   }).then(() => {
      res.redirect('/')
   })
})
app.get('/pergunta/:id', (req, res) => {
   let id = req.params.id

   Pergunta.findOne({
      where: {id: id}
   }).then((pergunta) => {
      if (pergunta != undefined) {
         Resposta.findAll({
            where: {perguntaId: pergunta.id},
            order: [
               ['id', 'desc']
            ]
         }).then((respostas) => {
            res.render('pergunta', {
               pergunta: pergunta,
               respostas: respostas
            })
         })
      } else {
         res.redirect('/')
      }
   })
})
app.post('/responder', (req, res) => {
   let corpo = req.body.corpo
   let perguntaId = req.body.pergunta

   Resposta.create({
      corpo: corpo,
      perguntaId: perguntaId
   }).then(() => {
      res.redirect(`/pergunta/${perguntaId}`)
   })
})

app.listen(8080, () => {
   console.log('Servidor Rodando!')
})
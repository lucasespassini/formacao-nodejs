const express = require('express')
const app = express()

app.get('/', (req, res) => {
   res.send('<h1>Essa é a rota principal</h1><a href="/blog">Meu blog</a>')
})
app.get('/blog/:artigo?', (req, res) => {
   let artigo = req.params.artigo
   if (artigo) {
      res.send(`<h2>Artigo: ${artigo}</h2>`)
   } else {
      res.send('<h1>Bem vindo ao meu blog</h1><a href="/">Rota primaria</a>')
   }
})
app.get('/canal/youtube', (req, res) => {
   let canal = req.query['canal'] // querry params não são muito utilizados

   if (canal) {
      res.send(canal)
   } else {
      res.send('Nenhum canal fornecido')
   }
})
app.get('/ola/:nome/:empresa', (req, res) => {
   let nome = req.params.nome
   let empresa = req.params.empresa
   res.send(`<h1>Oi ${nome} da ${empresa}</h1>`)
})

app.listen(8181, (err) => {
   if (err) {
      console.log('Ocorreu um erro!')
   } else {
      console.log('Servidor rodando localhost:8181')
   }
})
const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const connection = require('./database/connection')

const Game = require('./model/Game')
const User = require('./model/User')

const JWTSecret = 'foihf-ewhf-923hf-923hfbue'

function auth(req, res, next) {
   const authToken = req.headers['authorization']

   if (authToken != undefined) {
      const bearer = authToken.split(' ')
      var token = bearer[1]

      jwt.verify(token, JWTSecret, (err, data) => {
         if (err) {
            res.status(401)
            res.json({err: 'Token inválido'})
         } else {
            req.token = token
            req.loggedUser = {id: data.id, email: data.email}

            next()
         }
      })
   } else {
      res.status(401)
      res.json({err: 'Token inválido'})
   } 
}

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

connection.authenticate().then(() => {
   console.log('Conexão feita com sucesso!')
}).catch((err) => {
   console.log('Erro: '+err)
})

app.get('/games', auth, (req, res) => {
   res.statusCode = 200
   
   Game.findAll().then((games) => {
      res.send(games)
   })
})

app.get('/game/:id', auth, (req, res) => {
   var id = req.params.id
   if (isNaN(id)) {
      res.sendStatus(400)
   }
   Game.findByPk(id).then((game) => {
      if (game == undefined) {
         res.sendStatus(404)
      } else {
         res.statusCode = 200
         res.send(game)
      }
   }).catch((err) => {
      res.sendStatus(404)
   })
})

app.post('/game', auth, (req, res) => {
   var {title, price, year} = req.body

   if (!isNaN(title)) {
      res.sendStatus(400)
   } else if (isNaN(price)) {
      res.sendStatus(400)
   } else if (isNaN(year)) {
      res.sendStatus(400)
   } else {
      Game.create({
         title: title,
         price: price,
         year: year
      }).then(() => {
         res.sendStatus(200)
      }).catch((err) => {
         res.sendStatus(400)
      })
   }
})

app.delete('/game/:id', auth, (req, res) => {
   if (isNaN(req.params.id)) {
      res.sendStatus(400)
   }

   var id = parseInt(req.params.id)
   Game.destroy({
      where: {
         id: id
      }
   }).then(() => {
      if (id == undefined) {
         res.sendStatus(404)
      } else {
         res.sendStatus(200)
      }  
   }).catch((err) => {
      res.sendStatus(404)
   })
})

app.put('/game/:id', auth, (req, res) => {
   if (isNaN(req.params.id)) {
      res.sendStatus(400)
   }

   var id = parseInt(req.params.id)

   Game.findByPk(id).then((game) => {
      if (game != undefined) {
         var {title, price, year} = req.body

         Game.update({
            title: title,
            price: price,
            year: year
         }, {
            where: {
               id: id
            }
         })
         res.sendStatus(200)
      } else {
         res.sendStatus(404)
      }
   })
})

app.post('/auth', (req, res) => {
   var {email, password} = req.body

   if (email != undefined) {
      User.findOne({
         where: {
            email: email
         }
      }).then((user) => {
         if (user.password == password) {
            jwt.sign({id: user.id, email: user.email}, 
            JWTSecret, {
               expiresIn: '48h'
            }, (err, token) => {
               if (err) {
                  res.status(400)
                  res.json({err: 'Falha interna'})
               } else {
                  res.status(200)
                  res.json({token: token})
               }
            })
         } else {
            res.status(401)
            res.json({err: 'Credenciais inválidas'})
         }
      }).catch((err) => {
         res.status(404)
         res.json({err: 'O email enviado não existe'})
      })
   } else {
      res.status(400)
      res.json({err: 'O email enviado é inválido'})
   }
})

app.listen(9000, () => {
   console.log('API rodando')
})
const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cookieParser('wfaavefo2231f'))
app.use(session({
   secret: 'dh19-8hd98',
   resave: false,
   saveUninitialized: true,
   cookie: { maxAge: 60000 } 
}))
app.use(flash())

app.get('/', (req, res) => { 
   var emailError = req.flash('emailError')
   var pontosError = req.flash('pontosError')
   var nameError = req.flash('nameError')

   if (emailError != undefined) {
      if (emailError.length == 0) {
         emailError = undefined
      }
   }

   res.render('index', {emailError, pontosError, nameError, email: req.flash('email')})
})

app.post('/form', (req, res) => {
   var { email, name, pontos } = req.body

   var emailError
   var pontosError
   var nameError

   if (email == undefined || email == '') {
      emailError = 'O e-mail não pode ser vazio'
   }
   if (pontos == undefined || pontos < 20) {
      pontosError = 'Os seus pontos não podem ser menores que 20'
   }
   if (name == undefined || name == '') {
      nameError = 'O nome não pode ser vazio'
   }
   if (name.length < 4) {
      nameError = 'O nome é muito pequeno'
   }

   if (emailError != undefined || pontosError != undefined || nameError != undefined) {
      req.flash('emailError', emailError)
      req.flash('pontosError', pontosError)
      req.flash('nameError', nameError)

      req.flash('email', email)

      res.redirect('/')
   } else {
      res.send('show de bola esse form')
   }
})

app.listen(9000)
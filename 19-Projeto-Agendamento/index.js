const express = require('express')
const app = express()
const mongoose = require('mongoose')
const appointmentService = require('./services/AppointmentService')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/agendamento')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/cadastro', (req, res) => {
  res.render('create')
})

app.post('/create', async (req, res) => {
  const { name, email, cpf, description, date, time } = req.body

  let status = await appointmentService.Create(
    name, 
    email, 
    cpf, 
    description, 
    date, 
    time
  )

  if (status) {
    res.redirect('/')
  } else {
    res.send('Ocorreu um erro')
  }
})

app.get('/getcalendar', async (req, res) => {
  let appointments = await appointmentService.GetAll(false)

  res.json(appointments)
})

app.listen(8080)
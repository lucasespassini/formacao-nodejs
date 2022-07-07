const mongoose = require('mongoose')
const AppointmentFactory = require('../factories/AppointmentFactory')
const appointment = require('../models/Appointment')

// definindo o model
const Appo = mongoose.model('Appointment', appointment)

class AppointmentService {
  async Create(name, email, cpf, description, date, time) {
    const newAppo = new Appo({
      name,
      email,
      cpf,
      description,
      date,
      time,
      finished: false
    })

    try {
      await newAppo.save()
      return true
    } catch (error) {
      console.log(err)
      return false
    }
  }

  async GetAll(showFinished) {
    if (showFinished) {
      return await Appo.find()
    } else {
      let appos = await Appo.find({'finished': false})
      let appointments = []

      appos.forEach(appointment => {
        if (appointment.date != undefined) {
          appointments.push(AppointmentFactory.Build(appointment))
        }
      })

      // for (appointment of appos) {
      //   appointments.push(AppointmentFactory.Build(appointment))
      // }

      return appointments
    }
  } 
}

module.exports = new AppointmentService()
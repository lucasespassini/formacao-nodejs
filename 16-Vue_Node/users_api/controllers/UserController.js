const User = require('../models/User')
const PasswordToken = require('../models/PasswordToken')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secret = '-pç2-=ç=-çf23ç-=2ó@'

class UserController {
   async index(req, res) {
      let users = await User.findAll()
      res.json(users)
   }

   async findUser(req, res) {
      let { id } = req.params

      let user = await User.findById(id)

      if (user == undefined) {
         res.status(404)
         res.json({})
      } else {
         res.json(user)
      }
   }

   async create(req, res) {
      let { name, email, password } = req.body

      if (name == undefined) {
         res.status(400)
         res.json({ err: "O nome é inválido!" })
         return
      }

      if (name.length < 4) {
         res.status(400)
         res.json({ err: "O nome deve ter mais que 3 caracteres!" })
         return
      }

      if (email == undefined || email == '' || email == ' ') {
         res.status(400)
         res.json({ err: "O e-mail é inválido!" })
         return
      }

      let emailExists = await User.findEmail(email)

      if (emailExists) {
         res.status(406)
         res.json({ err: 'O e-mail já está cadastrado!' })
         return
      }

      if (password == undefined) {
         res.status(400)
         res.json({ err: "senha inválida!" })
         return
      }

      if (password.length < 5) {
         res.status(400)
         res.json({ err: "A senha deve ter mais que 5 caracteres!" })
         return
      }

      await User.new(name, email, password)

      res.status(200)
      res.json({ msg: 'Tudo OK' })
   }

   async edit(req, res) {
      let { id, name, email, role } = req.body

      let result = await User.update(id, name, email, role)

      if (result != undefined) {
         if (result.status) {
            res.send('Tudo ok')
         } else {
            res.status(406)
            res.json(result.err)
         }
      } else {
         res.status(406)
         res.send('Ocorreu um erro no servidor')
      }
   }

   async remove(req, res) {
      let { id } = req.params

      let result = await User.delete(id)

      if (result.status) {
         res.send('Tudo OK!')
      } else {
         res.status(406)
         res.json(result.err)
      }
   }

   async recoverPassword(req, res) {
      let { email } = req.body
      let result = await PasswordToken.create(email)
      if (result.status) {
         console.log(result.token)
         res.status(200)
         res.send(result.token)
      } else {
         res.status(406)
         res.send(result.err)
      }
   }

   async changePassword(req, res) {
      let { token, password } = req.body

      let isTokenValid = await PasswordToken.validate(token)

      if (isTokenValid.status) {
         await User.changePassword(isTokenValid.token.user_id, password, isTokenValid.token.token)
         res.send('Senha alterada!')
      } else {
         res.status(406)
         res.send('Token inválido!')
      }
   }

   async login(req, res) {
      let { email, password } = req.body

      let user = await User.findByEmail(email)

      if (user != undefined) {
         let result = await bcrypt.compare(password, user.password)

         if (result) {
            let token = jwt.sign({ email: user.email, role: user.role }, secret)

            res.json({ token: token })
         } else {
            res.status(406)
            res.json({ err: 'Senha incorreta!' })
         }
      } else {
         res.status(406)
         res.json({ status: false, err: 'O usuário não existe!' })
      }
   }
}

module.exports = new UserController()
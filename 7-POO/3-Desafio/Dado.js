class Dado {
   constructor(face) {
      this.nome = 'D' + face
      this.face = face
   }

   RolarDado() {
      var min = 1
      var max = this.face
      var result = Math.floor(Math.random() * ((max + 1) - min)) + min
      console.log(`${this.nome}: ${result}`)
   }
}

var d6 = new Dado(6)
d6.RolarDado()

var d12 = new Dado(12)
d12.RolarDado()

var d100 = new Dado(100)
d100.RolarDado()
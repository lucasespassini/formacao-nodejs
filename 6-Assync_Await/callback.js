function enviarEmail(corpo, para, callback) {
   setTimeout(() => {
      
      var deuErro = true

      if (deuErro) {
         callback('O envio do e-mail falhou!')
      } else {
         callback()
      }   
   }, 3000)
}

console.log('Inicio de envio de email')
enviarEmail('Oi, seja bem vindo ao guia', 'lucasespassini@gmail.com', (err) => {
   if (err == undefined) {
      console.log('TUDO OK!')
   } else {
      console.log('Ocorreu um erro: '+err)
   }
})

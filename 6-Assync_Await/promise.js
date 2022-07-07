function enviarEmail(corpo, para) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         var deuErro = true
         
         if (!deuErro) {
            resolve({time: 6, to: 'lucasespassini@hotmail.com'})
         } else {
            reject('Fila Cheia')
         }
      }, 3000)
   })
}

enviarEmail('Ola mundo', 'lucas@mendes.com').then((dados) => {
   console.log(`
      Time: ${dados.time}
      --------------------
      To: ${dados.to}
   `)
}).catch((err) => {
   console.log('E-mail não enviado!')
   console.log('ERRO: '+err)
})

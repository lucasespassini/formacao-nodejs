function pegarId() {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve(5)
      }, 1500)
   })
}
function buscarEmailNoBanco(id) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve('lucasespassini@hotmail.com')
      }, 2000)
   })
}
function enviarEmail() {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         var deuErro = true
         if (!deuErro) {
            resolve({time: 6, to: 'victor@udemy.com'})
         } else {
            reject('Fila cheia')
         }
      }, 4000)
   })   
}
function pegarUsuarios() {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve([
            {name: 'Lucas', lang: 'JS'},
            {name: 'Mendes', lang: 'Python'},
            {name: 'Daniel', lang: 'Java'}
         ])
      }, 3000)
   })
}

async function main() {
   var id = await pegarId()
   var email = await buscarEmailNoBanco(id)
   try {
      enviarEmail('Olá, como vai?', email)
      console.log('Email enviado para o ID ' + id)
      console.log('Email enviado com sucesso!')
   } catch (err) {
      console.log(err)
   }
}

main()

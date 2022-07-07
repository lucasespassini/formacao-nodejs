/* -Escopo
let nome = 'Lucas' // Global, Local e de bloco
var sobrenome = 'Mendes' // Global e Local
*/

/* -JSON
var nome = 'Lucas'
var idade = 21

var empresa = {
   nome: 'Guia do programador',
   cidade: 'São Paulo',
   site: 'guiadoprogramador.com',
   email: 'guia@programador.com'
}

var user = {
   nome,
   idade,
   //...empresa
}

var { nome, idade } = user

console.log(nome)
console.log(idade)
*/

/* -Arrow Function
var soma = (a, b) => a + b
var sub = (a, b) => a - b
var mult = (a, b) => a * b
var div = (a, b) => a / b
*/

/* -Array
var lucas = {
   nome: 'Lucas',
   idade: 21,
   empresa: 'Guia do programador'
}
var jhonattan = {
   nome: 'Jhonattan',
   idade: 20,
   empresa: 'Umbler'
}
var miguel = {
   nome: 'Miguel',
   idade: 20,
   empresa: 'Udemy'
}
// Filter
// forEach
// Find
var users = [lucas, jhonattan, miguel]

var usuario = users.find(user => user.nome === 'Lucas')

console.log(usuario)
*/


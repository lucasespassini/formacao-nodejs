class Animal {
   constructor(nome, idade, preco) {
      this.nome = nome
      this.idade = idade
      this.preco = preco
   }

   ChecarEstoque() {
      return 10
   }
   MetodoQualquer() {
      console.log('Esse método faz parte da classe Mãe!')
   }
}

class Cachorro extends Animal {
   constructor(nome,idade, preco, raca, peso) {
      super(nome, idade, preco)
      this.raca = raca
      this.peso = peso
   }

   Latir() {
      console.log('ROLF! ROLF! ROLF!')
   }
   ChecarEstoque() {
      console.log('Na loja temos 20 Dogões')
   }
   MetodoQualquer() {
      super.MetodoQualquer()
      console.log('Esse método faz parte da classe Filha!')
   }
}

var dog = new Cachorro('Dogão', 5, 250, 'Fila', 10)
dog.ChecarEstoque()
dog.Latir()
dog.MetodoQualquer()
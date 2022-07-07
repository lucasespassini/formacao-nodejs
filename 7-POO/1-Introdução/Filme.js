class Filme {
   constructor(titulo, ano, genero, diretor, duracao) {
      this.titulo = titulo
      this.ano = ano
      this.genero = genero
      this.diretor = diretor
      this.duracao = duracao
   }

   Reproduzir() {
      console.log('Reproduzindo...')
   }
   Pausar() {
      console.log('||')
   }
   Avancar() {
      console.log('>>')
   }
   Fechar() {
      console.log('X')
   }
   Ficha() {
      console.log(`
   Título do filme: ${this.titulo}
   Ano de lançamento: ${this.ano}
   Gênero: ${this.genero}
   Duração: ${this.duracao}
      `)
      this.Reproduzir()
   }
}

var vingadores = new Filme('Vingadores: Era de Ultron', 2015, 'Ação', 'Alguém', '2h')
vingadores.Ficha()

var hulk = new Filme('O incrível Hulk', 2008, 'Ação', 'Alguém', '2h10m')
hulk.Ficha()

var starWars = new Filme('Stark Wars', 1985, 'Ação', 'Alguém', '1h50m')
starWars.Ficha()

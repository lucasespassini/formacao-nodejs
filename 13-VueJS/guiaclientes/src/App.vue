<template>
  <div id="app">
    <h3>Cadastro:</h3>
    <small v-if="deuErro" class="error-msg">O nome é inválido. Tente novamente</small>
    <input type="text" placeholder="nome" v-model="nomeField">
    <input type="email" placeholder="email" v-model="emailField">
    <input type="number" placeholder="idade" v-model="idadeField">
    <button @click="cadastrarUsuario()">Cadastrar</button>
    <hr>
    
    <div v-for="(cliente) in orderCliente" :key="cliente.id">
      <Cliente :cliente="cliente" @meDelete="deletarUsuario($event)"/>
    </div>

  </div>
</template>

<script>
import _ from 'lodash'
import Cliente from './components/Cliente.vue'
//import Produto from './components/Produto.vue'

export default {
  name: 'App',
  data(){
    return {
      deuErro: false,
      nomeField: '',
      emailField: '',
      idadeField: 0,

      clientes: [
        {
          id: 1,
          nome: 'Victor Lima',
          email: 'lima@hotmail.com',
          idade: 32
        },
        {
          id: 2,
          nome: 'Ednaldo Pereira',
          email: 'ednaldo@hotmail.com',
          idade: 41
        },
        {
          id: 3,
          nome: 'Michael Scott',
          email: 'michael@hotmail.com',
          idade: 26
        },
        {
          id: 4,
          nome: 'Jhonattan',
          email: 'jhon@hotmail.com',
          idade: 19
        },
        {
          id: 5,
          nome: 'Lucas Mendes Espassini',
          email: 'lucasespassini@hotmail.com',
          idade: 21
        }
      ]
    }
  },
  components: {
    Cliente, 
  },
  methods: {
    cadastrarUsuario: function () {
      if (this.nomeField == '' || this.nomeField.length < 3) {
        this.deuErro = true
      } else {
        this.deuErro = false
        this.clientes.push({
          nome: this.nomeField, 
          email: this.emailField, 
          idade: this.idadeField, 
          id: Date.now()
        })
        this.nomeField = ''
        this.emailField = ''
        this.idadeField = ''
      }
    },
    deletarUsuario: function($event) {
      console.log($event)
    }
  },
  computed: {
    orderCliente() {
      return _.orderBy(this.clientes, ['nome'], ['asc'])
    }
  }
}
</script>

<style>
  .error-msg {
    padding: 2px;
    border: 1px solid red;
    border-radius: 3px;
    color: red;
    background-color: #ffcaca;
  }
</style>

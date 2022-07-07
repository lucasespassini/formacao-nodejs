<template>
   <div :class="{'cliente': !isPremium, 'cliente-premium': isPremium}">
      <h4>Nome: {{cliente.nome}}</h4>
      <p>Email: {{ tudoMaiusculo }}</p>
      <p v-if="showIdade === true">Idade: {{cliente.idade}}</p>
      <p v-else>O usuário escondeu a idade</p>
      <button @click="mudarCor($event)">Mudar cor!</button>
      <button @click="deletar()">Deletar</button>
   </div>
</template>

<script>
export default {
   data() {
      return {
         isPremium: false
      }
   },
   props: {
      cliente: Object,
      showIdade: Boolean
   },
   methods: {
      mudarCor: function($event) {
         console.log($event)
         this.isPremium = !this.isPremium
      },
      emitirEventoDelete: function() {
         console.log('Emitindo do filho')
         this.$emit('meDelete', {curso: 'Formação node.js', emPromocao: true, component: this})
      }
   },
   computed: {
      tudoMaiusculo() {
         return this.cliente.email.toUpperCase();
      }
   }
}
</script>

<style scoped>
   .cliente {
      margin: 15px 15%;
      padding-bottom: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #ECE5E3;
      transition: .2s;
   }

   .cliente-premium {
      margin: 15px 15%;
      padding-bottom: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: yellow;
      background-color: black;
      transition: .2s;
   }
</style>

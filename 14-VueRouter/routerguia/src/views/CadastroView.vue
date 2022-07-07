<template>
   <div>
      <input type="text" name="email" id="email" placeholder="E-mail"><br>
      <input type="text" name="nome" id="nome" placeholder="Nome"><br>
      <button>Teste!</button>
      <h4>{{parametroDaRota}}</h4>
      <router-view/>
   </div>
</template>

<script>
export default {
   created(){
      console.log('teste')
      console.log(this.$route.params.dado)
      // this.parametroDaRota = this.$route.params.dado
   },
   data() {
      return {
         parametroDaRota: 'nada'
      }
   }
}
</script>
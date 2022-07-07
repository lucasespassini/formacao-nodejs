<template>
  <div id="app">
    <div class="column is-half is-offset-one-quarter">
      <img src="./assets/download.png" />
      <hr />
      <h4 class="is-size-4">Pokedex</h4>
      <input
        type="text"
        class="input is-rounded"
        placeholder="Buscar pokemon pelo nome"
        v-model="busca"
      />
      <button @click="buscar" id="busca-btn" class="button is-fullwidth is-success">
        Buscar
      </button>
      <div v-for="(poke, index) in filteredPokemons" :key="poke.url">
        <Pokemon :name="poke.name" :url="poke.url" :num="index + 1" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Pokemon from "./components/MyPokemon.vue";
export default {
  name: "App",
  data() {
    return {
      pokemons: [],
      filteredPokemons: [],
      busca: "",
    };
  },
  created: async function () {
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
    );
    this.pokemons = res.data.results;
    this.filteredPokemons = res.data.results
  },
  components: {
    Pokemon,
  },
  methods: {
    buscar: function() {
      this.filteredPokemons = this.pokemons
      if (this.busca == "" || this.busca == " ") {
        this.filteredPokemons = this.pokemons
      } else {
        this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name == this.busca)
      }
    }
  },
  computed: {
    // resultadoBusca: function () {
    //   if (this.busca == "" || this.busca == " ") {
    //     return this.pokemons;
    //   } else {
    //     return this.pokemons.filter((pokemon) => {
    //       pokemon.name == this.busca;
    //     });
    //   }
    // },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
#busca-btn {
  margin-top: 3%;
}
</style>

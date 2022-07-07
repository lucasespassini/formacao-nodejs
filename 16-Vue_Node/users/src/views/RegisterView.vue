<template>
  <div>
    <h2>Registro de usuário</h2>
    <hr />
    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error != undefined">
          <div class="notification is-danger">
            <p>{{ error }}</p>
          </div>
        </div>
        <label>Nome</label>
        <input
          type="text"
          class="input"
          placeholder="Nome do usuário"
          v-model="name"
        />

        <label>E-mail</label>
        <input
          type="email"
          class="input"
          placeholder="E-mail do usuário"
          v-model="email"
        />

        <label>Senha</label>
        <input
          type="password"
          class="input"
          placeholder="Senha do usuário"
          v-model="password"
        />
        <hr />
        <button @click="register" class="button is-success">Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: undefined,
      email: "",
      password: "",
      error: undefined,
    };
  },
  methods: {
    register() {
      axios
        .post("http://localhost:8081/user", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          let msgError = err.response.data.err;
          this.error = msgError;
        });
    },
  },
};
</script>

<style>
</style>
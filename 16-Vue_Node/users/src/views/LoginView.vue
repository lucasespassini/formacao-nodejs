<template>
  <div>
    <h2>Login</h2>
    <hr />
    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error != undefined">
          <div class="notification is-danger">
            <p>{{ error }}</p>
          </div>
        </div>

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
        <button @click="login" class="button is-success">Entrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: undefined,
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:8081/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
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
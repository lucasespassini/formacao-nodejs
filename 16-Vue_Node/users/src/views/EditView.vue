<template>
  <div>
    <h2>Edição de usuário</h2>
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
        <hr />
        <button @click="update" class="button is-success">Editar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    let req = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get("http://localhost:8081/user/" + this.$route.params.id, req)
      .then((res) => {
        this.email = res.data.email;
        this.name = res.data.name;
        this.id = res.data.id;
      })
      .catch(() => {
        this.$router.push({ name: "users" });
      });
  },
  data() {
    return {
      id: -1,
      name: "",
      email: "",
      error: undefined,
    };
  },
  methods: {
    update() {
      let req = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      axios
        .put(
          "http://localhost:8081/user/",
          {
            name: this.email,
            email: this.name,
            id: this.id,
          },
          req
        )
        .then(() => {
          this.$router.push({ name: "users" });
        })
        .catch(() => {
          this.$router.push({ name: "users" });
        });
    },
  },
};
</script>

<style>
</style>
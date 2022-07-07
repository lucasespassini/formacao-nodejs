<template>
  <div>
    <h1>Painel Adm!</h1>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ processRole(user.role) }}</td>
            <td>
              <router-link 
                :to="{ name: 'usersEdit', params: { id: user.id } }"
              >
                <button class="button is-success">Editar</button>
              </router-link>
              |
              <button class="button is-danger" @click="toggleModal(user.id)">
                Deletar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div :class="{ modal: true, 'is-active': showModal }">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Você realmente quer deletar este usuário?
              </p>
            </header>

            <footer>
              <a href="#" class="card-footer-item" @click="toggleModal()"
                >Cancelar</a
              >
              <a href="#" @click="deleteUser()" class="card-footer-item"
                >Sim, quero deletar</a
              >
            </footer>
          </div>
        </div>
        <button class="modal-close is-large" @click="toggleModal()"></button>
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
      .get("http://localhost:8081/user", req)
      .then((res) => {
        this.users = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      users: [],
      showModal: false,
      deleteUserId: -1,
    };
  },
  methods: {
    processRole(role) {
      if (role == 0) {
        return "Usuário comum";
      } else {
        return "ADM";
      }
    },
    toggleModal(id) {
      if (this.showModal == false) {
        this.deleteUserId = id;
        this.showModal = true;
      } else {
        this.showModal = false;
      }
    },
    deleteUser() {
      let req = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      axios
        .delete(`http://localhost:8081/user/${this.deleteUserId}`, req)
        .then((res) => {
          console.log(res);
          this.showModal = false;

          axios
            .get("http://localhost:8081/user", req)
            .then((res) => {
              this.users = res.data;
              console.log(this.users);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          this.showModal = false;
        });
    },
  },
};
</script>

<style>
</style>
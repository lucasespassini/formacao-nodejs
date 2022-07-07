import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/RegisterView.vue'
import Login from '../views/LoginView.vue'
import Users from '../views/UsersView.vue'
import Edit from '../views/EditView.vue'
import axios from 'axios'

function AdminAuth(to, from, next) {
  if (localStorage.getItem('token') != undefined) {
    let req = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    axios.post('http://localhost:8081/validate',{}, req)
    .then(() => {
      next()
    })
    .catch(() => {
      next('/login')
    })
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'users',
    component: Users,
    beforeEnter: AdminAuth
  },
  {
    path: '/admin/users/edit/:id',
    name: 'usersEdit',
    component: Edit,
    beforeEnter: AdminAuth
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/Home.vue'
import Create from './views/Create.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Update from './views/Update.vue'
import Appointments from './views/Appointments.vue'
import Map from './components/Map.vue'
import Modal from './components/Modal.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: Appointments,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/update/:id',
      name: 'Update',
      component: Update,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/modal',
      name: 'Modal',
      component: Modal,
      meta: { 
        requiresAuth: true
      }
    }
  ]
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return 
    }
    next('/login') 
  } else {
    next() 
  }
})



export default router

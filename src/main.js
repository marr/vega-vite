import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css'

const routes = [
  { name: 'home', path: '/', component: () => import('./Home.vue') },
  { name: 'charts', path: '/charts/:id?', component: () => import('./Chart.vue') },
  { name: 'map', path: '/map', component: () => import('./Map.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')

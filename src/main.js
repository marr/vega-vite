import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css'

const routes = [
  { path: '/', component: () => import('./Vega.vue') },
  { path: '/dates', component: () => import('./Dates.vue') },
  { path: '/geo', component: () => import('./Geo.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')


import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Pokemon.vue')
    },
    {
      path: '/pokemon',
      name: 'pokemon',
      component: () => import('../components/Pokemon.vue')
    },
    {
      path: '/pokemon/:name',
      name: 'pokemons',
      component: () => import('../views/PokeView.vue')
    }
  ],
})

export default router

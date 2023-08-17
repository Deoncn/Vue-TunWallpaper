import HomePage from '../components/views/HomePage.vue'
import SearchPage from '../components/views/SearchPage.vue'
import SettingsPage from '../components/views/SettingPage.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsPage
    }, 
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/views/AboutPage.vue')
    },
  ]
})

export default router

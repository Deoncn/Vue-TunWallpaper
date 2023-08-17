import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/main.css'


const app = createApp(App)


app.use(router)
app.mount('#app')


// console.log(import.meta.env. VITE_APP_DOMAIN_URL);


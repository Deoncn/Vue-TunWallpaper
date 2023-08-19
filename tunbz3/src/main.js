import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/main.css'

// 前端组件库 {Naive UI}
import naive from 'naive-ui'


const app = createApp(App)


app.use(router)
app.use(naive)
app.mount('#app')


// console.log(import.meta.env. VITE_APP_DOMAIN_URL);


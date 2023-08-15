import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import 'animate.css/animate.min.css'
import 'virtual:windi.css'
import App from './App.vue'
import request from 'utils/request'
import directives from './directives/directives'

const app = createApp(App)
app.config.globalProperties.$request = request
// 事件总线,发布订阅
import mitt from 'mitt'

app.config.globalProperties.$bus = new mitt()
directives(app)
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import './styles/element-reset.scss'

// app.use(ElementPlus)
import 'element-plus/theme-chalk/dark/css-vars.css'
app.use(createPinia())
app.use(router)
app.mount('#app')

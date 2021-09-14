import Vue from 'vue';
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/font/iconfont.css'
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'

// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.use(VueQuillEditor)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.component('tree-table', TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from '../../src/testDemo/App.vue'
import router from '../../src/testDemo/router/index'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
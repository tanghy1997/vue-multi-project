import Vue from 'vue'
import App from '../../src/playGuide/App.vue'
import router from '../../src/playGuide/router/index'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
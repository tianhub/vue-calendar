import Vue from 'vue'
import App from './App.vue'
import VueCalendarCustom from './lib/index.js';
Vue.use(VueCalendarCustom);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

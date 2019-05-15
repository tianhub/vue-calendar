import Vue from 'vue'
import App from './App.vue'
import VueCalendar from '../dist/vue-calendar';
Vue.use(VueCalendar);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

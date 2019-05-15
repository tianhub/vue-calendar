import Vue from 'vue';
import calendar from '../components/Calendar/Calendar.vue';
import MonthChoose from '../components/Calendar/MonthChoose/index';
import mixins from '@/assets/js/mixins/calendar.js';

const VueCalendar = {
    install(Vue, options) {
        Vue.component(calendar.name, calendar);
        Vue.component(MonthChoose.name, MonthChoose);
        Vue.prototype.$initCalendar = mixins.methods.initCalendar;
    }
}
export default VueCalendar

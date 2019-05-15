import Vue from 'vue';
import calendar from '../components/Calendar/Calendar.vue';
import MonthChoose from '../components/Calendar/MonthChoose/index';
import mixins from '@/assets/js/mixins/calendar.js';

let VueCalendarCustom = {
    install(Vue, options) {
        Vue.component(calendar.name, calendar);
        Vue.component(MonthChoose.name, MonthChoose);
        Vue.prototype.$initCalendar = mixins.methods.initCalendar;
    },
}
// 新增
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(paykeyboard);
}

export default VueCalendarCustom

# vue-calendar

[在线演示](http://106.14.171.75)

[demo地址](https://github.com/tianhub/vue-calendar-custom-demo.git)


## 使用

安装:

```
npm install vue-calendar-custom -S
```
引入:

```javascript
import VueCalendarCustom from 'vue-calendar-custom';
Vue.use(VueCalendarCustom);
```


基本使用:

```javascript
<vue-calendar-custom :datetime="new Date()"></vue-calendar-custom>
```

原型方法:

```javascript
//将daysList的每个对象通过插槽插入 vue-calendar-custom中,具体查看demo工程
let daysList = this.$initCalendar(new Date());//返回上月、当月、下月天总数
```


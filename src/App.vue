<template>
    <div id="app">
        <div>
            <month-choose v-model="value"></month-choose>
            <!--<el-date-picker type="date" v-model="value"></el-date-picker>-->
        </div>

       <div class="container">
           <vue-calendar :datetime="value"></vue-calendar>
       </div>
    </div>
</template>

<script>
    //import MonthChoose from './components/Calendar/MonthChoose/index';
   /* import VueCalendar from './components/Calendar/Calendar';
*/
    export default {
        name: 'app',
        components: {
           /* VueCalendar,*/
            //MonthChoose,
        },
        data() {
            return {
                value: new Date(),
            }
        },
        mounted() {            let ssss = this.$initCalendar(new Date());
            console.log(ssss);
        }
    }
</script>

<style lang="scss">
    #app {
        display: flex;
        width: 100%;
        height: 100%;
        .container {
            margin-left: 600px;
            margin-top: 10px;
            width: 800px;
            height: 600px;
        }
    }
</style>

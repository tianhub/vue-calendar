<template>
  <div id="calendar-tpl">
    <div class="main-container">
      <div class="calendar-container">
        <div class="container-left">
          <div class="calendar-week">
            <div class="ui-container">
              <div v-for="(item,index) in weekList" class="calendar-week-item">
                <div class="calendar-week-item-container">
                  <span :class="{weekday:index>4}" class="week-item-date">{{item}}</span>
                </div>
              </div>
            </div>

          </div>
          <div class="calendar-day">
            <div class="ui-container">
              <div :class="{'gray':item.$vue_calendar_type=='prev'||item.$vue_calendar_type=='next','current':item.$vue_calendar_today}" v-for="item in daysList" class="calendar-day-item" :style="{height:`${100/(daysList.length/7)}%`}">
                <slot :name="'slot'+item.$vue_calendar_id">
                  {{item.$vue_calendar_date}}
                </slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixins from '@/assets/js/mixins/calendar.js';
  export default {
    name: "vue-calendar-custom",
    mixins: [mixins],
    props:{
      datetime: {
        default: () => {
          return new Date()
        }
      },
      lang:{
        default:'ch',//ch或者en
      },
    },
    data() {
      return {
        dateValue: new Date(),
        weekList:[],
        weekListCh: ['一', '二', '三', '四', '五', '六', '日'],
        weekListEn: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'],
        monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        daysList: [],
        monthContent: '',
      }
    },
    watch: {
      lang: {
        handler(val, oldVal) {
          if(val=='en') {
            this.weekList = this.weekListEn;
          }else {
            this.weekList = this.weekListCh;
          }
        },
        immediate: true,
      },
      datetime: {
        handler(val,oldVal) {
          if(val) {
            this.formatDate(val,'yyyy-MM-dd HH:mm:ss');
            this.initDaysList(val);
          }
        },
        immediate: true
      },
    },
    mounted() {
      this.initDaysList(this.datetime);
    },


    methods: {

    },
  }
</script>

<style scoped lang="scss">




  #calendar-tpl {
    height: 100%;

    .main-container {
      height: 100%;

      .calendar-container {

        height: 100%;
        display: flex;

        .container-left {
          flex: 100%;

          .calendar-week {
            //padding: 10px 0;
            height: 8%;
            /*border-top: 1px solid #E4E4E4;
            border-bottom: 1px solid #E4E4E4;*/

            .ui-container {
              height: 100%;
              display: flex;

              .calendar-week-item {
                display: inline-block;
                height: 100%;
                width: 14%;

                .calendar-week-item-container {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
                  width: 100%;
                  height: 100%;

                  .week-item-date {
                    min-height: 50px;
                    font-size: 18px;
                    font-family: MicrosoftYaHei-Bold;
                    font-weight: bold;
                    color: rgba(104, 104, 116, 1);

                    /*position: absolute;
                    bottom: 0;*/
                    cursor: default;

                    &.weekday {
                      color: #cf2e33;
                    }
                  }
                }
              }
            }
          }

          .calendar-day {
            height: 92%;

            .ui-container {
              display: flex;
              flex-wrap: wrap;
              background-color: #ffffff;
              height: 100%;

              .calendar-day-item {
                border: 1px solid #E4E4E4;
                border-top: none;
                display: flex;
                width: 14%;
                flex: none;
                min-height: 60px;
                /*&:nth-child(7n+1) {
                  margin-left: -1px;
                }*/
                &:not(:nth-child(7n)) {
                  border-right: none;
                }
                &:nth-child(-n+7) {
                  border-top: 1px solid #E4E4E4;
                }
                &.gray {
                  color: #DADADA !important;
                }
                &.current {
                  color: #cf2e33;
                }
              }
            }
          }
        }
      }
    }
  }



</style>

let calendar = {
  date() {
    return {
      daysList: [],
    }
  },
  methods: {
    initCalendar(date) {
      if (date) {
        let daysList = [...calendar.methods.getPrevMonthRestList(date), ...calendar.methods.getCurrentMonthList(date), ...calendar.methods.getNextMonthRestList(date)];
        daysList.forEach((item, index) => {
          item.$vue_calendar_id = ++index;
        });
        return daysList;

      } else {
        return [];
      }
    },

    initDaysList(date) {
      if (date) {
        let daysList = [...this.getPrevMonthRestList(date), ...this.getCurrentMonthList(date), ...this.getNextMonthRestList(date)];
        daysList.forEach((item, index) => {
          item.$vue_calendar_id = ++index;
        });
        //处理数据
      this.daysList = daysList;

      } else {
        this.daysList = [];
      }

    },

    //获取date月当月天总数,参数二可获取其他月天总数(需传特定值)
    getDaysCount(date, setmonth = 0) {
      let curDate = new Date(date);
      /* 获取当前月份 */
      let curMonth = curDate.getMonth();
      /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
      curDate.setMonth(curMonth + 1 + setmonth);
      /* 将日期设置为0 */
      curDate.setDate(0);
      /* 返回当月的天数 */
      return curDate.getDate();
    },
    //获取某月第一天是周几
    getCurrMonthFirstWeek(date) {
      let curDate = new Date(date);
      curDate.setDate(1);
      return curDate.getDay() || 7;
    },
    //获取某月最后一天是周几
    getCurrMonthLastWeek(date) {
      let curDate = new Date(date);
      curDate.setDate(this.getDaysCount(date));
      return curDate.getDay() || 7;
    },
    //获取上月存留日历几天-->日历页面前部灰色日期
    getPrevMonthRestList(date) {
      let arr = [];
      let lastMonthRest = this.getCurrMonthFirstWeek(date) - 1;//获取上月余几天
      let lastMonthCounts = this.getDaysCount(date, -1);
      for (let i = lastMonthCounts - lastMonthRest + 1; i <= lastMonthCounts; i++) {
        let obj = {
          $vue_calendar_datetime: this.getDateTimeByDay(date, i, -1),
          $vue_calendar_today: false,
          $vue_calendar_type: 'prev',//用来区分 上月本月下月字体颜色 本月黑 上下月灰
          $vue_calendar_date: i
        };
        arr.push(obj);
      }
      return arr;
    },

    getCurrentMonthList(date) {
      let days = this.getDaysCount(date);
      let months = this.getCurrentMonth(date);
      let arr = [];
      let curDay = this.getCurrentDay();
      for (let i = 1; i <= days; i++) {
        let obj = {
          $vue_calendar_datetime: this.getDateTimeByDay(date, i, 0),
          $vue_calendar_today: curDay == i && this.getCurrentMonth() == this.getCurrentMonth(date),
          $vue_calendar_type: 'cur',
          $vue_calendar_date: i,
          $vue_calendar_week:this.getWeek(this.getDateTimeByDay(date, i, 0)),
        };
        arr.push(obj);
      }
      return arr;
    },
    //获取下月存留日历几天-->日历页面前部灰色日期
    getNextMonthRestList(date) {
      let arr = [];
      let nextMonthRest = 7 - this.getCurrMonthLastWeek(date);//获取下月余几天
      let nextMonthCounts = this.getDaysCount(date, 1);
      for (let i = 1; i <= nextMonthRest; i++) {
        let obj = {
          $vue_calendar_datetime: this.getDateTimeByDay(date, i, 1),
          $vue_calendar_today: false,
          $vue_calendar_type: 'next',
          $vue_calendar_date: i
        };
        arr.push(obj);
      }
      return arr;
    },
    //获取当前时间下 今日几号
    getCurrentDay() {
      let date = new Date();
      let day = date.getDate();
      return day;
    },
    //获取某个时间下 今日周几  不传默认当天
    getWeek(mDate = new Date()) {
      let date = new Date(mDate);
      let day = date.getDay();
      return day;
    },

    //获取当前时间下 几月  不传参默认当月
    getCurrentMonth(date = new Date()) {
      let curDate = new Date(date);
      let curMonth = curDate.getMonth() + 1;
      return curMonth;
    },

    //通过当日几号和月份传入获取日期格式
    getDateTimeByDay(date, dayIndex, setMonth = 0) {
      let cDate = new Date(date);
      let curMonth = cDate.getMonth();
      cDate.setMonth(curMonth + setMonth);
      cDate.setDate(dayIndex);
      return this.formatDate(cDate, 'yyyy-MM-dd');
    },

    /**
     格式化时间显示方式、用法:format="yyyy-MM-dd hh:mm:ss";
     */
    formatDate(v, format) {
      if (!v) return "";
      let d = v;
      if (typeof v === 'string') {
        if (v.indexOf("/Date(") > -1)
          d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else
          d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
      }
      let o = {
        "M+": d.getMonth() + 1,  //month
        "d+": d.getDate(),       //day
        "h+": d.getHours(),      //hour
        "m+": d.getMinutes(),    //minute
        "s+": d.getSeconds(),    //second
        "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
        "S": d.getMilliseconds() //millisecond
      };
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }
      return format;
    }
  },
};

export default calendar;

<template>
    <div id="month_choose">
        <div @click="addMonth(-1)" class="left-choose">
            <i></i>
        </div>
        <div class="month-content">
            {{month_content}}
        </div>
        <div @click="addMonth(1)" class="right-choose">
            <i></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MonthChoose",
        props: {
            value: {
                //default:new Date(),
            },
        },
        data() {
            return {
                datetime: new Date(),
                month_content: '',
            }
        },
        watch: {
            value: {
                handler(val, oldVal) {
                    this.datetime = val;

                },
                immediate: true,
            },
            datetime: {
                handler(val, oldVal) {
                    this.month_content = this.getMonthContent(val);
                },
                immediate: true,
            },
        },
        methods: {
            addMonth(monthNum = 1) {
                this.datetime = this.formatDate(this.datetime, 'yyyy-MM-dd');
                let curDate = new Date(this.datetime);
                /* 获取当前月份 */
                let curMonth = curDate.getMonth();
                curDate.setMonth(curMonth + monthNum);
                this.datetime = curDate;
                this.$emit('input', this.datetime);
            },
            getMonthContent(date = new Date()) {
                return this.formatDate(date, 'yyyy-MM');
            },
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
            },

        },
    }
</script>

<style scoped lang="scss">


    #month_choose {
        display: flex;
        align-items: center;
        justify-content: center;

        .month-content {
            height: 35px;
            width: 103px;
            font-size: 26px;
            line-height: 35px;
            color: #686874;
        }

        .left-choose, .right-choose {
            display: inline-block;
            width: 20px;
            height: 20px;
            //background-color: red;
            margin: 5px 15px;
            cursor: pointer;
        }

        .left-choose {
            display: flex;
            align-items: center;
            justify-content: center;

            > i {
                display: inline-block;
                width: 6px;
                height: 10px;
                background-image: url("../../../assets/img/jiantou.png");
            }
        }

        .right-choose {
            display: flex;
            align-items: center;
            justify-content: center;

            > i {
                display: inline-block;
                width: 6px;
                height: 10px;
                background-image: url("../../../assets/img/jiantou.png");
                transform: rotate(180deg);
            }
        }
    }


</style>

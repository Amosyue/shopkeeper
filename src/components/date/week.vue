<template lang="html">
    <div class="container" transition="fade" v-if="show">
        <div class="calendar" @click="stopPop($event)">
            <div class="month">
                <div class="arrowWrap arrowWrap-left" @click="monthPre">
                    <i class="arrow arrow-left"></i>
                </div>
                <p class="colblue">{{ year }}年{{ month + 1}}月</p>
                <div class="arrowWrap arrowWrap-right" @click="monthNext">
                    <i class="arrow arrow-right"></i>
                </div>
            </div>
            <div class="week">
                <p :class="{'weekend': index ==0 || index == 6}" v-for="(item,index) in week">
                    {{item}}
                </p>
            </div>
            <div class="day">
                <p v-for="(item,index) in calendar" >
                    <template v-if="(year>nowYear) || (year==nowYear && month>nowMonth) || (year==nowYear && month==nowMonth && item>nowDay )">
                        <span v-if="item!==0" class="disabled dataspan" >
                          {{item}}
                        </span>
                        <span v-else>&nbsp;</span>
                    </template>
                    <template v-else>
                        <span v-if="item!==0" @click="checkDate(index)" class="dataspan">
                          <i v-if="item==nowDay && year==nowYear && month==nowMonth" class="nowDay relative">今</i>
                          <i v-else> {{item}}</i>
                        </span>
                        <span v-else>&nbsp;</span>
                    </template>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            year: 0,
            month: 0,
            day: 0,
            calendar: [],
            daysTime:0,
            nowYear:0,
            nowMonth:0,
            nowDay:0,
            week:['日', '一', '二', '三', '四', '五', '六']
        }
    },
    props: {
        show: true
    },
    created() {
        const now = new Date()
        let year = now.getFullYear();
        let month = now.getMonth();
        let day = now.getDate();
        this.year = year;
        this.month = month;
        this.day = day;
        this.nowYear = year;
        this.nowMonth = month;
        this.nowDay = day;
        this.setDate();
    },
    methods: {
        weekIndex(year, month, day) {
            return new Date(year, month, day).getDay()
        },
        monthCount(year, month) {
            return new Date(year, month + 1, 0).getDate()
        },
        monthPre() {
            if (this.month === 0) {
                this.year -= 1
                this.month = 12
            }
            this.month -= 1
            this.setDate()
        },
        monthNext() {
            if (this.month === 11) {
                this.year += 1
                this.month = -1
            }
            this.month += 1
            this.setDate()
        },
        setDate() {
            this.calendar = []
            const start = this.weekIndex(this.year, this.month, 1)
            let count = this.monthCount(this.year, this.month)
            if (start !== 0) {
                count += start
            }
            for (let i = 0; i <= count; i++) {
                if (i < start) {
                    this.$set(this.calendar, i - 1, 0)
                } else {
                    this.$set(this.calendar, i - 1, i - start)
                }
            }
        },
        checkDate(index) {
            this.day = this.calendar[index]
            this.checked()
        },
        stopPop($event) {
            $event.stopPropagation()
        },
        checked() {
            const date = this.year + '-' + this.completion(this.month + 1) + '-' + this.completion(this.day)
            let date1 = new Date(date)
            let testname=this.getWeekDate(date1)
            let arr=[];
            for(var i=0; i<7; i++){
                var monthsTime=testname.getMonth()+1;
                var daysTime=testname.getDate();
                arr.push(testname.getFullYear()+String(this.completion(monthsTime))+this.completion(daysTime));
                testname.setDate(testname.getDate()+1);
            }
            this.$store.state.date = arr[0]+"~"+arr[6];
            this.$store.state.startDate = arr[0]
            this.$store.state.endDate = arr[6]
            this.$emit('close', this.close)
            this.$emit('closeTime');
            localStorage.setItem("curindex", "2");
        },
        getWeekDate(weekday){
            var d=weekday,
            day=d.getDay(),
            date=d.getDate();
            if(day==1)
             return d;
            if(day==0)
             d.setDate(date-6);
            else
            d.setDate(date-day+1);
            return d;
        },
        completion(data) {
            return data < 10 ? ('0' + data) : data
        }
    }
}
</script>
<style lang="css" scoped>
@import './date.css'
</style>

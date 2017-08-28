<template lang="html">
    <div class="container" v-if="show">
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
            <div class="day onlyday">
                <p v-for="(item,index) in calendar" >
                    <template v-if="(year>nowYear) || (year==nowYear && month>nowMonth) || (year==nowYear && month==nowMonth && item>nowDay )">
                        <span v-if="item!==0" class="disabled dataspan">
                          {{item}}
                        </span>
                        <span v-else>&nbsp;</span>
                    </template>
                    <template v-else>
                        <span v-if="item!==0" @click="checkDate(index)" :class="{'current':(item==day)}" class="dataspan">
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
            nowYear:0,
            nowMonth:0,
            nowDay:0,
            calendar: [],
            week:['日', '一', '二', '三', '四', '五', '六']
        }
    },
     computed:{
       ...mapState([
            'date',
            'startDate',
            'endDate'
       ])  
    },
    props: {
        show: true
    },
    created() {
        const now = new Date(this.date)
        this.nowYear = now.getFullYear();
        this.nowMonth = now.getMonth();
        this.nowDay = now.getDate();
        this.year = now.getFullYear();
        this.month = now.getMonth();
        this.day = now.getDate();
        this.setDate();
    },
    methods: {
        weekIndex(year, month, day) {
            return new Date(year, month, day).getDay();
        },
        monthCount(year, month) {
            return new Date(year, month + 1, 0).getDate();
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
            const date = this.year + '年' + this.completion(this.month + 1) + '月' + this.completion(this.day) + "日"
            let startDay = this.year +this.completion(this.month + 1) + this.completion(this.day);
            this.$store.state.date = date;
            this.$store.state.startDate = this.$store.state.endDate = this.year +this.completion(this.month + 1) + this.completion(this.day);
            this.$emit('closeTime');
            this.$emit('close', this.close)
            localStorage.setItem("curindex", "1");
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

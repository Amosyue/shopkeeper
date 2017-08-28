<template>
    <div class="container" v-if="show">
        <div class="calendar">
            <div class="month">
                <div class="arrowWrap arrowWrap-left" @click="monthPre">
                    <i class="arrow arrow-left"></i>
                </div>
                <p class="colblue">{{ year }}年</p>
                <div class="arrowWrap arrowWrap-right" @click="monthNext">
                    <i class="arrow arrow-right"></i>
                </div>
            </div>
            <div class="week monthweek">
                <p>{{ year }}年</p>
            </div>
            <div class="mymonth">
                <span class="monthspan" v-for="(item,index) in months">
                    <template v-if="(year>nowYear) || (year==nowYear && item>nowMonth )">
                        <span  class="col999">
                          {{item}}
                        </span>
                    </template>
                    <template v-else>
                        <span @click="checkDate(index)" :class="[item==month?'curindex':'']">
                            <i v-if="item==nowMonth && year==nowYear" class="current">本月</i>
                            <i v-else class="curIndex">{{item}}</i>
                        </span>
                    </template>
                </span>
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
          nowYear:0,
          nowMonth:0,
          months:['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12']
        }
    },
    props: {
        show: true
    },
    computed:{
       ...mapState([
            'date',
            'startDate',
            'endDate'
       ])  
    },
    created() {
        const now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth()+1
        this.year = year;
        this.month = month;
        this.nowYear = year;
        this.nowMonth = month;
    },
    methods: {
        monthPre() {
            this.year -= 1
        },
        monthNext() {
            this.year += 1
        },
        checkDate(index) {
           this.checked(index+1)
        },
        checked(index) {
            const date = this.year + '年' + index + "月";
            let  day = new Date(this.year,index,0); 
            this.month=index;
            this.$store.state.date = date;
            this.$store.state.startDate = this.year+String(this.completion(index
                ))+"01";
            this.$store.state.endDate = this.year+String(this.completion(index
                ))+day.getDate();
            this.$emit('close', this.close);
            this.$emit('closeTime');
            localStorage.setItem("curindex", "3");
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

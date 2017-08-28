<template>
  <div class="error" v-title data-title="空白数据">
    <p class="warn">空白数据</p>
  </div>
</template>
<script>
export default {
  name: 'error',
  data () {
    return {
     
    }
  }
}
</script>
<style scoped>
.error{
  color:#888;
  height:100%;
  text-align: center;
  font-size: 14px;
  background: #fff
}
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less">
  @import "./assets/less/color";

  #app {
    font-family: STHeitiSC-Medium;
    //background-color: @main-color;
    color: @font-white;
    height: 100%;
    /*width: 100%;*/
    /*position: absolute;*/
    /*top: 0;*/
  }
</style>

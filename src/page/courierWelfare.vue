<template>
  <div class="common">
    <div style="color: red; padding-top: 200px;">
      vue vue-router less axios vant vuex 基础配置
      <div>store: {{ this.$store.state.user.name }}</div>
      <van-button type="default">默认按钮</van-button>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
      <div class="vm">增加vw vh 适配</div>
      <div class="miaobian">描边描边描边描边描边描边描边描边描边描边描边</div>
      <div class="template" @click="link">常用布局页面Link</div>
    </div>
  </div>

</template>
<script>
import { Button } from 'vant';
  export default{
    data () {
      return {

      }
    },
    created () {
      
    },
    methods: {
      clickcallback () {
        this.$router.push({path: "/welfareEntrance"})
      },
      link () {
        this.$router.push({path: "/templateLayout"})
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../assets/less/color";
  @import "../assets/less/mixin";
  .common {
    height: 100vh;
    width: 100vw;
  }
  .vm {
    width: 160px;
    height: 138px;
    font-size: 32px;
  }
  .miaobian {
    font-size: 28px;
    color: aqua;
    //  -webkit-text-fill-color: aqua;
    // -webkit-text-stroke-width: 3px;
    // -webkit-text-stroke-color: #e00000;
     text-shadow: #e00000 3px 0 0, #e00000 0 3px 0, #e00000 -3px 0 0, #e00000 0 -3px 0;
  }
  .template {
    margin-top: 20px;
    width: 200px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    vertical-align: middle;
    color: #ffffff;
    background: #e00000;
    font-size: 16px;
  }
</style>
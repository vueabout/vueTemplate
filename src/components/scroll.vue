<template>
  <div class="scroll-wrapper anim">
    <div v-for="item in items" class="scroll-item">{{item.phone + ":" + item.title}}</div>
  </div>
</template>
<script>
  import WelfareEntraceApi from '../api/welfareEntranceApi'

  const api = new WelfareEntraceApi();

  export default{
    data() {
      return {
        animate:false,
        items:[]
      }
    },
    created(){
      this.getDailyRewardList();
      setInterval(this.scroll,1000)
    },
    methods: {
      scroll(){
        this.animate = true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(() => {      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
          this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的
          this.items.shift();               //删除数组的第一个元素
          this.animate = false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        }, 500)
      },
      getDailyRewardList () {
        api.getDailyRewardList({step: 1}).then((data) => {
          if (data.status === "200") {
            this.items = data.data;
          } else {

          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .scroll-wrapper {
    text-align: left;
    padding-left: 16px;
    /*padding-top: 14px;*/
    padding-bottom: 14px;
    /*line-height: 90px;*/
    height: 82px;
    overflow: hidden;
    .anim{
      transition: all 0.5s;
      margin-top: -30px;
    }
    .scroll-item {
      margin-top: 14px;
    }
    #con1 li{
      list-style: none;
    }
  }
</style>
<template>
  <swiper height="230px" :options="option"  :list="bannerList" effect="normal"></swiper>
</template>

<script>
import swiper from '../components/swiper'
export default {
  name:'',
  components: {
    swiper
  },
  data () {
   return {
      option: {
        showDots: true, // 是否显示分页器
        interval: 3000, // 轮播间隔时间，默认3s
        autoplay: true, // 是否自动播放
        loop: false // 是否循环轮播
      },
      bannerList: [{
        img: require('../assets/img/guideone.jpg')
      },{
        img: require('../assets/img/guidetwo.jpg')
      },{
        img: require('../assets/img/guidethree.jpg')
      }]
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang='less' scoped>

</style>

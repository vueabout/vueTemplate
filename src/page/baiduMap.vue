<template>
  <div class="common">
    <baidu-map class="bm-view" ak="lvyxv6VONiwn5enyHqACzdBxIlwT1hoO" :center="{lng: 112.970016, lat: 28.240839}" :zoom="16" @ready="setDistanceToolInstance" :scroll-wheel-zoom="true">
      <bm-control>
        <button @click="openDistanceTool">开启测距</button>
      </bm-control>
      <bm-marker :position="{lng: 112.970016, lat: 28.240839}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @dragend="dra">
        <!-- <bm-label content="三诺" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/> -->
      </bm-marker>
    </baidu-map>
  </div>

</template>
<script>
import DistanceTool from 'bmaplib.distancetool'
import { BaiduMap, BmMarker, BmLabel, BmControl } from 'vue-baidu-map'
import { Button } from 'vant';
  export default{
    data () {
      return {
        test: ''
      }
    },
    unmount () {
      distanceTool && distanceTool.close()
    },
    components: {
      BaiduMap,
      BmMarker,
      BmLabel,
      BmControl
    },
    created () {
      let s = Symbol();
      console.log(typeof s)
      this.test = '2'
      console.log(this.test)
    },
    methods: {
      dra (event) {
        console.log('event', event)
      },
      setDistanceToolInstance ({map}) {
        this.distanceTool = new DistanceTool(map, {lineStroke : 2})
      },
      openDistanceTool (e) {
        const {distanceTool} = this
        distanceTool && distanceTool.open()
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
  .bm-view {
    width: 100%;
    height: 100%;
  }
</style>
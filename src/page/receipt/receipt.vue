<template>
  <div class="receipt-wrapper">
    <!--建议加一个div高度为内容高度，这样可以避免当定位为sticky时下面的元素会突然向上走。-->
    <div style="height:44px;">
      <sticky
        ref="sticky"
        :check-sticky-support="false"
        :disabled="disabled"
      >
        <tab :line-width="1" active-color='#4087E5'>
          <tab-item selected>收件</tab-item>
          <tab-item>收款</tab-item>
          <tab-item>客户数</tab-item>
          <tab-item>取件数</tab-item>
        </tab>
      </sticky>
    </div>

    <div class="pannel">
      <checker
        style="padding: 15px 0;"
        v-model="demo5"
        radio-required
        default-item-class="demo5-item"
        selected-item-class="demo5-item-selected"
      >
        <checker-item value="1" @on-item-click="onItemClick">收件趋势</checker-item>
        <checker-item value="2" @on-item-click="onItemClick">快递公司</checker-item>
      </checker>
    </div>

    <div class="pannel mt10">
      <label>日期范围</label>
      <checker
        style="display: inline-block"
        v-model="date"
        radio-required
        default-item-class="demo5-item"
        selected-item-class="demo5-item-selected"
      >
        <checker-item value="today" @on-item-click="onItemClickDate">当日</checker-item>
        <checker-item value="seven" @on-item-click="onItemClickDate">近7天</checker-item>
        <checker-item value="thirty" @on-item-click="onItemClickDate">近30天</checker-item>
      </checker>
    </div>

    <div class="pannel">
      <group>
        <datetime
          style="display: inline-block"
          v-model="value1"
          @on-change="change"
          @on-cancel="log('cancel')"
          @on-confirm="onConfirm"
          @on-hide="log('hide', $event)"></datetime>
        <span>至</span>
        <datetime
          style="display: inline-block"
          v-model="value1"
          @on-change="change"
          @on-cancel="log('cancel')"
          @on-confirm="onConfirm"
          @on-hide="log('hide', $event)"></datetime>
      </group>
    </div>

    <shou-jian :recType="demo5"></shou-jian>
  </div>
</template>

<script>
  import { Group, Sticky, Tab, TabItem, Checker, CheckerItem, Datetime  } from 'vux'
  import ShouJian from '../../packages/receipt/shoujian.vue'

  export default{
    data () {
      return {
        disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
        demo5: "1",
        date: "today",
        value1: '2015-11-12',
      }
    },
    methods: {
      onItemClick (value) {
        console.log(value)
      },
      onItemClickDate (value) {
        console.log(value)
      },
      log (str1, str2 = '') {
        console.log(str1, str2)
      },
      change (value) {
        console.log('change', value)
      },
      onConfirm (val) {
        console.log('on-confirm arg', val);
        console.log('current value', this.value1)
      },
    },
    components: {
      Group,
      Sticky,
      Tab,
      TabItem,
      Checker,
      CheckerItem,
      Datetime,
      ShouJian: ShouJian
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/color";
  @import "../../assets/less/mixin";

  .receipt-wrapper {
    color: #999;

    .weui-cell:before {
      border: none;
    }

    .demo5-item[data-v-6abb5a4d] {
      width: 80px;
      border-radius: 15px;
      font-size: @font-14;
    }
    .demo5-item {
      width: 100px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      border-radius: 3px;
      border: 1px solid #ccc;
      background-color: #fff;
      margin-right: 6px;
    }
    .demo5-item-selected {
      background-color: #FF9845;
      color: @font-white;
    }
  }
</style>
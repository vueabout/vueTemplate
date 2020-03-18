<template>
  <div class="wrapper">
    <div class="pannel">
      <h3 style="color: red;">常用布局</h3>
      <div style="margin-bottom: 10px; margin-top: 10px;">1.左边固定宽度右边自适应长度</div>
      <div class="flex-layout">
        <div class="flex-left">left</div>
        <div class="flex-right">right</div>
      </div>

      <div style="margin-bottom: 10px; margin-top: 10px;">2.中间有间隔宫格布局(缺陷：注释其中一个item查看)</div>
      <div class="flex-grid">
        <div class="flex-grid-item">1</div>
        <div class="flex-grid-item">2</div>
        <div class="flex-grid-item">3</div>
        <div class="flex-grid-item">4</div>
        <div class="flex-grid-item">5</div>
        <div class="flex-grid-item">6</div>
      </div>

      <div style="margin-bottom: 10px; margin-top: 10px;">3.中间无间隔宫格布局</div>
      <div class="flex-gri">
        <div class="flex-gri-item">1</div>
        <div class="flex-gri-item">2</div>
        <div class="flex-gri-item">3</div>
        <div class="flex-gri-item">4</div>
        <div class="flex-gri-item">5</div>
      </div>
    </div>


    <div class="cu-form-group" disabled>
      <div class="title">产品名称</div>
      <input v-model="productName" placeholder="请输入" disabled/>
    </div>

    <div class="cu-form-group">
      <div class="title">性别<span class="red">*</span></div>
      <input type="radio" value="1" id="male" v-model="sex"/><label for="male" style="margin-left: 88px;">男</label>
      <input type="radio" value="2" id="female" v-model="sex"/><label for="female">女</label>
    </div>

    <div class="cu-form-group">
      <div class="title">电话<span class="red">*</span></div>
      <input v-model="mobilePhone" placeholder="请输入"/>
    </div>
    <div class="cu-form-group">
      <div class="title">验证码</div>
      <input v-model="validataCode" placeholder="请输入"/>
      <div class="get" @click="getVali" v-if="getCode">获取</div>
      <div class="get" v-else>{{ csize + 's' }}</div>
    </div>


    <div class="cu-form-group ti">请上传图片</div>
    <div v-if="allowAddImg" class="ti-url">
      <input type="file" name="file" id="file" @change="changeImg($event)" accept="image/png,image/jpeg,image/gif,image/jpg" class="inputfile" /> 
      <label for="file" class='ti-img'></label>
      <!-- <div class="filter"></div> -->
    </div>
    <div v-for="(item, index) in imgArr" :key="index" class="url-list">
      <img :src="item" class="ul-img"/>
      <i class="img_delete" @click="deleteImg(index)"></i>
      <!-- <i class="img_delete" @click="imgArr.splice(index,1)"></i> -->
    </div>

  </div>
</template>

<script>
export default {
  name:'',
  components: {

  },
  data () {
   return {
      productName: '安稳+血糖仪套装',
      code: 'C123456778',
      name: '',
      mobilePhone: '',
      validataCode: '',
      sex: '1',
      url: "",
      getCode: true,
      csize:60, //获取验证码的间隔时间，即60秒
      formData:new FormData(),
      filesdata: '',
      imgData: '',
      imgArr: [],
      imgSrc: '',
      allowAddImg: true
   }
  },
  created () {

  },
  methods: {
    convertBase64UrlToBlob(urlData){    
      var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    },
    changeImg: function(e) {
      var _this = this
      var imgLimit = 1024
      var files = e.target.files
      var image = new Image()
      if (files.length > 0) {
        var dd = 0
        var timer = setInterval(function() {
          if (files.item(dd).type !== 'image/png' && files.item(dd).type !== 'image/jpeg' && files.item(dd).type !== 'image/gif') {
            return false
          }
          if (files.item(dd).size > imgLimit * 102400) {
            // to do sth
          } else {
            image.src = window.URL.createObjectURL(files.item(dd))
            image.onload = function() {
              // 默认按比例压缩
              var w = image.width
              var h = image.height
              var scale = w / h
              w = 200
              h = w / scale
              // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
              var quality = 0.7
              // 生成canvas
              var canvas = document.createElement('canvas')
              var ctx = canvas.getContext('2d')
              // 创建属性节点
              var anw = document.createAttribute('width')
              anw.nodeValue = w
              var anh = document.createAttribute('height')
              anh.nodeValue = h
              canvas.setAttributeNode(anw)
              canvas.setAttributeNode(anh)
              ctx.drawImage(image, 0, 0, w, h)
              var ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase()// 图片格式
              var base64 = canvas.toDataURL('image/' + ext, quality)
              // 回调函数返回base64的值
              if (_this.imgArr.length <= 0) {
                _this.imgArr.unshift('')
                _this.imgArr.splice(0, 1, base64)// 替换数组数据的方法，此处不能使用：this.imgArr[index] = url;
                if (_this.imgArr.length >= 1) {
                  _this.allowAddImg = false
                }
              }

              // var formData = new FormData();
              // var blobDate = _this.convertBase64UrlToBlob(_this.imgArr[0]);
              // formData.append("file", blobDate);
              // formData.append('openId', _this.openId)
              // _this.$http.post('http://educationtest2.sinocare.com/education-back/front/educationSn/uploadFile', formData,{
              //   headers: {'Content-Type': 'multipart/form-data'}
              // }).then(res => {
              //   let response = res.json()
              //   if (response.status) {
              //     _this.url = response.data.imgFileUrl
              //     console.log(_this.url)
              //     _this.showLoading = false
              //   } else {
              //     _this.tips = response.message;
              //     _this.tosatShow = true;
              //     _this.showLoading = false
              //   }
              // });

            }
          }
          if (dd < files.length - 1) {
            dd++
          } else {
            clearInterval(timer)
          }
        }, 1000)
      }
    },
    deleteImg(index) {
      this.url = ''
      this.imgArr.splice(index, 1)
      console.log(this.imgArr)
      if (this.imgArr.length < 1) {
        this.allowAddImg = true
      } else {
        this.allowAddImg = false
      }
    },

    getQueryString(name){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r!=null) return  unescape(r[2]).toString(); return null;
    },

    getVali () {
      // if (!/^1(3|4|5|7|8|9)\d{9}$/.test(this.mobilePhone)) {
      //   this.tips = "请输入正确手机号";
      //   this.tosatShow = true;
      //   return
      // }
      // this.$http.post(this.apiUrl+'/front/educationSn/getMessageVerify', {mobilePhone: this.mobilePhone}).then((response) => {

      // });
      this.getCode = !this.getCode;
      var time = setInterval(() =>{
          if(this.csize>0){
              this.csize = this.csize-1
          }else{
              this.csize = 60;
              clearInterval(time)
          }
      },1000);
      setTimeout(() => {
          this.getCode = !this.getCode;
      }, 60000)
    }
  }
}
</script>

<style lang='less' scoped>
.wrapper {
  width: 100vw;
  // height: 100vh;
  background-color: #ffffff;
}

.pannel {
  padding: 1px 21px;
  color: #333333;
}

/*1.*/
.flex-layout {
  display: flex;
}

.flex-left {
  width: 50px;
  height: 50px;
  flex-grow: 0;
  flex-shrink: 0;
  background: #c0191f;
}

.flex-right {
  flex-grow: 1;
  flex-shrink: 1;
  background: tan;
}

/*2 */
.flex-grid {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.flex-grid-item {
  width: 100px;
  height: 100px;
  background: #c0191f;
  margin-top: 20px;
}

/*3 */
.flex-gri {
  display: flex;
  // justify-content: space-around;
  flex-wrap: wrap;
}

.flex-gri-item {
  width: 25%;
  height: 100px;
  background: #c0191f;
  // margin-top: 20px;
}

.cu-form-group {
  background-color: #ffffff;
  padding: 1px 21px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  min-height: 59px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  color: #333333;
  /* border-top: 1px solid #eee; */
}

.cu-form-group + .cu-form-group {
  border-top: 1px solid #eee;
}

.cu-form-group .title {
  text-align: justify;
  padding-right: 15px;
  /* font-size: 15px; */
  position: relative;
  font-size:16px;
  font-family:PingFang SC;
  font-weight:400;
  line-height:45px;
  color:rgba(102,102,102,1);
}
.cu-form-group .title {
  min-width: calc(5em + 15px);
}
.red {
  color: #C0191F;
}

.cu-form-group input {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  font-size: 15px;
  color: #333333;
  /* padding-right: 20px; */
  text-align: right;
}
input {
  display: block;
  height: 1.4rem;
  text-overflow: clip;
  overflow: hidden;
  white-space: nowrap;
  font-family: UICTFontTextStyleBody;
  min-height: 1.4rem;
  outline:0px;
}

input:disabled {
  background: #ffffff;
}

input::-webkit-input-placeholder { /* 适用于谷歌 */
  font-size:16px;
  font-family:PingFang SC;
  font-weight:400;
  line-height:23px;
  color:rgba(204,204,204,1);
}

input {
  border: none !important;
}

.get {
  width:58px;
  height:28px;
  border:1px solid rgba(192,25,31,1);
  opacity:1;
  border-radius:5px;
  text-align: center;
  line-height: 28px;
  vertical-align: middle;
  font-size:14px;
  font-family:PingFang SC;
  font-weight:200;
  color:rgba(192,25,31,1);
  margin-left: 15px;
}
.ti {
  font-size:14px;
  font-family:PingFang SC;
  font-weight:200;
  /* line-height:40px; */
  color:rgba(153,153,153,1);
}
.ti-img {
  height: 79px;
  width: 79px;
  margin-left: 21px;
  background: url('../assets/img/murphy/ic_photo@2x.png');
  background-size: 100%;
  display: block;
}
.url-list {
  height: 79px;
  width: 79px;
  margin-left: 21px;
  /* margin-right: 21px; */
  display: inline-block;
  position: relative;
}
.ul-img {
  height: 79px;
  width: 79px;
  display: inline-block;
}
.img_delete {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 24px;
  height: 23px;
  background: url('../assets/img/murphy/del.png');
  text-align: center;
}
.ti-url {
  height: 79px;
  width: 79px;
  margin-right: 21px;
  /* background: url('../../../assets/img/murphy/ic_photo@2x.png');
  background-size: 100%; */
  display: inline-block;
}
.button {
  width:306px;
  height:44px;
  background:rgba(192,25,31,1);
  opacity:1;
  border-radius:100px;
  text-align: center;
  line-height: 44px;
  vertical-align: middle;
  font-size:18px;
  font-family:PingFang SC;
  font-weight:200;
  color:rgba(255,255,255,1);
  margin: 0 auto;
  margin-top: 94px;
}

input[type="radio"] + label::before {
  content: "\a0"; /*不换行空格*/
  display: inline-block;
  vertical-align: middle;
  font-size: 18px;
  width: 1.2em;
  height: 1.2em;
  margin-right: .6em;
  border-radius: 50%;
  border: 1px solid #C0191F;
  text-indent: .15em;
  line-height: 1; 
}

input[type="radio"]:checked + label::before {
  background-color: #C0191F;
  background-clip: content-box;
  padding: .2em;
  width: 0.8em;
  height: 0.8em;
}

input[type="radio"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}

.inputfile {
  position:absolute;clip:rect(0 0 0 0);
}
</style>

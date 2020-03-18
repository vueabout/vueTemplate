// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Vconsole from 'vconsole'
import Vant from 'vant';
import 'vant/lib/index.css';
import commonLess from  './assets/less/common.less'

Vue.use(Vant);

const vConsole = new Vconsole()
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {     // 可以在这里进行token验证
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  commonLess,
  vConsole,
  store,
  components: { App },
  template: '<App/>'
})


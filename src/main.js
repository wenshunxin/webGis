import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// import 'vue-beauty/package/style/vue-beauty.min.css'
// import vueBeauty from 'vue-beauty'
// Vue.use(vueBeauty)
import store from "./store/index";
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(Vuex);

import $ from 'jquery';

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    console.log(to);
    console.log(from);
    console.log(next);
    next();
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

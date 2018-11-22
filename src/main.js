import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// import 'vue-beauty/package/style/vue-beauty.min.css'
// import vueBeauty from 'vue-beauty'
// Vue.use(vueBeauty)

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from "./store/index";
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(Vuex);

Vue.mixin({
    add: function(){
        console.log("success")
    }
})

import $ from 'jquery';

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    next();
  } else {
     NProgress.start();
    next()
  }
})

import filters from  "@/assets/js/filter";
Vue.mixin(filters)


router.afterEach(transition => {
  console.log(NProgress)
  NProgress.done();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    count: 0,
    themecolor:'20a0ff'//默认为20a0ff
  },
  mutations: {
    increment (state) {
      state.count++
      },
      setThemeColor(state,curcolor){
          this.state.themecolor = curcolor;
      }
  }
})

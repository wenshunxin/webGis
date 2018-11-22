<template lang="html">
    <div class="">
        {{count}}
        <el-button @click="add">添加</el-button>


        <div>
            <el-button @click="show3 = !show3">Click Me</el-button>

            <div style="margin-top: 20px; height: 200px;">
              <el-collapse-transition>
                <div v-show="show3">
                  <div class="transition-box">el-collapse-transition</div>
                  <div class="transition-box">el-collapse-transition</div>
                </div>
              </el-collapse-transition>
            </div>
          </div>

    </div>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex';
export default {
    data(){
        return {
            show3:true
        }
    },
    computed:mapState({
        // 箭头函数可使代码更简练
        count: state => state.count,
    }),
    methods:{
        add(){
            this.$store.commit('increment');
        }
    },
    watch:{
        count:{
            handler(val,oldVal){
                console.log(val)
            },
            deep:true
        }
    }
}
</script>

<style lang="css">
    .transition-box {
        margin-bottom: 10px;
        width: 200px;
        height: 100px;
        border-radius: 4px;
        background-color: #409EFF;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
    }
</style>

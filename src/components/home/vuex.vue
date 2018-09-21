<template lang="html">
    <div class="">
        {{count}}
        <el-button @click="add">添加</el-button>
    </div>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex';
export default {
    data(){
        return {

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
</style>

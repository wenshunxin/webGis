<template lang="html">
    <el-select v-model="value" placeholder="请选择" @change="changeSelect">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
</template>

<script>
export default {
    name:"Select",
    data(){
        return {
            options:[],
            value:""
        }
    },
    props:{
        searchList:Array
    },
    mounted(){
        // console.log(this.searchList)
        this.options = this.searchList;
    },
    methods:{
        changeSelect(value){
            this.$emit('selectFunc', value)
        }
    }
}
</script>

<style lang="css">
</style>

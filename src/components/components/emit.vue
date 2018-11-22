<template lang="html">
    <div class="">
        <el-button @click="handleClick">emit</el-button>
    </div>
</template>

<script>
import Bus from "@/assets/Bus";
export default {
    methods:{
        handleClick(){
            Bus.$emit("EMIT_BTN",1)
        }
    }
}
</script>

<style lang="css">
</style>

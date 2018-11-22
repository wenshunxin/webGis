<template lang="html">
    <div class="">
        {{index}}
    </div>
</template>

<script>
import Bus from "@/assets/Bus";
export default {
    data(){
        return {
            index:0
        }
    },
    created(){
        Bus.$on("EMIT_BTN",this.getData1)
    },
    mounted(){
    },
    methods:{
        getData1(data){
            console.log(new Date())
            this.index += data;
        }
    },
    beforeDestroy () {
      Bus.$off('EMIT_BTN')
    }
}
</script>

<style lang="css">
</style>

<template lang="html">
    <div class="">
        <emitModule />
        <onModule />
        <div class="">
            {{ data | $_filterType("name") }}
        </div>
    </div>
</template>

<script>
import emitModule from "@/components/components/emit";
import onModule from "@/components/components/on";
export default {
    data(){
        return {
            data:{
                name:"张三",
                age:24
            }
        }
    },
    components:{
        emitModule,
        onModule
    },
    mounted(){
        console.log(this.$children)
    }
}
</script>

<style lang="css">
</style>

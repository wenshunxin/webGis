<template lang="html">
    <div class="login">
        我是登陆页面
        <el-button @click="jump">Click Me</el-button>
        <ul>
            <li v-for="i in data">
                {{i}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"Login",
    data() {
        return {
            data:[1,2,3],
            obj:[
                {
                    1:"文本"
                },
                {
                    2:"文本"
                },
                {
                    3:"文本"
                }
            ],
            o:[]
        }
    },
    mounted(){
        this.data.forEach(item=>{
            let obj = {};
            obj[item] = "文本";
            this.o.push(obj)
        });
        console.log(this.o)
    },
    methods:{
        jump(){
            this.$router.push("/home");
        }
    }
}
</script>

<style lang="css">
</style>

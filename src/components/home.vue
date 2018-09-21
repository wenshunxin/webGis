<template>
    <el-container>
        <el-header>Header</el-header>
        <el-container  id="home">
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="isCollapse" :unique-opened="true" background-color="#000000" text-color="#ffffff" :collapse-transition="true">
                <el-submenu v-for="(data,key_0) in menuData2" :index="data.name" :key="key_0">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{data.name}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item  v-for="(item,key_1) in data.children" :index='item.name' :key="key_1" @click="jump(item.path)">{{item.name}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-button @click="openOrClose" class="stretch-btn" :class="isCollapse?'el-icon-d-arrow-left':'el-icon-d-arrow-right'"></el-button>
            </el-menu>
            <el-main :style="style">
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {
                isCollapse:false,
                style:{
                    left:"200px"
                },
                menuData1: [{
                    name: 'nav 1'
                },{
                    name: 'nav 2',
                    selected: true
                },{
                    name: 'nav 3'
                }],
                menuData2: [
                    {
                        name: '基础组件',
                        icon: 'laptop',
                        children: [{
                            name: '表格',
                            path:"/home/table"
                        },{
                            name: '表单',
                            path:"/home/form"
                        },{
                            path:"/home/ol",
                            name:"地图"
                        },{
                            path:"/home/vuex",
                            name:"状态管理"
                        }]
                    },
                    {
                        name: '基础组件67',
                        icon: 'laptop',
                        children:[{
                            path:"/home/settable",
                            name:"动态表格"
                        },{
                            path:"/home/draw",
                            name:"画框"
                        }]
                    }
                ]
            }
        },
        computed:{

        },
        methods:{
            jump(value){
                this.$router.push(value)
            },
            openOrClose(){
                this.isCollapse = !this.isCollapse;
                this.style = this.isCollapse ? {left:"65px"} :{left:"200px"}
            }
        },
    }
</script>
<style lang="css">
    .el-container {
      height:100%;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }
    .el-menu{
        height:100%;
    }
    .stretch-btn{
      width: 100%;
      height: 20px;
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 0;
      border-radius: 0;
      background: #21324F;
      border: 1px solid #23314A;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }

    #home{
        position: relative;
    }
    .el-menu-vertical-demo{
        position: absolute;
        top:0;
        left:0;
        bottom: 0;
        z-index:9;
    }
    .el-main{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
    }
</style>

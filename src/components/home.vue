<template>
    <el-container>
        <el-header>
            <el-color-picker
                v-model="theme"
                class="theme-picker"
                popper-class="theme-picker-dropdown"/>

                <el-button @click="handleBtn">按钮</el-button>
        </el-header>
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
                <transition name="fade" mode="out-in">
                    <router-view :key="key"/>
                </transition>
            </el-main>

        </el-container>
    </el-container>
</template>
<script>
const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF' // default color
    export default {
        data() {
            return {
                chalk: '',
                theme:ORIGINAL_THEME,
                isCollapse:false,
                style:{
                    left:"200px",
                    right:"0"
                },
                width:"200px",
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
                        },{
                            path:"/home/theme",
                            name:"主题"
                        },{
                            path:"/home/draggable",
                            name:"拖拽"
                        },{
                            path:"/home/editor",
                            name:"编辑器"
                        },{
                            path:"/home/cropperjs",
                            name:"裁剪"
                        },{
                            path:"/home/tree",
                            name:"树"
                        }]
                    },{
                        name:"地图组件",
                        icon:"map",
                        children:[
                            {
                                path:"/home/ranging",
                                name:"地图测距"
                            },{
                                path:"/home/emit-on",
                                name:"中转站"
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            key() {
                console.log(this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date())
                // 或者 :key="route.fullPath" 只要保证key唯一就可以了
                return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
            }
        },
        methods:{
            handleBtn(){
                this.width=this.width=="200px"?"0":"200px";
                // this.style["right"]=this.style["right"]=="200px"?"0":"200px";
            },
            jump(value){
                this.$router.push(value)
            },
            openOrClose(){
                this.isCollapse = !this.isCollapse;
                this.style = this.isCollapse ? {left:"65px"} :{left:"200px"}
            },
            updateStyle(style, oldCluster, newCluster) {
                   console.log(style);
                   console.log(oldCluster);
                   console.log(newCluster)
             let newStyle = style
             oldCluster.forEach((color, index) => {
               newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
             })

             return newStyle

           },

           getCSSString(url, callback, variable) {
             const xhr = new XMLHttpRequest()
             xhr.onreadystatechange = () => {
               if (xhr.readyState === 4 && xhr.status === 200) {
                 this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
                 callback()
               }
             }
             xhr.open('GET', url)
             xhr.send()
           },

           getThemeCluster(theme) {
             const tintColor = (color, tint) => {
               let red = parseInt(color.slice(0, 2), 16)
               let green = parseInt(color.slice(2, 4), 16)
               let blue = parseInt(color.slice(4, 6), 16)

               if (tint === 0) { // when primary color is in its rgb space
                 return [red, green, blue].join(',')
               } else {
                 red += Math.round(tint * (255 - red))
                 green += Math.round(tint * (255 - green))
                 blue += Math.round(tint * (255 - blue))

                 red = red.toString(16)
                 green = green.toString(16)
                 blue = blue.toString(16)

                 return `#${red}${green}${blue}`
               }
             }

             const shadeColor = (color, shade) => {
               let red = parseInt(color.slice(0, 2), 16)
               let green = parseInt(color.slice(2, 4), 16)
               let blue = parseInt(color.slice(4, 6), 16)

               red = Math.round((1 - shade) * red)
               green = Math.round((1 - shade) * green)
               blue = Math.round((1 - shade) * blue)

               red = red.toString(16)
               green = green.toString(16)
               blue = blue.toString(16)

               return `#${red}${green}${blue}`
             }

             const clusters = [theme]
             for (let i = 0; i <= 9; i++) {
               clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
             }
             clusters.push(shadeColor(theme, 0.1))
             return clusters
           }
        },
        watch: {
            theme(val, oldVal) {
              // console.log(val)
              if (typeof val !== 'string') return
              const themeCluster = this.getThemeCluster(val.replace('#', ''))
              // console.log(themeCluster)
              const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
              // console.log(themeCluster, originalCluster)
              const getHandler = (variable, id) => {
                return () => {
                  const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))

                  const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)

                  let styleTag = document.getElementById(id);
                  // console.log(styleTag)
                  if (!styleTag) {
                    styleTag = document.createElement('style')
                    styleTag.setAttribute('id', id)
                    document.head.appendChild(styleTag)
                  }
                  styleTag.innerText = newStyle
                }
              }

              const chalkHandler = getHandler('chalk', 'chalk-style')

              if (!this.chalk) {

                const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
                this.getCSSString(url, chalkHandler, 'chalk')
              } else {


                chalkHandler()
                console.log("1")
                 console.log(this["chalk"]);
              }

              const styles = [].slice.call(document.querySelectorAll('style'))
                .filter(style => {
                  const text = style.innerText
                  return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
                })
              styles.forEach(style => {
                const { innerText } = style
                if (typeof innerText !== 'string') return
                style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
              })
              this.$message({
                message: '换肤成功',
                type: 'success'
              })
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
        background: #ccc;
    }
    .rightDiv{
        position: absolute;
        right:0;
        /* width:200px; */
        height:100%;
        top:0;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
</style>

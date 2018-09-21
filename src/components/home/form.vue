<template>
    <div id="buttons">
        <p class="p_buttons">
            <span v-for="(item,index) in buttons" :key="index" style="padding-right: 5px;">
                <el-button type="text" :icon="item.icon" :disabled="item.disabled" v-bind:data="index" @click="draw_point(index)">{{item.text}}</el-button>
                <i class="icon_left"></i>
            </span>
        </p>
        <p class="p_tool">
            <span class="p_item p_item_0" v-if="index == 0" style="left:0;">
                <el-button type="text"><i class="el-icon-close"></i></el-button>
                <el-button type="text"><i class="el-icon-check"></i></el-button>
            </span>
            <span class="p_item p_item_1" v-else-if="index == 1" style="left:50px;">
                <el-button type="text"><i class="el-icon-close"></i></el-button>
                <el-button type="text"><i class="el-icon-check"></i></el-button>
                <el-button type="text"><i class="el-icon-close"></i></el-button>
                <el-button type="text"><i class="el-icon-check"></i></el-button>
            </span>
            <span class="p_item p_item_2 p_item_btn"  v-else-if="index == 2" style="left:52px;">
                <el-button-group>
                    <el-button class="p_button_color" :class="{isActive:draw_area_index == index}" v-for="(item,index) in buttons_area" :key="index" @click="draw_area(index)">{{item}}</el-button>
                </el-button-group>
                <span style="display:block; height: 22px;line-height: 20px;" v-if="draw_area_index == 0">
                    <el-button type="text"><i class="el-icon-close"></i></el-button>
                    <el-button type="text"><i class="el-icon-check"></i></el-button>
                    <el-button type="text"><i class="el-icon-close"></i></el-button>
                    <el-button type="text"><i class="el-icon-check"></i></el-button>
                </span>
                <span style="display:block; height: 22px;line-height: 20px;" v-else-if="draw_area_index == 1">
                    <el-button type="text"><i class="el-icon-close"></i></el-button>
                    <el-button type="text"><i class="el-icon-check"></i></el-button>
                    <el-button type="text"><i class="el-icon-close"></i></el-button>
                    <el-button type="text"><i class="el-icon-check"></i></el-button>
                </span>
                <span style="display:block; height: 22px;line-height: 20px;" v-else-if="draw_area_index == 2">
                    <el-button type="text"><i class="el-icon-close"></i></el-button>
                    <el-button type="text"><i class="el-icon-check"></i></el-button>
                </span>
            </span>

            <span class="p_item p_item_3"  v-else-if="index == 3" style="left:192px;">
                <el-button type="text"><i class="el-icon-close"></i></el-button>
                <el-button type="text"><i class="el-icon-check"></i></el-button>
            </span>
            <span class="p_item p_item_4"  v-else-if="index == 4" style="left:223px;">
                <el-button-group>
                  <el-button v-for="(options,index) in buttons_marge" :class="{isActive:draw_area_index == index}" :key="index" @click="draw_area(index)">{{options}}</el-button>
                </el-button-group>
                <span style="display:block; height: 22px;line-height: 20px;">
                    <el-button type="text"><i class="el-icon-close"></i></el-button>
                    <el-button type="text"><i class="el-icon-check"></i></el-button>
                    <el-button type="text"><i class="el-icon-close"></i></el-button>
                    <el-button type="text"><i class="el-icon-check"></i></el-button>
                </span>
            </span>

            <span class="p_item p_item_6 p_item_btn"  v-else-if="index == 6" style="right:23px;">
                <el-button-group>
                  <el-button v-for="(options,index) in buttons_ranging" :class="{isActive:draw_area_index == index}" :key="index" @click="draw_area(index)">{{options}}</el-button>
                </el-button-group>
            </span>
            <span class="p_item p_item_7 p_item_btn"  v-else-if="index == 7" style="right:0;">
                <el-button-group>
                 <el-button v-for="(options,index) in buttons_box" :class="{isActive:draw_area_index == index}" :key="index" @click="draw_area(index)">{{options}}</el-button>
                </el-button-group>
            </span>
        </p>
    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
            return {
                buttons:[
                    {
                        icon:"el-icon-location",
                        disabled:false,
                        text:"画点"
                    },
                    {
                        icon:"el-icon-location",
                        disabled:false,
                        text:"画线"
                    },
                    {
                        icon:"el-icon-location",
                        disabled:false,
                        text:"画区"
                    },
                    {
                        icon:"el-icon-location",
                        disabled:false,
                        text:"合并"
                    },
                    {
                        icon:"el-icon-location",
                        disabled:false,
                        text:"拆分"
                    },
                    {
                        icon:"el-icon-rank",
                        disabled:false,
                        text:"平移"
                    },
                    {
                        icon:"el-icon-location",
                        disabled:false,
                        text:"测距"
                    },
                    {
                        icon:"el-icon-location",
                        disabled:false,
                        text:"框选"
                    }
                ],
                buttons_area:["自由画区","沿路画区","原型画面"],
                buttons_marge:["线拆分","面拆分"],
                buttons_ranging:["直线测距","道路测距"],
                buttons_box:["圆形框选","矩形框选","多边形框选"],
                index:-1,
                draw_area_index:0
            }
        },
        props:{

        },
        computed:{

        },
        methods:{
            draw_point(index){
                console.log(index);
                this.index  = index;
                this.draw_area_index = 0;
            },
            draw_area(index){
                this.draw_area_index = index;
            }
        }
    }
</script>
<style media="screen">
    #buttons{
        width:520px;
    }
    .p_buttons{
        width:520px;
        height:40px;
        line-height: 40px;
        box-sizing: border-box;
        padding: 0 20px;
        border:1px solid red;
        box-shadow: 0px 3px 10px #bbb;
        margin:0;
        overflow:hidden;
    }
    i.icon_left{
        width: 1px;
        height: 12px;
        display: inline-block;
        border-right: 1px dashed #bbb;
    }
    .el-button--text{
        color:#333;
    }
    .p_tool{
        margin:0;
        position: relative;
        width:520px;
    }
    .p_tool .p_item{
        position: absolute;
        top:3px;
        width: auto;
        display: block;
        overflow: hidden;
        min-height: 30px;
        background: #fff;
        border: 1px solid #ddd;
        box-shadow: 0 0 5px 0 rgba(0,0,0,.1);
        padding: 0 10px;
        line-height: 30px;
    }
    .p_tool .p_item button.el-button{
        padding-top:0px;
        padding-bottom: 0px;
    }
    .p_tool .el-button{
        padding: 0 5px;
    }
    .p_tool .p_item button.p_button_color{
        padding-top:0px;
        padding-bottom: 0px;
        border-color: #19AC9E;
    }
    .p_tool .p_item button.p_button_color:hover{
        background: #19AC9E;
        color:#fff;
    }
    .p_tool .el-button-group .el-button:focus, .p_tool .el-button-group .el-button:hover{
        color: #fff;
        border-color: #19AC9E;
        background-color: #19AC9E;
    }
    .isActive{
        background: #19AC9E;
        color:#fff;
    }
</style>

<template lang="html">
    <div class="">
        <el-table
          :data="data.datas"
          border
          size="mini"
          @header-click="handleRow"
          style="width: 100%">
          <!-- <el-table-column v-for="item in data.header" :key="item"
            :prop="item"
            :label="item"
            width="200">
          </el-table-column> -->
          <template v-for="item in data.header">
              <el-table-column
                :prop="item"
                :label="item"
                width="200" >
              </el-table-column>
          </template>
        </el-table>
    </div>
</template>
<script>
import $ from 'jquery';
export default {
    data(){
        return {
            header:[],
            data:{
                header:["客户名称","公司电话","移动电话","客户类型","所属行业","公司规模",
                "客户性质","单位性质","客户来源","公司地址","省份","城市","公司网址",
                "传真","邮编","邮件","QQ","关系等级","重要等级","投资来源","信用等级",
                "销售市场","开票单位","开票单位地址",
                "银行帐号","税号","开户银行","开票联系电话","联系人姓名",
                "联系电话","所属部门",
                "geom"],
                datas:[
                    {
                        geom:"Point(112 92)",
                        信用等级:"一般",
                        公司地址:"兰州市下徐家湾7号",
                        公司电话:"0931-8321680",
                        公司网址:"http://www.gsny.gov.cn",
                        公司规模:"50人以下",
                        关系等级:"一般",
                        单位性质:"政府部门",
                        城市:"兰州",
                        客户名称:"甘肃省农业机械化技术推广总站",
                        客户性质:"客户",
                        客户来源:"主动开拓",
                        客户类型:"潜在用户",
                        所属行业:"农业",
                        投资来源:"大陆",
                        省份:"甘肃",
                        移动电话:"13893667249",
                        联系人姓名:"王博炜",
                        联系电话:"0931-8321680",
                        重要等级:"一般",
                        销售市场:"内销"
                    },
                    {
                        geom:"Point(112 92)",
                        信用等级:"一般",
                        公司地址:"兰州市下徐家湾7号",
                        公司电话:"0931-8321680",
                        公司网址:"http://www.gsny.gov.cn",
                        公司规模:"50人以下",
                        关系等级:"一般",
                        单位性质:"政府部门",
                        城市:"兰州",
                        客户名称:"甘肃省农业机械化技术推广总站",
                        客户性质:"客户",
                        客户来源:"主动开拓",
                        客户类型:"潜在用户",
                        所属行业:"农业",
                        投资来源:"大陆",
                        省份:"甘肃",
                        移动电话:"13893667249",
                        联系人姓名:"王博炜",
                        联系电话:"0931-8321680",
                        重要等级:"一般",
                        销售市场:"内销"
                    }
                ]
            },
            value:"选项1"
        }
    },
    created(){
        this.setHeader();
    },
    mounted(){
        let that = this;
        let td
        for(let i=0;i<this.data.header.length;i++){
            td +=`<td>
                <div class="cell">
                    <select  class="el-input__inner select el-icon-arrow-down" type=${i}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
            </td>`
        };
        // console.log(tr)
        let tr = "<tr>"+td+"</tr>"
        $(".has-gutter").append(tr);
        $('.select').change(function(e){;
            console.log($(this).val())
            console.log($(this).attr("type"));
            console.log(that.data.header[$(this).attr("type")])
        })
    },
    methods:{
        handleRow(column, event){
            console.log(column)
        },
        setHeader(){
            this.data.header.forEach(item=>{
                let header =  item+"(文本型)";
                this.header.push(header);
            });
        },
        handleChange(){
            console.log(1)
        }
    }
}
</script>
<style lang="css">
</style>

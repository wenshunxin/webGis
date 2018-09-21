<template>
    <div>
        <!-- 表格
        <Select :searchList="options" @selectFunc="getChangeSelect"></Select>
        <h1>{{count}}</h1>
        <el-button type="primary" @click="add">增加</el-button> -->
    </div>
</template>
<script>
    import Select from "../components/select";
    export default{
        data(){
            return {
                options: [{
                  value: '黄金糕',
                  label: '黄金糕'
                }, {
                  value: '双皮奶',
                  label: '双皮奶'
                }, {
                  value: '蚵仔煎',
                  label: '蚵仔煎'
                }, {
                  value: '龙须面',
                  label: '龙须面'
                }, {
                  value: '北京烤鸭',
                  label: '北京烤鸭'
              }],
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
              }
            }
        },
        components: {
            Select
        },
        computed: {
            count(){
        	    return this.$store.state.count
            }
        },
        mounted(){
            console.log(this.data)
        },
        methods:{
            getChangeSelect(value){
                console.log(value)
            },
            add(){
                this.$store.commit('increment');
            }
        }
    }
</script>

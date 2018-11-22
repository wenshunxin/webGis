<template lang="html">
    <div class="login" :style ="note">
        <div class="ant-farmers">
            <!-- <img src="@/assets/slogan_g.png" alt=""> -->
        </div>
        <!-- 表单 -->
        <div class="ant-form">
            <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="" prop="userName">
                    <el-input type="text" class="input_txt" v-model="ruleForm.userName" auto-complete="off" placeholder="输入您的账号" required></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input type="password" class="input_txt" v-model="ruleForm.password" auto-complete="off" placeholder="输入您的密码" required></el-input>
                </el-form-item>
                <el-form-item label="" >
                    <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn">提交</el-button>
                </el-form-item>
            </el-form>
            <p class="login_sit">
               获取新账号请咨询 <span>4006 - 591 - 945</span>
            </p>
            <div class="footer">
                所有版权归北京天创金农科技有限公司所有
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            note:{
                width:"100%",
                height:"100%",
                backgroundImage: "url(" + require("@/assets/bg.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%"
            },
            ruleForm: {
                userName: '',
                password: '',
            }
        }
    },
    methods:{
        submitForm(){
            this.$router.push("/home")
        }
    }
}
</script>

<style lang="css">
    .ant-farmers{
        position: fixed;
        width: 534px;
        height: 179px;
        left: 10%;
        top: 50%;
        margin-top: -90px;
    }
    .ant-form{
        width: 370px;
        height: 350px;
        position: fixed;
        right: 175px;
        top: 50%;
        margin-top: -175px;
    }
    .el-input__inner{
        display: block;
        width: 100%;
        height: 68px;
        line-height: 68px;
        /* padding: 20px 0; */
        background: #fff;
        margin-bottom: 30px;
        color: #999;
        font-size: 22px;
        font-style: italic;
        text-indent: 25px;
        display: block;
        border-radius: 10px;
        border: 0;
        overflow: hidden;
    }
    .el-input__inner:focus{
        border: 0;
        outline: none;
    }
    .login-btn{
        display: block;
        width: 140px;
        height: 62px;
        background: #51d294;
        font-size: 26px;
        margin: 8px auto 27px;
        cursor: pointer;
        border:0;
        outline: none;
    }
    .login-btn:hover{
        background: #51d294;
    }
    .login-btn:active{
        background: #51d294;
    }
    .login-btn:focus{
        background: #51d294;
    }
    .login_sit{
        color: #fff;
        text-align: center;
        border-top: 1px dashed #fff;
        padding-top: 26px;
        font-size: 16px;
    }
    .login_sit span{
        color: #51d294;
        font-size: 14px;
        padding-left: 10px;
    }
    .footer, .logo{
        position: fixed;
    }
    .footer{
        color: #fff;
        font-size: 14px;
        text-align: center;
        bottom: 15px;
        width: 370px;
    }
    .el-form-item__content{
        margin:0 !important;
    }
</style>

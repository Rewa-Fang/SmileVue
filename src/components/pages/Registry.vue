<template>
  <div class="registry-vue">
    <van-nav-bar title="用户注册" left-text="返回" right-text="登录" 
    left-arrow @click-left="onBack" @click-right="onLogin" />
    <van-cell-group class="reg-from">
      <van-field
        v-model="userName"
        required
        clearable
        label="用户名"
        icon="error"
        placeholder="请输入用户名"
        @click-icon="userName=''"
        :error-message="userNameErrorMsg"
      />
      <van-field
        v-model="passWord"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <van-button class="register-button" @click="registerAction" size="large" type="primary" :loading="openLoading">确认注册</van-button>
      <van-button class="login-button" @click="onLogin" size="large" type="default" >已有账号 登录</van-button>
    </van-cell-group>
  </div>
</template>
<script>
  import axios from 'axios';
  import URL from '../../serviceAPI.config.js';
  import {Toast} from 'vant';
  export default{
    data(){
      return {
        userName:'',
        passWord:'',
        openLoading:false, //防止重复提交
        userNameErrorMsg:'',　//验证提示信息
        passwordErrorMsg:'',  //验证提示信息
      }
    },
    methods:{
      onBack(){
        this.$router.go(-1);
      },
      onLogin(){
        this.$router.push('/login')
      },
      registerAction(){
        this.checked() && this.axiosRegisterUser()
      },
      axiosRegisterUser(){
        this.openLoading = true;
        axios({
            url: URL.postRegister,
            method: 'post',
            data:{
                userName:this.userName,
                password:this.passWord 
            }
        })
        .then(response => {
            console.log(response)
            if(response.data.code == 200){
              Toast.success(response.data.message);
              this.$router.push('/');
            }else{
              Toast.fail('注册失败')
              this.openLoading = false;
              console.log(response.data.message);
            }
        })
        .catch((error) => {
            console.log(error)
            this.openLoading = false;
            Toast.fail('注册失败')
        })
      },
      checked(){
        let checkIsOK = true;
        if(this.userName.length < 5){
          this.userNameErrorMsg = '用户名长度不少于5位';
          checkIsOK = false;
        }else{
          this.userNameErrorMsg = '';
        }
        if(this.passWord.length < 6){
          this.passwordErrorMsg = '密码长度不少于6位';
          checkIsOK = false;
        }else{
          this.passwordErrorMsg = '';
        }
        return checkIsOK;
      }
    }
  }  
</script>
<style scoped>
  .registry-vue{
    background-color: #fff;
  }
  .reg-from{
    width: 90%;
    margin: 5rem auto;
    border: 1px solid #ddd;
    border-radius: .4rem;
    overflow: hidden;
  }
  .register-button{
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
</style>


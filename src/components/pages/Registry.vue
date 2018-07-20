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
      />
      <van-field
        v-model="passWord"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-button class="register-button" @click="axiosRegisterUser" size="large" type="primary">确认注册</van-button>
    </van-cell-group>
  </div>
</template>
<script>
  import axios from 'axios';
  import URL from '../../serviceAPI.config.js'
  export default{
    data(){
      return {
        userName:'',
        passWord:''
      }
    },
    methods:{
      onBack(){
        this.$router.go(-1);
      },
      onLogin(){

      },
      axiosRegisterUser(){
        axios({
            url: URL.postRegister,
            method: 'post',
            data:{
                username:this.userName,
                password:this.passWord 
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
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
  }
</style>


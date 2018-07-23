<template>
  <div class="registry-vue">
    <van-nav-bar title="用户登录" left-text="返回" right-text="注册" 
    left-arrow @click-left="onBack" @click-right="onRegistry" />
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
      <van-button class="register-button" @click="loginAction" size="large" type="primary" :loading="openLoading">登 录</van-button>
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
    created(){
        if(localStorage.userInfo){
            Toast.success('已登录');
            this.$router.push('/')
        }
    },
    methods:{
      onBack(){
        this.$router.go(-1);
      },
      onRegistry(){
          this.$router.push('/registry')
      },
      loginAction(){
        this.checked() && this.axiosLoginUser()
      },
      axiosLoginUser(){
        this.openLoading = true;
        axios({
            url: URL.login,
            method: 'post',
            data:{
                userName:this.userName,
                password:this.passWord 
            }
        })
        .then(response => {
            if(response.data.code == 200 && response.data.message){
                new Promise((resolve,reject)=>{
                    localStorage.userInfo = {userName:this.userName};
                    setTimeout(()=>{
                        resolve()
                    },500)
                }).then(()=>{
                    Toast.success('login success')
                    this.$router.push('/')
                }).catch(err=>{
                    Toast.fail('localStorage fail')
                    console.log(err);
                })
            }else{
                console.log(response.data.message);
                Toast.fail('login fail:'+response.data.message)
                this.openLoading = false;
            }
        })
        .catch((error) => {
            console.log(error);
            Toast.fail('login error')
            this.openLoading = false;
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
  }
</style>


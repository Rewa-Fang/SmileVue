
<template>
    <div>
        <div class="main-div">
            <!-- 这里用来显示底部导航栏切换显示的页面 -->
         <router-view/>
        </div>
         <!-- 底部导航栏 -->
        <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">分类</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车页</van-tabbar-item>
            <van-tabbar-item icon="contact" info="20">会员中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                nowPath:'',
            }
        },
        created(){
            this.changeTabbarActive();
        },
        methods: {
            changeTabbar(active) {
                console.log(active)
                // active  当前点击的tabbar index  从0开始
                switch(active){
                    case 0:
                        this.$router.push({name:'ShoppingMall'})
                        break;
                    case 1:
                        this.$router.push({name:'CategoryList'})
                        break;
                    case 2:
                        this.$router.push({name:'Cart'})
                        break;
                    case 3:
                        break;
                } 
            },
            changeTabbarActive(){
                this.nowPath = this.$route.path;
                console.log("#############"+this.nowPath);
                if(this.nowPath == "/cart"){
                    this.active = 2;
                }
            }
        },
    }
</script>

<style scoped>
  
</style>

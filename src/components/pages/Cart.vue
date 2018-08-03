<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div>
      <div class="list-item" v-for="(item,index) in cartInfo" :key="index">
        <div class="list-item-img"><img :src="item.image" width="100%" :onerror="errorImg" /></div>
        <div class="list-item-text">
          <div>{{item.Name}}</div>
          <div class="">￥{{item.price | moneyFilter}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: false,
      errorImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"' //错误图片显示路径
    };
  },
  created() {
    this.getCartInfo();
    console.log(this.cartInfo);
  },
  methods: {
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
        this.isEmpty = this.cartInfo.length > 0 ? true : false;
      }
    },
    onClickLeft() {
      // this.$router.push({name:'Goods'});
      this.$router.go(-1);
    },
    beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta  缓存，即不刷新
      to.meta.keepAlive = true;
      next();
    }
  }
};
</script>

<style scoped>
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
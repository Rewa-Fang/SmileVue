
<template>
  <div>
    <!--search bar layout-->
    <div class="search-bar">
      <van-row gutter="5">
        <van-col span="3"><img :src="locationIcon" width="80%" class="location-icon" /></van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- swiper-area -->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" alt="" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type-bar -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" alt="" width="90%">
        <span v-text="cate.mallCategoryName"></span>
      </div>
    </div>
    <!--AD banner area-->
    <div class="add-banner">
      <img v-lazy="advertesPicture" alt="" width="100%">
    </div>
    <!-- recommend-area -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommned-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(recom,index) in recommendGoods" :key="index" class="recommend-item">
            <img v-lazy="recom.image" alt="" width="100%">
            <div>{{ recom.goodsName }}</div>
            <div class="price">￥{{ recom.price | moneyFilter }}(￥{{ recom.mallPrice | moneyFilter }})</div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- floor1 -->
    <floorComponent :floor="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <!-- floor2 -->
    <floorComponent :floor="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <!-- floor3 -->
    <floorComponent :floor="floor3" :floorTitle="floorName.floor3"></floorComponent>

    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <van-row>
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goodsInfo :goodsId="item.goodsId" :goodsName="item.name" :goodsImage="item.image" :goodsPrice="item.price"></goodsInfo>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import goodsInfo from "../component/goodsInfoComponent";
import { toMoney } from "@/filter/moneyFilter.js";
import URL from "@/serviceAPI.config.js";

export default {
  data() {
    return {
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [],
      category: [],
      advertesPicture: "",
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 3
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: []
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  created() {
    axios({ url: URL.getShoppingMall, method: "get" })
      .then(response => {
        console.log(response);
        this.bannerPicArray = response.data.data.slides;
        this.category = response.data.data.category;
        this.advertesPicture =
          response.data.data.advertesPicture.PICTURE_ADDRESS;
        this.recommendGoods = response.data.data.recommend;
        this.floorName = response.data.data.floorName;
        this.floor1 = response.data.data.floor1;
        this.floor2 = response.data.data.floor2;
        this.floor3 = response.data.data.floor3;
        this.hotGoods = response.data.data.hotGoods; //热卖商品
      })
      .catch(error => {
        console.log(error);
      });
  },
  // beforeRouteLeave(to, from, next) {
  //   // 设置下一个路由的 meta  不缓存，即刷新
  //   to.meta.keepAlive = false;
  //   next();
  // }
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid 1px !important ;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swiper-area {
  width: 20rem;
  clear: both;
  max-height: 9.4rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  border-radius: 0.3rem;
  margin: 0 0.3rem 0.3rem 0.3rem;
}
.type-bar div {
  flex: 1;
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
/* .add-banner{
    width: 20rem;
    height: 5rem;
  } */
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  color: #e5017d;
  padding: 0.2rem;
  font-size: 14px;
  border-bottom: 1px solid #eee;
}
.recommned-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.recommend-item img {
  border-bottom: 1px solid #eee;
}
.price {
  color: green;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>

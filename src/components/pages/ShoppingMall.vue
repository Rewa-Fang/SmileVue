
<template>
    <div>
        <!--search bar layout-->
        <div class="search-bar">
            <van-row gutter="5">
                <van-col span="3"><img :src="locationIcon" width="80%" class="location-icon" /></van-col>
                <van-col span="16">
                <input type="text" class="search-input"/>
                </van-col>
                <van-col span="5"><van-button size="mini">查找</van-button></van-col>
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
                        <div>￥{{ recom.price }}(￥{{ recom.mallPrice }})</div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
export default {
    data() {
        return {
            locationIcon: require('../../assets/images/location.png'),
            bannerPicArray:[],
            category:[],
            advertesPicture:'',
            recommendGoods :[],
            swiperOption:{
                slidesPerView:3
            }
        }
    },
    components:{
        swiper,
        swiperSlide
    },
    created(){
        axios({url:'https://easy-mock.com/mock/5b4ef4e52f528a212c9617d4/SmileVue/index',method:'get'})
        .then(response=>{
            console.log(response);
            this.bannerPicArray = response.data.data.slides;
            this.category = response.data.data.category;
            this.advertesPicture = response.data.data.advertesPicture.PICTURE_ADDRESS;
            this.recommendGoods = response.data.data.recommend;
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
</script>

<style scoped>
  .search-bar{
    height: 2.2rem;
    background-color: #e5017d;
    line-height:2.2rem;
    overflow: hidden;
  }
  .search-input{
    width:100%;
    height: 1.3rem;
    border-top:0px;
    border-left:0px;
    border-right:0px;
    border-bottom: 1px solid 1px !important ;
    background-color: #e5017d;
    color:#fff;
  }
  .location-icon{
    padding-top: .2rem;
    padding-left: .3rem;
  }
  .swiper-area{
    width: 20rem;
    clear: both;
    max-height: 9.4rem;
    overflow: hidden;
  }
  .type-bar{
    background-color: #fff;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    border-radius: .3rem;
    margin: 0 .3rem .3rem .3rem;
  }
  .type-bar div{
    flex: 1;
    padding: .3rem;
    font-size: 12px;
    text-align: center;
  }
  /* .add-banner{
    width: 20rem;
    height: 5rem;
  } */  
  .recommend-area{
      background-color: #fff;
      margin-top: .3rem;
  }
  .recommend-title{
      color: #e5017d;
      padding: .2rem;
      font-size: 14px;
      border-bottom: 1px solid #eee;
  }
  .recommned-body{
      border-bottom: 1px solid #eee;
  }
  .recommend-item{
      width:99%;
      border-right: 1px solid #eee;
      font-size: 12px;
      text-align: center;
  }
  .recommend-item img{
      border-bottom: 1px solid #eee;
  }
</style>

<template>
    <div class="goods-info" @click="goGoodsPage">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
    </div>
</template>

<script>
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        props:['goodsImage','goodsName','goodsPrice','goodsId'],
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }  
        },
        methods:{
            goGoodsPage(){
                this.$router.push({name:'Goods',params:{goodsId:this.goodsId}});
            }
        },
        beforeRouteLeave (to, from, next) {
            // 设置下一个路由的 meta  不缓存，即刷新
            to.meta.keepAlive = false;
            next();
        }
    }
</script>

<style scoped>
  .goods-info{
    /* box-sizing: border-box; */
    /* -webkit-box-sizing: border-box; */
  }
  .goods-name{
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap; 
    font-size: 14px;
  }
</style>

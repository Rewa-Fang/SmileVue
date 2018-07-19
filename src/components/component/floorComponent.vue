<template>
  <div class="floor">
    <div class="floor-title">{{ floorTitle }}</div>
    <div class="floor-anomaly">
      <div class="floor1_0">
        <img :src="floor_0.image" alt="" width="100%">
      </div>
      <div>
        <div class="floor1_1"><img :src="floor_1.image" alt="" width="100%"></div>
        <div class="floor1_2"><img :src="floor_2.image" alt="" width="100%"></div>
      </div>
    </div>
    <div class="floor-rule">
      <div v-for="(item,index) in floor.slice(3)" :key="index">
        <img :src="item.image" alt="" width="100%">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['floor','floorTitle'],
    data() {
      return {
        floor_0: {},
        floor_1: {},
        floor_2: {},
      }
    },
    created(){

    },
    watch:{
      floor:function(){
        this.floor_0 = this.floor[0];
        this.floor_1 = this.floor[1];
        this.floor_2 = this.floor[2];
      }
    }
  }
</script>

<style scoped>
.floor-anomaly{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .floor-title{
    width: 20rem;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    font-size: 14px;
    color: #e5017d;
  }
  .floor-anomaly div{
    flex: 10rem ;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .floor1_0{
    border-right: 1px solid #ddd;
  }
  .floor1_1{
    border-bottom: 1px solid #ddd;
  }
  .floor-rule{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
  }
  .floor-rule div{
      width: 10rem;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
  }
  .floor-rule div:nth-child(odd){
      border-right: 1px solid #ddd;
  }
</style>
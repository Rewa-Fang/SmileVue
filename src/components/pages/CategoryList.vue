<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li v-for="(item,index) in category" :key="index" @click="clickCategory(index,item.ID)" :class="{categoryActive:currentIndex==index}">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
              </van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" :loading-text="loadingText" @load="onLoad">
                <div class="list-item" v-for="(item,index) in goodList" :key="index">
                  <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImg" /></div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div class="">￥{{item.ORI_PRICE}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";

export default {
  data() {
    return {
      category: [], //大类数组
      categorySub: [], // 当前子类数组
      currentIndex: 0, // 当前点击大类 用于高亮显示
      active: 0, // 子类tabs默认显示tab
      goodList: [], //商品列表
      categorySub: "", // 商品子类ID
      loading: false, //是否显示加载中提示，加载过程中不触发load事件
      finished: false, //是否已加载完成，加载完成后不再触发load事件
      loadingText: "马上就来...", //加载中提示文案
      isRefresh: true, //下拉刷新
      page: 1,
      errorImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"' //错误图片显示路径
    };
  },
  created() {
    //获取大类数据
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 + "px";
    document.getElementById("list-div").style.height = winHeight - 90 + "px";
  },
  methods: {
    // 获取大类数据
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message;
            this.getCategorySubByCategoryId(this.category[0].ID);
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    clickCategory(index, categoryId) {
      // 点击当前li 如果currentIndex==index 绑定 class 样式
      this.getCategorySubByCategoryId(categoryId);
      this.currentIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodList = [];
    },
    // 根据大类ID获取子类数据
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: { categoryID: categoryId }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message;
            this.active = 0;
            this.categorySubID = this.categorySub[0].ID;
            this.onLoad();
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 加载列表
    onLoad() {
      setTimeout(() => {
        this.categorySubID = this.categorySubID || this.categorySub[0].ID;
        this.getGoodsList();
      }, 1000);
    },
    // 刷新
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = [];
        this.page = 1;
        this.onLoad();
      }, 100);
    },
    // 获取商品信息列表
    getGoodsList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubID: this.categorySubID,
          page: this.page
        }
      })
        .then(response => {
          console.log(response.data.message);

          if (response.data.code == 200 && response.data.message.length) {
            this.page++;
            this.goodList = this.goodList.concat(response.data.message);
          } else {
            Toast("服务异常");
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 点击子类切换商品信息列表
    onClickCategorySub(index, title) {
      this.categorySubID = this.categorySub[index].ID;
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    }
  }
};
</script>

<style scoped>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
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
# smilevue

>  vue+vant+koa2+MongoDB project 


## 笔记 

### 1.创建项目

创建项目目录：

    mkdir SmileVue

安装vue-cli：

    npm install vue-cli -g

初始化项目：

    vue init webpack

启动项目：

    npm run dev 

***
### 2.使用有赞UI组件库 Vant

  安装：

    npm install vant --save

全局引入：

    import Vant from 'vant'

    import 'vant/lib/vant-css/index.css'

    Vue.use(Vant)

按需引入：

安装 babel-plugin-import 

    npm install babel-plugin-import --save--dev

配置.babelrc文件

    "plugins": [

    "transform-vue-jsx",

    "transform-runtime",

    ["import",{"libraryName":"vant","style":true}]

    ]

引入：

    import {Button} from 'vant'

    Vue.use(Button)

页面使用：

    <van-button type="primary">主要按钮</van-button>

***

### 3.移动端适配方案：

1. 固定高度 宽度百分比 （淘汰）

2. Media Query 媒体查询 （主流常用 例：Bootstrap）

3. Flex + rem （本项目采用）

设置mate标签：

    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">

*rem*

根元素字体大小 

如：html标签字体大小为16px 

    1rem = 16px;

    2rem = 32px;

 

JavaScript 根据不同屏幕设置html字体大小  初始化rem 

1. 获取设备宽度

        let htmlWidth = document.documElement.clientWidth || document.body.clientWidth;

2. 获取html节点

        let html = document.getElementsByTagName('html')[0];

3. 设置html字体大小 

        html.style.fontSize = htmlWidth / 20 + 'px';

以iphone 5 为基准初始化rem，  

iphone 5 下html默认字体大小 16px  宽度为320px; 

16px  = 320px / 20; 

以此得出 font-size = 宽度 /20 ;

***
### 4.在components下建立pages文件夹用来存在页面

并新建一个组件 ShoppingMall.vue 

（在vscode编辑下，安装vue vscode snippets可快捷编写vue代码）

设置首页路由：

src/router/index.js

    // 引入新建的组件

    import ShoppingMall from '@/components/pages/ShoppingMall'

    routes: [

    {

    path: '/',

    name: 'ShoppingMall',

    component: ShoppingMall

    }

    ]

Vant 布局：

van-row 行 24等份的行

van-col  列 宽度根据span属性的值

如：

    <van-row>

      <van-col span='8'>占8份宽</van-col>

      <van-col span='12'>占12份宽</van-col>

      <van-col span='4'>占4份宽</van-col>

    </van-row>

***

### 5.解决字体会因页面宽度过大导致字体过大的问题：

    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;

    let html = document.getElementsByTagName('html')[0];

    if(htmlWidth>750){

    htmlWidth = 750;

    }

    html.style.fontSize = htmlWidth / 20 + 'px';
    
  ***

### 6.利用Vant实现图片轮播的懒加载:
    import { Button, Row, Col ,Search , Swipe , SwipeItem , Lazyload  } from 'vant'
    Vue.use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(Lazyload)  

.


    <img :src="banner.imageUrl" width="100%"/>

    改为：

    <img v-lazy="banner.imageUrl" width="100%"/>

 

设置最大高度防止swiper 提示器显示位置异常：

    max-height:12rem; // 具体值根据场景设置

    overflow:hidden;  

***
### 7.安装引入axios:

    npm install axios --save

引入：

    import axios from 'axios'

发送请求：

    created(){

    axios({url:'https://easy-mock.com/mock/5b4ef4e52f528a212c9617d4/SmileVue/index',method:'get'})

    .then(response=>{

      console.log(response);

    })

    .catch(error=>{

      console.log(error);

    })

    }

***

### 8.从胖哥博客上copy的数据 营养鲜果 的图片 比其它4张图片要小。（50*50 ，其它都是70*70）

所以造成了营养鲜果的图片显示要比其它小。布局错乱、

调整修改css :

    .type-bar div{

    flex: 1;

    padding: .3rem;

    font-size: 12px;

    text-align: center;

    }

加上 **flex:1**   即可；

这样.type-bar下面的所有div 宽度都是一样的 

然后img 设置css： width：90%； 

就可以让所有的图片大小一致。

字体设置成12px 比较合适 超过12px在iphone 5等小屏幕上显示会换行。

***
### 9.使用vue-awesome-swiper

安装：

    npm install vue-awesome-swiper --save

全局引入：

    import VueAwesomeSwiper from 'vue-awesome-swiper'

    // require styles

    import 'swiper/dist/css/swiper.css'

    Vue.use(VueAwesomeSwiper)

组件形式引入：

在需要的页面用component的方式引入使用

    import 'swiper/dist/css/swiper.css'

    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
      components: {swiper,swiperSlide}
    }

***
### 10.vue-awesome-swiper组件的使用：

把swiper以组件的形式使用

根据项目需要建立相应的swiper组件页面

在组件中引入使用：

    import 'swiper/dist/css/swiper.css'

    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
            data() {
                return {
                }
            },
            components:{swiper,swiperSlide}
    }

 

再把组件引用到需要的布局的页面:

添加分页器：

在<swiper> 标签下加上一个div用来显示分页指示器：

    <div class="swiper-pagination" slot="pagination"></div>

<swiper> 标签上添加属性：

**:options="swiperOption"**

配置一个对象：  

    data() {
        return {
            slide: [1,2,3,4,5,6],
            swiperOption:{
                pagination:{
                    el:'.swiper-pagination'
                }
            }
        }
    }

竖屏切换效果：
 

修改方向为垂直 **direction:'vertical'**

    swiperOption:{
        direction:'vertical',
        pagination:{
            el:'.swiper-pagination'
        }
    }
 
 ***

### 11.vue-awesome-swiper 组件属性：

    direction：’vertical’ 设置竖排显示

    slidesPerView:’auto’  设置同屏显示的数量，默认为1，这里使用auto是随意的意思。

    freeMode:true 默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合。

    mousewheel:true 开启鼠标滚轮控制Swiper切换。可设置鼠标选项，或true使用默认值。

.  

    data() {
        return {
            swiperOption:{
                direction:'vertical',
                slidesPerView: 'auto',
                freeMode:true,
                mousewheel:true
            }
        }
    },

分页指示器可点击切换页面(swiper-slide)：**clickable:true**

    pagination:{
        el:'.swiper-pagination',
        clickable:true
    }
 

无限循环滚动  **loop:true**

    data() {
        return {
            slide: [1,2,3,4,5,6],
            swiperOption:{
                loop:true,
                pagination:{
                    el:'.swiper-pagination',
                    clickable:true
                }
            }
        }
    },
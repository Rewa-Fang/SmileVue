const BASEURL = 'https://easy-mock.com/mock/5b4ef4e52f528a212c9617d4/SmileVue/';
const LOCALHOST = 'http://192.168.1.125:3000/';
const URL = {
  getShoppingMall : BASEURL + 'index',
  getUser : LOCALHOST + 'user',
  postRegister : LOCALHOST + 'user/register',
  login : LOCALHOST + 'user/login',
  goodsInfo : LOCALHOST + 'goods/getDetailGoodsInfo',
  getCategoryList : LOCALHOST + 'goods/getCategoryList',
  getCategorySubList : LOCALHOST + 'goods/getCategorySubList',
  getGoodsListByCategorySubID : LOCALHOST + 'goods/getGoodsListByCategorySubID',
}

export default URL;
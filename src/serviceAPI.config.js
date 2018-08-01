const BASEURL = 'https://easy-mock.com/mock/5b4ef4e52f528a212c9617d4/SmileVue/';
const LOCALHOST = 'http://localhost:3000/';
const URL = {
  getShoppingMall : BASEURL + 'index',
  getUser : LOCALHOST + 'user',
  postRegister : LOCALHOST + 'user/register',
  login : LOCALHOST + 'user/login',
  goodsInfo : LOCALHOST + 'goods/getDetailGoodsInfo',
}

export default URL;
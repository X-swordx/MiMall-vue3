import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './action'

const state = {
  username: '', //登录用0
  cartCount: 0, //购物车商品数量
}
export default createStore({
  state,
  mutations,
  actions,
})

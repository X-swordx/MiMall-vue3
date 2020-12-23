<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import cookie from 'vue-cookie'
import axios from 'axios'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
export default {
  name: 'app',
  setup(){
    const store = useStore()
    const getUser = ()=> {
      axios.get('/user').then((res={})=>{
        store.commit('saveUserName',res.username);
      })
    }
    const getCartCount = ()=>{
      axios.get('/carts/products/sum').then((res=0)=>{
        store.commit('saveCartCount',res);
      })
    }
    onMounted(()=>{
      if(cookie.get('userId')){
        getUser();
        getCartCount();
      }
    })
    return {
      getUser,
      getCartCount
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
</style>

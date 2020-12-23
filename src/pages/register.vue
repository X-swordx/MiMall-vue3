<template>
  <div class="register">
    <div class="wrapper">
      <div class="logo">
        <img
          src="https://account.xiaomi.com/static/res/349d9c1/account-static/respassport/acc-2014/img/milogo.png"
          alt=""
        />
      </div>
      <h2>注册小米帐号</h2>
      <div class="regbox">
        <div class="input">
          <input type="text" placeholder="请输入注册帐号" v-model="username" />
        </div>
        <div class="input">
          <input
            type="password"
            placeholder="请输入注册密码"
            v-model="password"
          />
        </div>
        <div class="input">
          <input type="text" placeholder="请输入注册邮箱" v-model="email" />
        </div>
        <div class="btn-box">
          <a href="javascript:;" class="btn" @click="register">立即注册</a>
        </div>
      </div>
      <p class="tip">
        已阅读并同意：小米 <a href="#">用户协议</a>和 <a href="#">隐私政策</a>
      </p>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavFooter from './../components/NavFooter'
import { message } from 'ant-design-vue'
import { getCurrentInstance, ref } from 'vue'
export default {
  name: 'login',
  components: {
    NavFooter,
  },
  setup() {
    const { ctx } = getCurrentInstance()
    let username = ref('')
    let password = ref('')
    let email = ref('')

    const register = () => {
      let { username, password, email } = ctx
      if (!username) {
        message.error('用户名不能为空')
        return
      }
      if (username.length < 5) {
        message.error('用户名长度必须大于5位')
        return
      }
      if (!password) {
        message.error('密码不能为空')
        return
      }
      if (password.length < 5) {
        message.error('密码长度必须大于5位')
        return
      }
      if (!/[a-zA-Z0-9_]+@\w+.com/.test(email)) {
        message.error('邮箱格式不正确')
        return
      }
      ctx.$axios
        .post('/user/register', {
          username,
          password,
          email,
        })
        .then(() => {
          message.info('注册成功，请去登录')
          username.value = ''
          password.value = ''
          email.value = ''
        })
    }
    return {
      username,
      password,
      email,
      register,
    }
  },
}
</script>
<style lang="scss">
.register {
  background: #f9f9f9;
  padding-top: 30px;
  height: calc(100vh - 30px);
  .wrapper {
    width: 854px;
    margin: 0 auto;
    margin-bottom: 10px;
    background-color: #ffffff;
    padding-bottom: 10px;
    h2 {
      text-align: center;
      color: #333;
      font-size: 30px;
    }
    .regbox {
      width: 350px;
      padding: 30px 0;
      line-height: 20px;
      margin: 0 auto;
    }
    .tip {
      text-align: center;
      color: #9d9d9d;
      a {
        font-weight: bold;
        color: #333;
      }
    }
    .logo {
      text-align: center;
      padding-bottom: 40px;
    }
    .input {
      display: inline-block;
      width: 348px;
      height: 50px;
      border: 1px solid #e5e5e5;
      margin-bottom: 20px;
      input {
        width: 100%;
        height: 100%;
        border: none;
        padding: 18px;
      }
    }
    .btn {
      width: 100%;
      line-height: 50px;
      margin-top: 10px;
      font-size: 16px;
    }
  }
}
</style>

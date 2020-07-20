<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">抓好，坐稳，发车啦！~</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px;" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Form as ElForm, Input } from 'element-ui'

@Component
export default class Login extends Vue {
  loginForm = {
    username: '',
    password: '',
  }
  loginRules = {
    username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
    password: [
      {
        required: true,
        trigger: 'blur',
        validator: this.validatePassword,
      },
    ],
  }
  loading: Boolean = false
  passwordType: String = 'password'
  redirect = undefined

  @Watch('$route', { immediate: true })
  onRouteChang(route: Route) {
    const query = route.query as any
    if (query) {
      this.redirect = query.redirect
    }
  }

  mounted() {
    if (this.loginForm.username === '') {
      ;(this.$refs.username as Input).focus()
    } else if (this.loginForm.password === '') {
      ;(this.$refs.password as Input).focus()
    }
  }

  validatePassword(rule, value, callback) {
    if (value.length < 6) {
      callback(new Error('密码长度不能少于六位。'))
    } else {
      callback()
    }
  }
  showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      ;(this.$refs.password as Input).focus()
    })
  }
  handleLogin() {
    ;(this.$refs.loginForm as ElForm).validate(async (valid) => {
      if (valid) {
        this.loading = true
        try {
          const auth = await this.$axios.post(`auth/login`, this.loginForm)

          localStorage.setItem('bearer', JSON.stringify(auth.data))
          this.$router.push({ path: this.redirect || '/' })
        } catch (e) {
          console.log(e)
        } finally {
          this.loading = false
        }
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
}
</script>

<style>
/* reset element-ui css */
.login-container .el-input {
  display: inline-block;
  height: 47px;
  width: 85%;
}
.login-container .el-input input {
  background: transparent;
  border: 0px;
  -webkit-appearance: none;
  border-radius: 0px;
  padding: 12px 5px 12px 15px;
  color: #fff;
  height: 47px;
  caret-color: #fff;
}

.login-container .el-input :-webkit-autofill {
  box-shadow: 0 0 0px 1000px #2d3a4b inset !important;
  -webkit-text-fill-color: #fff !important;
}

.login-container .el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
}
</style>

<style scoped>
.login-container {
  height: 100vh;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
}
.login-container .login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}

.login-container .svg-container {
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.login-container .title-container {
  position: relative;
}
.login-container .title-container .title {
  font-size: 26px;
  color: #eee;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}

.login-container .show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
</style>

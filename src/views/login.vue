<template>
  <div class="login-container w-100 h-100 d-flex flex-column justify-content-center">
    <div class="login-panel d-flex flex-column align-self-center">
      <label class="text-center title">Login</label>

      <div class="login-item d-flex flex-column">
        <el-input placeholder="Username" v-model="username" @input="resetError"></el-input>
        <ui-message class="hidden" :class="{active: error === 1}">Please enter a username.</ui-message>
      </div>

      <div class="login-item d-flex flex-column">
        <el-input
          placeholder="Password"
          type="password"
          v-model="password"
          @keyup.enter.native="commit"
          @input="resetError"
        ></el-input>
        <ui-message class="hidden" :class="{active: error === 2}">Please enter a password.</ui-message>
      </div>

      <div class="login-control d-flex justify-content-center">
        <el-button
          class="w-100"
          type="primary"
          @click="commit"
          :loading="busy"
        >{{ controlButtonText }}</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Direction } from '@/router'
import { userController } from './user-controller'

const enum Error {
  None = 0,
  EmptyUsername,
  EmptyPassword
}

@Component({ components: {} })
export default class Login extends Vue {
  private username = ''
  private password = ''
  private error: Error = Error.None

  private busy = false
  private controlButtonText = 'Login'

  private commit() {
    if (!this.username) {
      return (this.error = Error.EmptyUsername)
    }
    if (!this.password) {
      return (this.error = Error.EmptyPassword)
    }
    this.busy = true
    this.controlButtonText = 'Logining...'
    this.resetError()
    setTimeout(() => {
      this.busy = false
      this.popup.success(
        `Welcome back, ${userController.userLogined(this.username)}`
      )
      this.go(Direction.Home)
    }, 1000)
  }

  private resetError() {
    this.error = Error.None
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);

  .login-panel {
    margin: 25px;
    padding: 50px;
    border-radius: 15px;
    background-color: #fff;
    margin-top: -15%;

    .title {
      font-size: 25px;
      margin: 10px 0 20px 0;
    }

    .login-item {
      & + .login-item {
        margin-top: 5px;
      }
    }

    .login-control {
      margin-top: 10px;
    }
  }
}
</style>

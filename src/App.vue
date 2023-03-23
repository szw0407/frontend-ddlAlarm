<script setup>
import { ref } from "vue"
import LoginPage from "./components/LoginPage.vue"
import WorkPage from "./components/WorkPage.vue"

const loginStatus = ref(0)  // 通过登录状态切换页面组件
const showPages = ref([LoginPage, WorkPage])
</script>

<template>
  <div id="mainBody"> <!-- 页面组件将抛出登录状态改变事件，包括登录和登出 -->
    <component :is="showPages[loginStatus]" @login-status-changed.once="loginStatus = loginStatus === 0 ? 1 : 0" />
  </div>
</template>

<style>
#mainBody {
  width: 100%;
  color: black;
}
</style>

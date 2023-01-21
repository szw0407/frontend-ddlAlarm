<script setup>
import { ref } from "vue"
import { loginPage } from "./components/LoginPage.vue"
import { workPage } from "./components/WorkPage.vue"

const loginStatus = ref(0)  // 通过登录状态切换页面组件
const showPages = ref([loginPage, workPage])
</script>

<template>
  <div id="mainBody">                                         <!-- 页面组件将抛出登录状态改变事件，包括登录和登出 -->
    <component :is= "showPages[loginStatus]" @login-status-changed.once = " loginStatus= loginStatus === 0? 1: 0 "></component> 
  </div>
</template>

<style>
#mainBody {
  width: 100%;
  height: 100%;

  color: antiquewhite;
}
</style>

<script setup>
import { ref } from "vue"
import { loginPage } from "./components/LoginPage.vue"
import { workPage } from "./components/WorkPage.vue"

const loginStatus = ref("0")

const showPages = ref([loginPage, workPage])
</script>

<template>
  <div id="mainBody">
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

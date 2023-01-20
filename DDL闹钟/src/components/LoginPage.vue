<script setup>
import { ref } from "vue"

const emit = defineEmits(["login-status-changed", ""])

const account = ref("null")
const password = ref("null")
const tryStatus = ref("true")
const falseLoginTip = ref("登录失败，请再次尝试！")

function loginTry() {
    onSubmit()
    for (i in [0, 1, 2])
        if (login(account.value, password.value)) {
            emit("login-status-changed")
        }
    tryStatus.value = false
}
</script>

<template>
    <div id="loginPage">
        <from>
            <el-input v-model="account" placeholder="Account" maxlength="10"/>
            <el-input v-model="password" type="password" placeholder="Password" show-password maxlength="15"/>
            <button @click="loginTry"></button>
        </from>
        <p v-if="tryStatus">{{ falseLoginTip }}</p>
    </div>
</template>

<style>

</style>
<script setup>
import { ref } from "vue"
import { falseLoginTip } from "./FalseLoginTip.vue"

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
        <from id="from">
            <el-input class="inputArea" v-model="account" placeholder="Account" maxlength="10"/>
            <el-input class="inputArea" v-model="password" type="password" placeholder="Password" show-password maxlength="15"/>
            <button id="loginButton" @click="loginTry"> Login </button>
        </from>
        <falseLoginTip v-if="tryStatus" @Warn-done="tryStatus = true">{{ falseLoginTip }}</falseLoginTip>
    </div>
</template>

<style>
    #from{
        width: 80%;
        height: 40%;
        margin: auto;
    }
    .inputArea{
        width:60%;
        height: 10px;
        margin: 10px;
    }
    #loginButton{
        width: 10px;
        height: 5px;
        color: brown;
        background-color: beige;
    }
</style>
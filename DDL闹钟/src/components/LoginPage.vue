<script setup>
import { ref } from "vue"
import { falseLoginTip } from "./FalseLoginTip.vue"

const emit = defineEmits(["login-status-changed", ""]) 

const account = ref("null")
const password = ref("null")
const tryStatus = ref("true")   // 尝试三次登录后转化为失败，用于登录失败提示与正常登录页面的切换
const falseLoginTip = ref("登录失败，请再次尝试！")   // 提示语句设置

function loginTry() {
    onSubmit()       // 触发表单提交动作
    for (i in [0, 1, 2])    // 三次登录尝试
        if (login(account.value, password.value)) {  //login函数留空，暂时不知道这玩意是前端实现还是后端封个接口来
            emit("login-status-changed")    // 登录成功则向根组件抛出个登录状态改变的事件，提醒切换实际工作页面
        }
    tryStatus.value = false    // 三次登录尝试均失败则切换状态，调出登陆失败组件
}
</script>

<template>
    <div id="loginPage">
        <from id="from">
            <el-input class="inputArea" v-model="account" placeholder="Account" maxlength="10"/>
            <el-input class="inputArea" v-model="password" type="password" placeholder="Password" show-password maxlength="15"/>
            <button id="loginButton" @click="loginTry"> Login </button>   <!-- 按了就触发登录动作 -->>
        </from>
        <falseLoginTip v-if="tryStatus" @Warn-done="tryStatus = true">{{ falseLoginTip }}</falseLoginTip>  <!-- 登录失败组件，抛出警告完成动作后切换状态以继续 -->>
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
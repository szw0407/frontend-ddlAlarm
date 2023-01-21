<script setup>
import { ref } from "vue"
import { HintTip } from "./HintTip.vue"
import { loading } from "./LoadingTip.vue"

const emit = defineEmits(["login-status-changed", ""]) 

const account = ref("null")
const password = ref("null")
const tryStatus = ref("true")   // 尝试登录失败后转化为失败，用于登录失败提示与正常登录页面的切换
const loadStatus = ref("false")   // 加载状态，用于加载组件切换
const TipMsg = ref(["登录失败，请再次尝试！", "正在尝试登录......"])   // 提示语句设置

function loginTry() {
    onSubmit()       // 触发表单提交动作
    loadStatus.value = true
    if (login(account.value, password.value)) {  // login函数留空，待接口文档给出
        loadStatus.value = false
        emit("login-status-changed")    // 登录成功则结束加载，向根组件抛出个登录状态改变的事件，提醒切换实际工作页面
    }
    loadStatus.value = false
    tryStatus.value = false    // 登录尝试失败则切换状态，调出警告组件
}
</script>

<template>
    <HintTip v-if="!tryStatus" @warn-done="tryStatus = true">{{ TipMsg[0] }}</HintTip>  <!-- 警告组件 -->
    <loading v-if="loadStatus">{{ TipMsg[1] }}</loading>  <!-- 加载组件 -->

    <div id="loginPage">
        <from id="from">
            <el-input class="inputArea" v-model="account" placeholder="Account" maxlength="10"/>
            <el-input class="inputArea" v-model="password" type="password" placeholder="Password" show-password maxlength="15"/>
            <button id="loginButton" @click="loginTry"> Login </button>   <!-- 按了就触发登录动作 -->>
        </from>
    </div>
</template>

<style>
    #from{
        width: 80%;
        height: 40%;
        margin: auto;
    }
    .inputArea{
        width: 60%;
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
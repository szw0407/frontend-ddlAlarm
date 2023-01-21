<script setup>
import { ref } from "vue"
import { ddlItems } from "./DDLItem.vue"
import { ddlSettingPages } from "./DDLSettingPages.vue"
import { HintTip } from "./HintTip.vue"
import { loading } from "./LoadingTip.vue"

defineEmits(["login-status-changed"])

const loadStatus = ref("false")   // 加载状态，用于加载组件切换
const warnStatus = ref("false")   // 提示状态，用于提示组件切换
const TipMsg = ref([" 是否确认登出？ ", "正在获取ddl信息......", "获取QQ聊天数据失败，请重试。"])   // 提示语句设置
</script>

<template>
    <HintTip v-if="warnStatus" @warn-done="tryStatus = true">{{ TipMsg[0] }}</HintTip>  <!-- 警告组件 -->
    <loading v-if="loadStatus">{{ TipMsg[1] }}</loading>  <!-- 加载组件 -->

    <div></div>
</template>

<style>
    p{
        color: black;
        margin: 10px;
    }
</style>
<script setup>
import { ref } from "vue"
import { ddlItems } from "./DDLItem.vue"
import { ddlSettingPages } from "./DDLSettingPages.vue"
import { HintTip } from "./HintTip.vue"
import { ElLoading } from 'element-plus'

defineEmits(["login-status-changed"])

const loadStatus = ref(false)   // 加载状态，用于加载组件切换
const warnStatus = ref(false)   // 提示状态，用于提示组件切换
const MsgNumber = ref(0)
const TipMsgArray = ref([" 是否确认登出？ ", "正在获取ddl信息......", "获取QQ聊天数据失败，请重试。"])   // 提示语句设置
const WarnMsg = ref("")

function getDDLMsg(){
    const loading = ElLoading.service({ fullscreen : true, text : TipMsg[1] })
    if(getFromBackend()){
        loading.close()
    }
    else {
        loading.close()
        WarnMsg.value = TipMsgArray[2]
        warnStatus.value = true
    }
}
</script>

<template>
    <HintTip v-if="warnStatus" @warn-done="tryStatus = true">{{ WarnMsg }}</HintTip>  <!-- 警告组件 -->

    <div></div>
</template>

<style>
    p{
        color: black;
        margin: 10px;
    }
</style>
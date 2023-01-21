<script setup>
import { ref } from "vue"
import { ddlItems } from "./DDLItem.vue"
import { ddlSettingPages } from "./DDLSettingPages.vue"
import { ElMessageBox } from 'element-plus'
import { ElLoading } from 'element-plus'

const emit = defineEmits(["login-status-changed"])

const refreshStatus = ref(true)   // 刷新（即数据获取）状态，默认登录后进行一次数据获取
const TipMsg = ref([" 是否确认登出？ ", "正在获取ddl信息......", "获取QQ聊天数据失败，请重试。"])   // 提示语句设置

function refresh() {
    const loading = ElLoading.service({ fullscreen: true, text: TipMsg[1] })
    if (getMsg()) {
        loading.close()
    }
    else {
        loading.close()
        ElMessageBox.confirm(
            TipMsg[2],
            "数据获取失败",
            {
                confirmButtonText: '再次获取',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(refresh())
    }
}
function signout() {

    ElMessageBox.confirm(
        TipMsg[1],
        "登出确定",
        {
            confirmButtonText: '确定登出',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(emit("login-status-changed"))
}
</script>

<template>

    <div></div>
</template>

<style>
p {
    color: black;
    margin: 10px;
}
</style>
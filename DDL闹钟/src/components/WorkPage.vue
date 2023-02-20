<script setup>
import { ref, watch } from "vue"
import { throttle } from "lodash"
import { ElMessageBox, ElLoading } from 'element-plus'

import MyCalendar from "./MyCalendar.vue"
import DDLOperations from "./DDLOperations.vue"
import MyAvatar from "./MyAvatar.vue"
import { TipMsg, tableData, rank2Class, getMsg, msOutLookStatus } from "./export.js"

const emit = defineEmits(["login-status-changed"])

const refreshStatus = ref(true)
refresh()


async function refresh() {
    const loading = ElLoading.service({ text: TipMsg.value[1] })
        const data = getMsg()
        if (!!data) {
            loading.close()
            tableData.value = data
            refreshStatus.value = false
        } else {
            loading.close()
            await confirmRetry()
        }
}

async function confirmRetry() {
    const confirm = await ElMessageBox.confirm('数据获取失败', TipMsg.value[2], {
        confirmButtonText: '再次获取',
        cancelButtonText: '取消',
        type: 'warning'
    })
    if (confirm === "confirm") await refresh()
}
function signout() {
    ElMessageBox.confirm(
        TipMsg.value[0],
        "登出确定",
        {
            confirmButtonText: '确定登出',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(emit("login-status-changed"))
}

function tableRowClassName( row ) {
    return rank2Class.value[row.rank]
}

watch(refreshStatus, () => {
    refresh();
})
</script>

<template>
    <div style="margin-top: 20px;">

        <!-- 头像 -->
        <MyAvatar @signOut="signout" @refreshOn="refreshStatus = true;" />
        <!-- 纵览 -->
        <MyCalendar />
        <!-- 刷新 -->
        <el-button style="margin: 40px;position: absolute;right: 140px;top:70px;" size="large"
            @click="refreshStatus = true">刷新</el-button>
        <!-- DDL展示表格 -->
        <el-table :data="tableData.ddl" :border="true" style="width: 95%;margin: 0 auto;">
            <el-table-column label="截止时间" width="180">
                <template #default="scope">
                    <div style="display:flex;align-items: center;" :style="{backgroundColor: tableRowClassName(scope.row)}">
                        <span style="margin-left: 10px;" >{{ scope.row.date.split("T")[0] }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="DDL内容" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center" :style="{backgroundColor: tableRowClassName(scope.row)}">
                        <span style="margin-left: 10px">{{ scope.row.ddlContent }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="群聊" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center" :style="{backgroundColor: tableRowClassName(scope.row)}">
                        <span style="margin-left: 10px">{{ scope.row.group }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="紧急等级" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center" :style="{backgroundColor: tableRowClassName(scope.row)}">
                        <span style="margin-left: 10px">{{ scope.row.rank }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Operations">
                <template #default="scope">
                    <DDLOperations :index="scope.$index" />
                </template>
            </el-table-column>
        </el-table>
        <div style="width: 95%;margin: 0 auto;color: green;display: flex;flex-direction: row-reverse;" v-if="msOutLookStatus"><p>√</p></div>

    </div>
</template>

<style>
.red {
    background-color: red;
}

.green {
    background-color: green;
}

.yellow {
    background-color: yellow;
}
</style>
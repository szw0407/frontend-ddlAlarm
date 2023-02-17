<script setup>
import {  ref } from "vue"
import { ElMessageBox,ElLoading } from 'element-plus'

import  MyCalendar  from "./MyCalendar.vue"
import  DDLOperations  from "./DDLOperations.vue"
import  MyAvatar  from "./MyAvatar.vue"
import { TipMsg,tableData,rank2Class, getMsg } from "./export.js"

const emit = defineEmits(["login-status-changed"])

const refreshStatus = ref(true)   // 刷新（即数据获取）状态，默认登录后进行一次数据获取

function refresh() {
    const loading = ElLoading.service({ fullscreen: true, text: TipMsg.value[1] })
    if (tableData.value = getMsg()) {
        loading.close()
        refreshStatus.value = !refreshStatus.value
    }
    else {
        loading.close()
        ElMessageBox.confirm(
            TipMsg.value[2],
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
        TipMsg.value[1],
        "登出确定",
        {
            confirmButtonText: '确定登出',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(emit("login-status-changed"))
}

function tableRowClassName({ row, rowIndex }) {
    return rank2Class.value[tableData.value[rowIndex]["rank"]]
}

if (refreshStatus.value) {
    refresh()
}
</script>

<template>
    <div>

        <!-- 头像 -->
        <MyAvatar @signOut="signout" />
        <!-- 纵览 -->
        <MyCalendar />
        <!-- DDL展示表格 -->
        <el-table :data="tableData" :border="true" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column label="截止时间" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="DDL内容" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.ddlContent }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="群聊" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.groupName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="紧急等级" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
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
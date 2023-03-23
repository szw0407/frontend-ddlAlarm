<script setup>
import { ref, watch } from "vue"
import { throttle } from "lodash"
import { ElMessageBox, ElLoading } from 'element-plus'

import MyCalendar from "./MyCalendar.vue"
import DDLOperations from "./DDLOperations.vue"
import MyAvatar from "./MyAvatar.vue"
import { TipMsg, tableData,showWindowVisible, editWindowVisible,
        showWindowData,editWindowData,inputEditData,rank2Class, getMsg, 
        msSynchronousStatus, msOutLookStatus } from "./export.js"

const emit = defineEmits(["login-status-changed"])

const tableArary = ref({ "ddlContent": "DDL内容", "date": "DDL截止日期", "group": "DDL发布群聊",
                         "rank": "紧急等级", "src": "原始信息" })                         

const refreshStatus = ref(true)
refresh()

function confirmEdit() {
  const loading = ElLoading.service({
    fullscreen: true,
    text: TipMsg.value[3],
  });
  if (JSON.stringify(inputEditData.value) === JSON.stringify(editWindowData.value)) {
    loading.close();
  } else {
    pushEditData(inputEditData.value);
    loading.close();
  }
  ElMessageBox.confirm(TipMsg.value[4], "修改成功！", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  });
  editWindowVisible.value = false;
}

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

function tableRowClassName(row) {
    return rank2Class.value[row.rank]
}

watch(refreshStatus, () => {
    refresh();
})
</script>

<template>
    <div style="margin-top: 20px;">

        <div>
            <!-- DDL详情弹窗 -->
            <el-dialog v-model="showWindowVisible" v-if="showWindowVisible" :show-close="false" align-center title="DDL详情">
                <p v-for=" (y, x) in showWindowData "><b>{{ tableArary[x] }}</b> : {{ y }}</p>
            </el-dialog>

            <!-- DDL编辑弹窗 -->
            <el-dialog v-model="editWindowVisible" v-if="editWindowVisible" :show-close="false" align-center title="修改DDL">
                <el-form :model="form">
                    <el-form-item label="截止时间" :label-width="formLabelWidth">
                        <el-date-picker v-model="inputEditData.date" type="datetime" placeholder="选择截止时间"
                            :default-time="editWindowData.date" />
                    </el-form-item>
                    <el-form-item label="内容" :label-width="formLabelWidth">
                        <el-input v-model="inputEditData.ddlContent" :autosize="{ minRows: 6 }" type="textarea"
                            placeholder="Please input" />
                    </el-form-item>
                    <el-form-item label="紧急等级" :label-width="formLabelWidth">
                        <el-select v-model="inputEditData.rank" placeholder="选择紧急等级">
                            <el-option label="非常紧急" value="非常紧急" />
                            <el-option label="紧急" value="紧急" />
                            <el-option label="不紧急" value="不紧急" />
                        </el-select>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="editWindowVisible = false">取消</el-button>
                        <el-button type="primary" @click="confirmEdit">
                            提交
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>


        <!-- 头像 -->
        <MyAvatar @signOut="signout" @refreshOn="refreshStatus = true;" />
        <!-- 纵览 -->
        <MyCalendar />
        <!-- 刷新 -->
        <el-button style="margin: 40px;position: absolute;right: 140px;top:70px;" size="large"
            @click="refreshStatus = true">刷新</el-button>
        <!-- DDL展示表格 -->
        <el-table :data="tableData.ddl" :border="true" style="width: 95%;margin: 0 auto;color: black;">
            <el-table-column label="截止时间" width="180">
                <template #default="scope">
                    <div style="display:flex;align-items: center;" :style="{ backgroundColor: tableRowClassName(scope.row) }">
                        <span style="margin-left: 10px;">{{ scope.row.date.split("T")[0] }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="DDL内容" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center"
                        :style="{ backgroundColor: tableRowClassName(scope.row) }">
                        <span style="margin-left: 10px">{{ scope.row.ddlContent }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="群聊" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center"
                        :style="{ backgroundColor: tableRowClassName(scope.row) }">
                        <span style="margin-left: 10px">{{ scope.row.group }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="紧急等级" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center"
                        :style="{ backgroundColor: tableRowClassName(scope.row) }">
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
        <div style="width: 95%;margin: 0 auto;display: flex;flex-direction: row-reverse;" v-if="msOutLookStatus">
            <p style="color: red;" v-if="!msSynchronousStatus">X</p>
            <p style="color: green;" v-if="msSynchronousStatus">√</p>
        </div>

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
}</style>
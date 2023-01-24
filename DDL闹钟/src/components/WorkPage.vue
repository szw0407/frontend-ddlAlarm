<script setup>
import {  ref } from "vue"
import { ElMessageBox } from 'element-plus'
import { ElLoading } from 'element-plus'
import { MyCalendar } from "./MyCalendar.vue"

const emit = defineEmits(["login-status-changed"])

const TipMsg = ref([" 是否确认登出？ ", "正在获取最新ddl信息......", "获取QQ聊天数据失败，请重试。",
                     "正在提交DDL修改数据......", "DDL信息修改成功！", "确认要删除吗？", "正在删除......"])   // 提示语句设置

const refreshStatus = ref(true)   // 刷新（即数据获取）状态，默认登录后进行一次数据获取
const showWindowVisible = ref(false)
const editWindowVisible = ref(false)

const tableData = ref([])
const showWindowData = ref({})
const editWindowData = ref({})
const inputEditData = ref({})

const rank2Class = ref({ "非常紧急": "red", "紧急": "yellow", "不紧急": "green" })
const tableArary = ref({ "ddlContent": "DDL内容", "date": "DDL截止日期", "group": "DDL发布群聊",
                         "rank": "紧急等级", "src": "原始信息" })

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
function showItem(index) {
    showWindowVisible.value = true
    showWindowData.value = tableArary.value[index]
}
function tableRowClassName({ row, rowIndex }) {
    return rank2Class.value(tableData.value[rowIndex]["rank"])
}
function editItem(index) {
    editWindowVisible.value = true
    editWindowData.value = tableArary.value[index]
}
function confrimEdit() {
    const loading = ElLoading.service({ fullscreen: true, text: TipMsg.value[3] })
    if (inputEditData.value === editWindowData.value) {
        loading.close()
    } else {
        pushEditData(inputEditData.value)
        loading.close()
    }
    ElMessageBox.confirm(
        TipMsg.value[4],
        "修改成功！",
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    editWindowVisible.value = false
}
function deleteItem(index) {
    ElMessageBox.confirm(
        TipMsg.value[5],
        "删除确认",
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(
            (index) => {
                const loading = ElLoading.service({ fullscreen: true, text: TipMsg.value[6] })
                pushDelete(index)
                tableData.value.splice(index, 1)
            }
        )
}

if (refreshStatus.value) {
    refresh()
}
</script>

<template>
    <div>

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
                    <el-button size="small" @click="showItem(scope.$index)"><el-icon>
                            <Hide />
                        </el-icon></el-button>
                    <el-button size="small" @click="editItem(scope.$index)"><el-icon>
                            <EditPen />
                        </el-icon></el-button>
                    <el-button size="small" @click="deleteItem(scope.$index)"><el-icon>
                            <Delete />
                        </el-icon></el-button>
                </template>
            </el-table-column>
        </el-table>


        <!-- DDL详情弹窗 -->
        <el-dialog v-model="showWindowVisible" :show-close="false" align-center title="DDL详情">
            <p v-for=" (y, x) in showWindowData "><b>{{ x }}</b> : {{ y }}</p>
        </el-dialog>

        <!-- DDL编辑弹窗 -->
        <el-dialog v-model="editWindowVisible" :show-close="false" align-center title="修改DDL">
            <el-form :model="form">
                <el-form-item label="截止时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="inputEditData.date" type="datetime" placeholder="选择截止时间"
                        :default-time="editWindowData.date" />
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth"><el-input v-model="inputEditData.ddlContent"
                        :autosize="{ minRows: 6 }" type="textarea" placeholder="Please input" />
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
                    <el-button type="primary" @click="confrimEdit">
                        提交
                    </el-button>
                </span>
            </template>
        </el-dialog>
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
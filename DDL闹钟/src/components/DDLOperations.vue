<script setup>
import { ref } from "vue"
import { ElMessageBox,ElLoading } from 'element-plus'

import { showWindowVisible, editWindowVisible, tableData, TipMsg } from "./WorkPage.vue"

const p = defineProps(["index"])



const showWindowData = ref({})
const editWindowData = ref({})
const inputEditData = ref({"date":null,"ddlContent":null,"rank":null})


function showItem(index) {
    showWindowVisible.value = true
    showWindowData.value = tableData.value[index]
}
function editItem(index) {
    editWindowVisible.value = true
    editWindowData.value = tableData.value[index]
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
                loading.close()
            }
        )
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
</script>

<template>
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
            <el-form-item label="内容" :label-width="formLabelWidth">
                <el-input v-model="inputEditData.ddlContent"
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


    <!-- 三个按钮 -->
    <div>
        <el-button size="small" @click="showItem(p.index)"><el-icon>
                <Hide />
            </el-icon></el-button>
        <el-button size="small" @click="editItem(p.index)"><el-icon>
                <EditPen />
            </el-icon></el-button>
        <el-button size="small" @click="deleteItem(p.index)"><el-icon>
                <Delete />
            </el-icon></el-button>
    </div>

</template>
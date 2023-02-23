<!-- <script setup>
import { ref } from "vue"
import { ElMessageBox,ElLoading } from 'element-plus'

import { showWindowVisible, editWindowVisible, tableData, TipMsg } from "./export.js"

const p = defineProps(["index"])

const showWindowData = ref({})
const editWindowData = ref({"date":null,"ddlContent":null,"rank":null})
const inputEditData = ref({"date":null,"ddlContent":null,"rank":null})


function showItem(index) {
    showWindowVisible.value = true
    showWindowData.value = tableData.value.ddl[index]
}
function editItem(index) {
    editWindowVisible.value = true
    for (a in [editWindowData.value , inputEditData.value]){
        for (b in [date,ddlContent,rank]){
            a[b]=tableData.value.ddl[index][b]
        }
    }
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
                tableData.value.ddl[index].splice(index, 1)
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
</script> -->

<template>
    <!-- DDL详情弹窗 -->
    <el-dialog v-model="showWindowVisible" show-close="false" align-center title="DDL详情" :append-to-body="false">
        <p v-for=" (y, x) in showWindowData "><b>{{ tableArary[x] }}</b> : {{ y }}</p>
    </el-dialog>

    <!-- DDL编辑弹窗 -->
    <el-dialog v-model="editWindowVisible" :show-close="false" align-center title="修改DDL" :append-to-body="false">
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
        <el-button size="small" @click="showItem(prop.index)"><el-icon>
                <Hide />
            </el-icon></el-button>
        <el-button size="small" @click="editItem(prop.index)"><el-icon>
                <EditPen />
            </el-icon></el-button>
        <el-button size="small" @click="deleteItem(prop.index)"><el-icon>
                <Delete />
            </el-icon></el-button>
    </div>

</template>


<script setup>
import { ref, defineProps } from "vue";
import { ElMessageBox, ElLoading } from "element-plus";

import { showWindowVisible, editWindowVisible, tableData, TipMsg } from "./export.js";

const prop = defineProps(["index"]);

const showWindowData = ref({});
const editWindowData = ref({ date: null, ddlContent: null, rank: null });
const inputEditData = ref({ date: null, ddlContent: null, rank: null });
const tableArary = ref({ "ddlContent": "DDL内容", "date": "DDL截止日期", "group": "DDL发布群聊",
                         "rank": "紧急等级", "src": "原始信息" })

function showItem(index) {
  showWindowVisible.value = true
  showWindowData.value = tableData.value.ddl[index]
}


function editItem(index) {
  const item = tableData.value.ddl[index];
  if (!item) {
    console.error(`Invalid index: ${index}`);
    return;
  }
  inputEditData.value = { ...item };
  editWindowData.value = { ...item };
  editWindowVisible.value = true;
}


function deleteItem(index) {
  ElMessageBox.confirm(TipMsg.value[5], "删除确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    const loading = ElLoading.service({
      fullscreen: true,
      text: TipMsg.value[6],
    });
    pushDelete(index);
    tableData.value.ddl.splice(index, 1);
    loading.close();
  });
}

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
</script>

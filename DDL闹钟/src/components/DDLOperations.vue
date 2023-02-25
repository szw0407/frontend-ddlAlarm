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
import { defineProps } from "vue";
import { ElMessageBox, ElLoading } from "element-plus";

import { showWindowVisible, editWindowVisible,inputEditData,showWindowData,editWindowData, tableData, TipMsg } from "./export.js";

const prop = defineProps(["index"]);


function showItem(index) {
  showWindowData.value = tableData.value.ddl[index]
  showWindowVisible.value = true
  console.log("here: ",showWindowData.value)
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

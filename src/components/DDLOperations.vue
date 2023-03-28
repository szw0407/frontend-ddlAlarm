<script setup> 
import { defineProps } from "vue"
import { ElMessageBox, ElLoading } from "element-plus"

import { showWindowVisible, editWindowVisible,inputEditData,
         showWindowData,editWindowData, tableData, TipMsg, refreshStatus } from "../share/data"

import { pushDelete } from "../share/api"

const prop = defineProps(["index"])


function showItem(index) {
  showWindowData.value = tableData.value.ddl[index]
  showWindowVisible.value = true
}

function editItem(index) {
  const item = tableData.value.ddl[index]
  if (!item) {
    console.error(`Invalid index: ${index}`)
    return
  }

  inputEditData.value = { ...item }
  editWindowData.value = { ...item }
  editWindowVisible.value = true
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
    pushDelete(index)
    refreshStatus.value = true
    loading.close()
  })
}
</script>

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



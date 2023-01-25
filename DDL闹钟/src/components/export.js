import { ref } from "vue"

export const TipMsg = ref([" 是否确认登出？ ", "正在获取最新ddl信息......", "获取QQ聊天数据失败，请重试。",
    "正在提交DDL修改数据......", "DDL信息修改成功！", "确认要删除吗？", "正在删除......"])   // 提示语句设置

export const showWindowVisible = ref(false)
export const editWindowVisible = ref(false)

export const tableData = ref([])  // work


export const cellWidth = ref("10px")
export const openCell = ref(null)  //mycale
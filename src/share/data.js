import { ref } from "vue"

export const TipMsg = ref([" 是否确认登出？ ", "正在获取最新ddl信息......", "获取QQ聊天数据失败，请重试。",
    "正在提交DDL修改数据......", "DDL信息修改成功！", "确认要删除吗？", "正在删除......",
    "登录失败，请检查输入的账号和密码是否正确及是否启用了相关安全设置，或点击按钮再次进行登录尝试！",
    "正在尝试登录......"])   // 提示语句设置

export const showWindowVisible = ref(false)
export const editWindowVisible = ref(false)

export const tableData = ref([])

export const cellWidth = ref("80px")
export const openCell = ref(null)  //mycale


export const msOutLookAccout = ref(null)
export const msOutLookStatus = ref(false)
export const msSynchronousStatus = ref(false)


export const showWindowData = ref({});
export const editWindowData = ref({ date: null, ddlContent: null, rank: null });
export const inputEditData = ref({ date: null, ddlContent: null, rank: null });

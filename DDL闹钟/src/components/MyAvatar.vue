<script setup>
import { ref } from "vue"
import { ElMessageBox, ElLoading } from 'element-plus'

import { tableData, TipMsg } from "./export.js"

const emits = defineEmits(["signOut"])

const userAvatar = ref(tableData.userAvatar)
const groups = ref(tableData.groups)
const temp = groups.value
const settingWindowData = ref(temp)
const settingWindowVisible = ref(false)

function signOut() {
    ElMessageBox.confirm(
        TipMsg.value[0],
        TipMsg.value[0],
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    .then(()=>{emits("signOut")})
}
function confrimSettings() {
    const loading = ElLoading.service({ fullscreen: true, text: TipMsg.value[3] })
    if (groups.value === settingWindowData.value) {
        loading.close()
    } else {
        pushSettingData(settingWindowData.value)
        loading.close()
    }
    ElMessageBox.confirm(
        "抓取群聊设定成功！",
        "设定成功！",
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    settingWindowVisible.value = false
}
</script>

<template>
    <div style="display: flex; align-items: center">
        <el-popover trigger="click">
            <template #reference>
                <el-avatar src="userAvatar" />
            </template>
            <div :width="75">
                <div :width="75" style="text-align: center; margin-top: 15px;" @click="settings">
                    设定</div>
                <el-divider />
                <div :width="75" style="text-align: center; margin-bottom: 15px;" @click="signOut">
                    退出登录
                </div>
            </div>
        </el-popover>
    </div>

    <div class="demo-rich-conent" style="display: flex; gap: 16px; flex-direction: column">
        <h1>设定</h1>
        <p>版本号： V 1.0 alpha</p>
        <p>选择群聊：</p>
        <div v-for="group in groups">
            <el-checkbox v-model="group.status">{{ group.group }}</el-checkbox>
            <button>提交</button>
            <button>取消</button>
        </div>
    </div>


    <el-dialog v-model="settingWindowVisible" :show-close="false" align-center title="设定">
        <div>
            <p>版本号： V 1.0 alpha</p>
            <p>选择群聊：</p>
            <div v-for="group in groups">
                <el-checkbox v-model="group.status">{{ group.group }}</el-checkbox>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="settingWindowVisible = false">取消</el-button>
                <el-button type="primary" @click="confrimSettings">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
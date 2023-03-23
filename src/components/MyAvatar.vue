<script setup>
import { ref } from "vue"
import { ElMessageBox, ElLoading } from 'element-plus'

import { tableData, TipMsg, msOutLookStatus } from "./export.js"

import { pushSettingData } from "./export.js"

const emits = defineEmits(["signOut", "refreshOn"])

const userAvatar = ref("https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")

const groups = tableData.value.ddlGroups
const settingWindowData = ref(groups)
const settingWindowVisible = ref(false)
const oneWord = ref("one word get wrong.")

async function getOneWords() {
  const response = await fetch('https://v1.hitokoto.cn');
  const data = await response.json();
  return data.hitokoto;
}

getOneWords().then((words) => {
  oneWord.value = words;
});

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
        .then(() => { emits("signOut") })
}
function confrimSettings() {
    const loading = ElLoading.service({ fullscreen: true, text: TipMsg.value[3] })
    if (groups.value === settingWindowData.value) {
        loading.close()
    } else {
        pushSettingData(settingWindowData.value)
        loading.close()
        emits("refreshOn")

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
    <div id="avatar">
        <div style="margin-left: 40px;">
            <h1>DDL闹钟</h1>
            <p>{{ oneWord }}</p>
            <p style="font-size: large;"><b>DDL</b>列表</p>
        </div>
        <el-popover trigger="click">
            <template #reference>
                <el-avatar src="userAvatar" style="position: absolute; right: 40px;" :size="100" />
            </template>
            <div :width="75">
                <div :width="75" style="text-align: center; margin-top: 15px;" @click="settingWindowVisible = true">
                    设定</div>
                <el-divider />
                <div :width="75" style="text-align: center; margin-bottom: 15px;" @click="signOut">
                    退出登录
                </div>
            </div>
        </el-popover>
    </div>

    <el-dialog v-model="settingWindowVisible" :show-close="false" align-center title="设定">
        <div>
            <p>版本号： V 1.0 alpha</p>
            <div>
                <el-checkbox v-model="msOutLookStatus">启用OutLook同步</el-checkbox>
            </div>
            <p>选择群聊：</p>
            <div v-for="group in groups">
                <el-checkbox v-model="group.status">{{ group.groupName }}</el-checkbox>
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

<style scoped>
#avatar {
    display: flex;
    align-items: center;
}
</style>
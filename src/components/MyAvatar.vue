<script setup>
import { ref, onMounted, computed } from "vue"
import { ElMessageBox, ElLoading } from 'element-plus'

import { tableData, TipMsg, msOutLookStatus, msOutLookAccout, msSynchronousStatus, msAliagnStatus, msLoginLink, QQNumber } from "../share/data"

import { pushSettingData, msLogin, msLogout, msAliagn } from "../share/api"

const emits = defineEmits(["signOut", "refreshOn"])

const userAvatar = computed(() => {
    return "http://q.qlogo.cn/headimg_dl?dst_uin=" + QQNumber.value + "&spec=640&img_type=jpg"
})

const msOutLookSettingVisible = ref(false)
const visionVisible = ref(false)
const groups = tableData.value.ddlGroups
const settingWindowData = ref(groups)
const groupSettingWindowVisible = ref(false)
const oneWord = ref("one word get wrong.")


// 每日一言
async function getOneWords() {
    const response = await fetch('https://v1.hitokoto.cn')
    const data = await response.json()
    oneWord.value = data.hitokoto
}

//  登出
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

// 提交后处理
function confrimGroupSettings() {
    const loading = ElLoading.service({ fullscreen: true, text: TipMsg.value[3] })
    if (groups.value === settingWindowData.value) {
        loading.close()
    } else {
        console.log(settingWindowData.value)
        pushSettingData(settingWindowData.value)
            .catch(() => {
                ElMessageBox.alert("群聊抓取状态设定失败！", "设定失败", {
                    confirmButtonText: "确定",
                    type: "error",
                })
                loading.close()
            })
            .then(() => {
                ElMessageBox.confirm(
                    "群聊抓取状态设定成功！",
                    "设定成功！",
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }
                )
                emits("refreshOn")
            })
            .finally(() => {
                loading.close()
            })

    }
    groupSettingWindowVisible.value = false
}

onMounted(() => {
    getOneWords()
    console.log(userAvatar.value)
})
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
                <el-avatar :src="userAvatar" style="position: absolute; right: 40px;" :size="100" />
            </template>
            <div :width="75">
                <div :width="75" style="text-align: center; margin-top: 15px;" @click="groupSettingWindowVisible = true">
                    设定</div>
                <el-divider />
                <div :width="75" style="text-align: center; margin-bottom: 15px;" @click="msOutLookSettingVisible = true">
                    OutLook
                </div>
                <el-divider />
                <div :width="75" style="text-align: center; margin-bottom: 15px;" @click="visionVisible = true">
                    版本信息
                </div>
                <el-divider />
                <div :width="75" style="text-align: center; margin-bottom: 15px;" @click="signOut">
                    退出登录
                </div>
            </div>
        </el-popover>
    </div>

    <el-dialog v-model="groupSettingWindowVisible" :show-close="false" align-center title="抓取群聊设定">
        <div>
            <p>选择群聊：</p>
            <div v-for="group in groups">
                <el-checkbox v-model="group.status">{{ group.groupName }}</el-checkbox>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="groupSettingWindowVisible = false">取消</el-button>
                <el-button type="primary" @click="confrimGroupSettings">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="msOutLookSettingVisible" :show-close="false" align-center title="OutLook设定">
        <p>OutLook 状态：</p>
        <div>
            <el-checkbox v-model="msOutLookStatus">启用OutLook同步</el-checkbox>
        </div>
        <div v-if="msOutLookStatus">
            <template v-if="msSynchronousStatus">
                <span mx-sm>
                    <span text="gray xs">{{ '登录账户： ' }}</span>
                    <span>
                        {{ msOutLookAccout }}
                    </span>
                </span>
                <ElButton link type="danger" @click="msLogout">登出</ElButton>
                <ElButton link type="danger" @click="msAliagn">同步</ElButton>
            </template>
            <ElButton v-else link type="primary" @click="msLogin">
                <a :href="msLoginLink" target="_blank">登录</a>
            </ElButton>
        </div>
    </el-dialog>

    <el-dialog v-model="visionVisible" :show-close="false" align-center title="版本信息">
        <p>版本号： V 1.0 alpha</p>
        <p>仅供学习交流使用，下载24小时后应当卸载。</p>
    </el-dialog>
</template>

<style scoped>
#avatar {
    display: flex;
    align-items: center;
}
</style>
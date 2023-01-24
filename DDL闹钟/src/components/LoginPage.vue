<script setup>
import { ref } from "vue"
import { ElMessageBox } from 'element-plus'
import { ElLoading } from 'element-plus'

const emit = defineEmits(["login-status-changed"])

const account = ref(null)
const password = ref(null)
const TipMsg = ref(["登录失败，请检查输入的账号和密码是否正确及是否启用了相关安全设置，或点击按钮再次进行登录尝试！", "正在尝试登录......"])   // 提示语句设置

function loginTry() {
    onSubmit()       // 触发表单提交动作
    const loading = ElLoading.service({ fullscreen: true, text: TipMsg.value[2] })
    if (login(account.value, password.value)) {  // login函数留空，待接口文档给出
        loading.close()
        emit("login-status-changed")    // 登录成功则结束加载，向根组件抛出个登录状态改变的事件，提醒切换实际工作页面
    } else {
        loading.close()
        ElMessageBox.confirm(
            TipMsg.value[0],
            "登陆尝试失败",
            {
                confirmButtonText: '再次登录',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(loginTry())
    }

}
</script>

<template>
    <div id="loginPage">
        <form id="form">
            <el-input class="inputArea" v-model="account" placeholder="Account" maxlength="10" />
            <el-input class="inputArea" v-model="password" type="password" placeholder="Password" show-password
                maxlength="15" />
            <button id="loginButton" @click="loginTry"> Login </button> <!-- 按了就触发登录动作 -->>
        </form>
    </div>
</template>

<style>
#form {
    width: 80%;
    height: 40%;
    margin: 0 auto;
}

.inputArea {
    width: 60%;
    height: 10px;
    margin: 10px;
}

#loginButton {
    width: 10px;
    height: 5px;
    color: brown;
    background-color: beige;
}
</style>
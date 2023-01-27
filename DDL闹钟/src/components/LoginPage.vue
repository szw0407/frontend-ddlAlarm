<script setup>
import { ref } from "vue"
import { ElMessageBox, ElLoading } from 'element-plus'

function login(a, b){
    if (a==="admin"){
        if (b==="123456"){
            return true
        }
    }else {
        return false
    }
}

const emit = defineEmits(["login-status-changed"])

const account = ref(null)
const password = ref(null)
const TipMsg = ref(["登录失败，请检查输入的账号和密码是否正确及是否启用了相关安全设置，或点击按钮再次进行登录尝试！", "正在尝试登录......"])   // 提示语句设置

function loginTry() {
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
        <el-form id="form">
            <h1 id="title">DDL闹钟</h1>
            <el-input class="inputArea" v-model="account" placeholder="Account" maxlength="10" />
            <el-input class="inputArea" v-model="password" type="password" placeholder="Password" show-password
                maxlength="15" />
            <el-button id="loginButton" @click="loginTry"> Login </el-button> <!-- 按了就触发登录动作 -->
        </el-form>
    </div>
</template>

<style>
#loginPage {
    width: 100%;
}

#form {
    width: 15%;
    margin: 0 auto;
    margin-top: 15%;
}

.inputArea {
    width: 25%;
    height: 25px;
    margin: 10px;
}

#loginButton {
    width: 55px;
    height: 25px;
    color: brown;
    background-color: white;
    margin-left: 40%;
    margin-top: 15%;
}

#title{
    margin-left: 25%;
}
</style>
<script setup>
import { ref } from "vue"
import { ElMessageBox, ElLoading } from 'element-plus'

function login(a, b) {
    return new Promise(() => {
        setTimeout(() => {
            if (a === "admin") {
                if (b === "123456") {
                    return true
                } else { return false }
            } else {
                return false
            }
        }, 5000)
    })
}

const emit = defineEmits(["login-status-changed"])

const account = ref(null)
const password = ref(null)
const TipMsg = ref(["登录失败，请检查输入的账号和密码是否正确及是否启用了相关安全设置，或点击按钮再次进行登录尝试！", "正在尝试登录......"])   // 提示语句设置


// 应该更改成then/catch而不是if/else
async function loginTry() {
    const loading = ElLoading.service({ text: TipMsg.value[1] })
    const loginTryCallback = await login(account.value, password.value)
    if (loginTryCallback) {  // login函数留空，待接口文档给出
        setTimeout(() => {
            loading.close()
            emit("login-status-changed")
        }, 2000)    // 登录成功则结束加载，向根组件抛出个登录状态改变的事件，提醒切换实际工作页面

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
            .then(() => { loginTry() })
    }

}
</script>

<template>
    <div id="loginPage">
        <el-form id="form">
            <h1 id="title">DDL闹钟</h1>
            <span class="label">
                <h2 class="label-init">账户：</h2>
            </span><input class="inputArea" v-model="account" maxlength="10" />
            <span class="label">
                <h2 class="label-init">密码：</h2>
            </span><input class="inputArea" v-model="password" type="password" show-password maxlength="15" />
            <button id="loginButton" @click="loginTry"> 登录 </button> <!-- 按了就触发登录动作 -->
        </el-form>
    </div>
</template>

<style scoped>
#loginPage {
    width: 55%;
    height: 90%;
    border: 2px solid #000;
    border-radius: 25px;
    margin: 0 auto;
    margin-top: 12%;
}

#form {
    width: 45%;
    margin: 0 auto;
}

.inputArea {
    width: 100%;
    height: 45px;
    margin: 20px;
    border-radius: 25px;
    line-height: 25px;
    font-size: 19px;
    text-indent: 15px;
}

#loginButton {
    width: 125px;
    height: 45px;
    color: brown;
    background-color: white;
    margin-left: 40%;
    border-radius: 25px;
    font-size: 23px;
    margin-top: 15%;
    margin-bottom: 15%;
}

#title {
    margin-left: 38%;
    margin-top: 20%;
}

.label {
    position: absolute;
    left: 580px;
}

.label-init {
    position: relative;
    top: 8px;
}
</style>
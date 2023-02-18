<script setup>
import { ref } from "vue"
import { ElMessageBox, ElLoading } from 'element-plus'
import { tableData,getMsg } from "./export";

const emit = defineEmits(["login-status-changed"])

const TipMsg = ref([
  "登录失败，请检查输入的账号和密码是否正确及是否启用了相关安全设置，或点击按钮再次进行登录尝试！",
  "正在尝试登录......"
]) // 提示语句设置

const account = ref(null)
const password = ref(null)

async function login(account, password) {
  tableData.value = getMsg()
  return new Promise(resolve => {
    setTimeout(() => {
      if (account === "1" && password === "1") {
        resolve(true)
      } else {
        resolve(false)
      }
    }, 2000)
  })
}

async function loginTry() {
  const loading = ElLoading.service({
    text: TipMsg.value[1]
  })
  try {
    const loginTryCallback = await login(account.value, password.value)
    if (loginTryCallback) {
      setTimeout(() => {
        loading.close()
       emit("login-status-changed")
      }, 2000)
    } else {
      loading.close()
      const confirm = await ElMessageBox.confirm(TipMsg.value[0], "登陆尝试失败", {
        confirmButtonText: "再次登录",
        cancelButtonText: "取消",
        type: "warning"
      })
      if (confirm === "confirm") {
        await loginTry()
      }
    }
  } catch (error) {
    console.error(error)
  }
}

</script>

<template>
  <div id="loginPage">
    <el-form id="form">
      <h1 id="title">DDL闹钟</h1>
      <span class="label">
        <h2 class="label-init">账户：</h2>
      </span>
      <input class="inputArea" v-model="account" maxlength="10" />
      <span class="label">
        <h2 class="label-init">密码：</h2>
      </span>
      <input class="inputArea" v-model="password" type="password" show-password maxlength="15" />
      <div id="loginButton" @click="loginTry">登录</div>
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

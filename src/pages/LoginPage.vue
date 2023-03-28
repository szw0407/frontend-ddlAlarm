<script setup>
import { login } from "../share/api"
import { TipMsg } from "../share/data"; 

const emit = defineEmits(["login-status-changed"])

async function loginTry() {
  const loading = ElLoading.service({
    text: TipMsg.value[8]
  })
  try {
    const loginTryCallback = await login()
    if (loginTryCallback) {
      setTimeout(() => {
        loading.close()
       emit("login-status-changed")
      }, 2000)
    } else {
      loading.close()
      const confirm = await ElMessageBox.confirm(TipMsg.value[7], "登陆尝试失败", {
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
    loading.close()
  }
}

</script>

<template>
  <div id="loginPage">
    <el-form id="form">
      <h1 id="title">DDL闹钟</h1>
      <!-- <span class="label">
        <h2 class="label-init">账户：</h2>
      </span>
      <input class="inputArea" v-model="account" maxlength="10" />
      <span class="label">
        <h2 class="label-init">密码：</h2>
      </span>
      <input class="inputArea" v-model="password" type="password" show-password maxlength="15" /> -->
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

/* .inputArea {
  width: 100%;
  height: 45px;
  margin: 20px;
  border-radius: 25px;
  line-height: 25px;
  font-size: 19px;
  text-indent: 15px;
} */

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
  margin-left: 32%;
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

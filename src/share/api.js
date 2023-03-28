import { ref } from "vue"
import { msOutLookAccout, msSynchronousStatus, tableData, msLoginLink, QQNumber, msAliagnStatus } from "./data"

import http from "../trans/http"

export const rank2Class = ref({ "非常紧急": "red", "紧急": "yellow", "不紧急": "green" })

const addRankAtrr = (obj) => {

    const date = obj.date

    const dayDistance = 86400000
    const hurryVeryNum = 3
    const hurryNum = 7
    const easyNum = 14

    const now = new Date()
    const target = new Date(date)
    const distance = target.getTime() - now.getTime()

    let rank = null

    if (distance < hurryVeryNum * dayDistance) {
        rank = "非常紧急"
    } else if (distance < hurryNum * dayDistance) {
        rank = "紧急"
    } else if (distance < easyNum * dayDistance) {
        rank = "不紧急"
    } else {
        rank = "非常紧急"
    }

    obj.forEach(element => {
        console.log("before:", element)
        element.rank = rank
        console.log("after:", element)
    });
}

export const pushDelete = async (index) => {
    await http.delete('./ddl',
        {
            params: {
                "id": tableData.value.ddl[index].id
            }
        })
        .then(() => {
            console.log("delete ok")
        })
        .catch((err) => {
            console.log(err)
        })
}

export const pushSettingData = async (setting) => {
    await http.put('./ddl',
        {
            data: {
                group_number: setting.group_number,
                group_ren: setting.group_ren,
                is_active: setting.status,
            },
        })
}

export const pushEditData = async (input) => {
    await http.post('./ddl',
        {
            data: {
                description: input.ddlContent,
                text: input.src,
                ddlTime: input.date,
                status: input.rank,
                id: input.id,
                group_num: input.group_num,
            },
        })
}




const getLoginInfo = async () => {
    await http.get('./login_info/')
        .then((res) => {
            if (!(user_id  in res.data.QQinfo)) {
                return [{ data: null, status: false }, { data: null, status: false }]
            }
            else if (!(userPrincipalName in res.data.MsUserInfo)) {
                return [{ data: res.data.QQinfo.user_id, status: true }, { data: res.data.MsUserInfo.LoginMSURL, status: false }]
            }
            else {
                return [{ data: res.data.QQinfo.user_id, status: true }, { data: res.data.MsUserInfo.userPrincipalName, status: true }]
            }
        })
        .catch((err) => {
            alert("未知错误，请重试！")
            return err
        })
}

async function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


export async function login() {
    const res = await getLoginInfo()
    if (!res[0].status) {
        return false
    }
    else if (!res[1].status) {
        QQNumber.value = res[0].data
        msLoginLink.value = res[1].data
        return true
    }
    else if (res[1].status) {
        QQNumber.value = res[0].data
        msLoginStatusChange(res[1].data)
        return true
    }
    else {
        return res[0]
    }
}


export function msLoginStatusChange(account) {
    msOutLookAccout.value = account
    msSynchronousStatus.value = true
}

export async function msLogin() {
    let j = 20
    const loading = ElLoading.service({ fullscreen: true, text: "正在尝试登录OutLook......" })
    for (i in range(j)) {
        await sleep(100)
        let a = await getLoginInfo()
        if (a[1].status) {
            loading.close()
            msLoginStatusChange(a[1].data)
            return
        }
    }
    loading.close()
    ElMessageBox.confirm("登录OutLook失败，请重试！", "登录失败！", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
    return
}

export async function msLogout() {
    msOutLookAccout.value = null
    msSynchronousStatus.value = false
}

export async function msAliagn() {
    const loading = ElLoading.service({ fullscreen: true, text: "正在同步数据......" })
    for (i in tableData.value.ddl) {
        let j = (new Date(i.date)).setDate(new Date(i.date).getDate() + 1)
        await http.post('./MSCalendar',{
            data:{
                "subject":i.ddlContent,
                "body": {
                  "contentType": "HTML",
                  "content": ""
                },
                "start": {
                  "dateTime": i.date.slice(0,11) + "00:00:00",
                  "timeZone": "China Standard Time"
                },
                "end": {
                  "dateTime": j.toJSON().slice(0,11) + "00:00:00",
                  "timeZone": "China Standard Time"
                },
                "location": {
                  "displayName": "string"
                },
                "isReminderOn": true,
                "reminderMinutesBeforeStart": 0,
                "attendees": [
                  {
                    "emailAddress": {
                      "address": "string",
                      "name": "string"
                    },
                    "type": "required"
                  }
                ],
                "allowNewTimeProposals": true,
                "isAllDay": true,
                "transactionId": "string"
              }
        })
        .catch((err)=>{
            console.log(err)
            loading.close()
            alert("同步失败，请重试！")
            return
        })
    }
    loading.close()
    msAliagnStatus.value = true
    ElMessageBox.confirm("同步成功！", "同步成功！", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
    })

    return
}





export async function getMsg() {

    const msg = ref()
    await http.get('./ddls/')
        .then((res) => {
            msg.value.ddl = res.data.DDL.map(i => {
                return {
                    id: i.id,
                    ddlContent: i.description.slice(0, 10) + "...",
                    src: i.text,
                    date: i.ddltime,
                    group: i.from_group_info_all[0].group_name
                }
            })
        })
        .catch((err) => {
            alert("未知错误，请重试！")
            console.log(err)
            return
        })
    await http.get('./groups/')
        .then((res) => {
            msg.value.ddlGroups = res.data.map(i => {
                return {
                    groupName: i.group_name,
                    status: i.is_active,
                    group_number: i.group_number,
                    group_ren: i.group_ren,
                    id: i.id,
                }
            })
        })

    addRankAtrr(msg.value.ddl)
    return msg.value

} 

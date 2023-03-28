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
    return await http.get('./login_info/')
        .then((res) => {
            if (!("user_id" in res.data.QQinfo)) {
                return [{ data: null, status: false }, { data: null, status: false }]
            }
            else if (!("MsUserInfo" in res.data)) {
                return [{ data: res.data.QQinfo.user_id, status: true }, { data: res.data.LoginMSURL, status: false }]
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
        return res
    }
}


export function msLoginStatusChange(account) {
    msOutLookAccout.value = account
    msSynchronousStatus.value = true
}

export async function msLogin() {
    ElMessageBox.confirm(
        "是否已登录微软账号？",
        "登录确定",
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            try {
                let a = getLoginInfo()
                msLoginStatusChange(a[1].data)
                return
            }
            catch {
                ElMessageBox.confirm(
                    "登录失败，请重试！",
                    "失败",
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }
                )
            }
        }
        )
}

export async function msLogout() {
    msOutLookAccout.value = null
    msSynchronousStatus.value = false
}

export async function msAliagn() {
    const loading = ElLoading.service({ fullscreen: true, text: "正在同步数据......" })
    for (i in tableData.value.ddl) {
        let j = (new Date(i.date)).setDate(new Date(i.date).getDate() + 1)
        await http.post('./MSCalendar', {
            data: {
                "subject": i.ddlContent,
                "body": {
                    "contentType": "HTML",
                    "content": ""
                },
                "start": {
                    "dateTime": i.date.slice(0, 11) + "00:00:00",
                    "timeZone": "China Standard Time"
                },
                "end": {
                    "dateTime": j.toJSON().slice(0, 11) + "00:00:00",
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
            .catch((err) => {
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

    const msg = ref({})
    await http.get('./ddls/')
        .then((res) => {
            msg.value.ddl = res.data.DDL.map(i => {
                if (!i.from_group_info_all[0].is_active) {
                    return null
                }
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
         .catch((err) => {
                   console.log(err)
})

    addRankAtrr(msg.value.ddl)
    console.log(msg.value)
    return msg.value

} 



// export async function getMsg() {

//     const msg = ref({
//         "ddl":
//             [
//                 {
//                     "ddlContent": "一起去保卫萝卜",
//                     "date": "2022-02-08T22:12:32",
//                     "group": "保卫萝卜二群",
//                     "src": "经研究，本群决定于2022年2月8日22时12分32秒，与大家一起去保卫萝卜，收到请回复！"
//                 }
//                 ,
//                 {
//                     "ddlContent": "一起去挖萝卜",
//                     "date": "2022-02-08T22:12:32",
//                     "group": "我们喜欢一起去挖萝卜二群",
//                     "src": "经研究，本群决定于2022年2月8日22时12分32秒，与大家一起去保卫萝卜，收到请回复！"
//                 }
//                 ,
//                 {
//                     "ddlContent": "一起去吃萝卜",
//                     "date": "2022-03-04T22:12:32",
//                     "group": "大快朵颐萝卜二群",
//                     "src": "经研究，本群决定于2022年2月8日22时12分32秒，与大家一起去保卫萝卜，收到请回复！"
//                 }
//                 ,
//                 {
//                     "ddlContent": "一起去埋了萝卜",
//                     "date": "2022-03-04T22:12:32",
//                     "group": "萝卜后事料理委员会二群",
//                     "src": "经研究，本群决定于2022年2月8日22时12分32秒，与大家一起去保卫萝卜，收到请回复！"
//                 }
//             ],
//         "ddlGroups": 
//             [
//                 {  
//                     "groupName": "保卫萝卜二群", 
//                     "status": true
//                 }, 
//                 {  
//                     "groupName": "保卫萝卜二群", 
//                     "status": true
//                 }, 
//                 {  
//                     "groupName": "保卫萝卜二群", 
//                     "status": true
//                 }, 
//             ]
//     })



//     addRankAtrr(msg.value.ddl)
//     return msg.value
// }

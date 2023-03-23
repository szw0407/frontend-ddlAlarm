import { ref } from "vue"
import { msOutLookAccout, msSynchronousStatus } from "./data"

export const rank2Class = ref({ "非常紧急": "red", "紧急": "yellow", "不紧急": "green" })

export const pushDelete = () =>{
    console.log("delete ok")
} 

export const pushSettingData = () =>{
    console.log("setting ok")
}

export const pushEditData = () => {
    console.log("edit ok")
}

export async function login(account, password) {
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

export function getQQNumber() {
    return 10001
}

export function msLogin () {
    msOutLookAccout.value = "hao123"
    msSynchronousStatus.value = true
}

export function msLogout () {
    msOutLookAccout.value = null
    msSynchronousStatus.value = false
}


export function getMsg(){
    return {
        "userInformation": 
            {
                "avatarAddress": "C:\\Users\\1\\Pictures\\Saved Pictures" 
            }, 

        "ddl":   
            [
                {
                    "ddlContent": "一起去保卫萝卜",  
                    "date": "2022-02-08T22:12:32",   
                    "group": "保卫萝卜二群",  
                    "rank": "紧急", 
                    "src": "经研究，本群决定于2022年2月8日22时12分32秒，与大家一起去保卫萝卜，收到请回复！" 
                }
                ,
                {
                    "ddlContent": "一起去挖萝卜",  
                    "date": "2022-02-08T22:12:32",   
                    "group": "我们喜欢一起去挖萝卜二群",  
                    "rank": "非常紧急", 
                    "src": "经研究，本群决定于2022年2月8日22时12分32秒，与大家一起去保卫萝卜，收到请回复！" 
                }
                ,
                {
                    "ddlContent": "一起去吃萝卜",  
                    "date": "2022-03-04T22:12:32",   
                    "group": "大快朵颐萝卜二群",  
                    "rank": "不紧急", 
                    "src": "经研究，本群决定于2022年2月8日22时12分32秒，与大家一起去保卫萝卜，收到请回复！" 
                }
                ,
                {
                    "ddlContent": "一起去埋了萝卜",  
                    "date": "2022-03-04T22:12:32",   
                    "group": "萝卜后事料理委员会二群",  
                    "rank": "非常紧急", 
                    "src": "经研究，本群决定于2022年2月8日22时12分32秒，与大家一起去保卫萝卜，收到请回复！" 
                }
            ],

        "ddlGroups": 
            [
                {  
                    "groupName": "保卫萝卜二群", 
                    "status": true
                }
            ]

        }
} 
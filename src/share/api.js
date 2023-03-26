import { ref } from "vue"
import { msOutLookAccout, msSynchronousStatus } from "./data"

export const rank2Class = ref({ "非常紧急": "red", "紧急": "yellow", "不紧急": "green" })

const addRankAtrr= (obj)=>{

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
        console.log("before:",element)
        element.rank = rank
        console.log("after:",element)
    });
}

export const pushDelete = async () =>{
    console.log("delete ok")
} 

export const pushSettingData = async () =>{
    console.log("setting ok")
}

export const pushEditData = async () => {
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

export async function msLogin () {
    msOutLookAccout.value = "hao123"
    msSynchronousStatus.value = true
}

export async function msLogout () {
    msOutLookAccout.value = null
    msSynchronousStatus.value = false
}


export  function getMsg(){

    const msg = ref( {
        "ddl":   
            [
                {
                    "ddlContent": "一起去保卫萝卜",  
                    "date": "2022-02-08T22:12:32",   
                    "group": "保卫萝卜二群",  
                    "src": "经研究，本群决定于2022年2月8日22时12分32秒，与大家一起去保卫萝卜，收到请回复！" 
                }
                ,
                {
                    "ddlContent": "一起去挖萝卜",  
                    "date": "2022-02-08T22:12:32",   
                    "group": "我们喜欢一起去挖萝卜二群",  
                    "src": "经研究，本群决定于2022年2月8日22时12分32秒，与大家一起去保卫萝卜，收到请回复！" 
                }
                ,
                {
                    "ddlContent": "一起去吃萝卜",  
                    "date": "2022-03-04T22:12:32",   
                    "group": "大快朵颐萝卜二群",  
                    "src": "经研究，本群决定于2022年2月8日22时12分32秒，与大家一起去保卫萝卜，收到请回复！" 
                }
                ,
                {
                    "ddlContent": "一起去埋了萝卜",  
                    "date": "2022-03-04T22:12:32",   
                    "group": "萝卜后事料理委员会二群",  
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

        })
        addRankAtrr(msg.value.ddl)
        return msg.value

} 
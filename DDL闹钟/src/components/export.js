import { ref } from "vue"

export const TipMsg = ref([" 是否确认登出？ ", "正在获取最新ddl信息......", "获取QQ聊天数据失败，请重试。",
    "正在提交DDL修改数据......", "DDL信息修改成功！", "确认要删除吗？", "正在删除......"])   // 提示语句设置

export const showWindowVisible = ref(false)
export const editWindowVisible = ref(false)

export const tableData = ref([])
export const rank2Class = ref({ "非常紧急": "red", "紧急": "yellow", "不紧急": "green" })
  // work


export const cellWidth = ref("80px")
export const openCell = ref(null)  //mycale

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
                    "date": "2022-03-04T22:12:32",   
                    "group": "我们喜欢一起去挖萝卜二群",  
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
} //test


export const msOutLookStatus = ref(false)
export const msSynchronousStatus = ref(false)


export const showWindowData = ref({});
export const editWindowData = ref({ date: null, ddlContent: null, rank: null });
export const inputEditData = ref({ date: null, ddlContent: null, rank: null });

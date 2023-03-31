import { ref } from 'vue'

import { addRankAtrr } from '../share/api'
import { tableData } from '../share/data'

export async function getMsg() {

    const msg = ref({
        "ddl":
            [
                {
                    "ddlContent": "一起去保卫萝卜",
                    "date": "2022-02-08T22:12:32",
                    "group": "保卫萝卜二群",
                    "src": "经研究，本群决定于2022年2月8日22时12分32秒，与大家一起去保卫萝卜，收到请回复！",
                    "rank": ''
                }
                ,
                {
                    "ddlContent": "一起去挖萝卜",
                    "date": "2022-02-08T22:12:32",
                    "group": "我们喜欢一起去挖萝卜二群",
                    "src": "经研究，本群决定于2022年2月8日22时12分32秒，与大家一起去保卫萝卜，收到请回复！",
                    "rank": ''
                }
                ,
                {
                    "ddlContent": "一起去吃萝卜",
                    "date": "2022-03-04T22:12:32",
                    "group": "大快朵颐萝卜二群",
                    "src": "经研究，本群决定于2022年2月8日22时12分32秒，与大家一起去保卫萝卜，收到请回复！",
                    "rank": ''
                }
                ,
                {
                    "ddlContent": "一起去埋了萝卜",
                    "date": "2022-03-04T22:12:32",
                    "group": "萝卜后事料理委员会二群",
                    "src": "经研究，本群决定于2022年2月8日22时12分32秒，与大家一起去保卫萝卜，收到请回复！",
                    "rank": '1'
                }
            ],
        "ddlGroups": 
            [
                {  
                    "groupName": "保卫萝卜二群", 
                    "status": true
                }, 
                {  
                    "groupName": "保卫萝卜二群", 
                    "status": true
                }, 
                {  
                    "groupName": "保卫萝卜二群", 
                    "status": true
                }, 
            ]
    })



    addRankAtrr(msg.value.ddl)
    return msg.value
}

export const pushEditData = async (input) => {
    tableData.value.ddl.push(input)
}


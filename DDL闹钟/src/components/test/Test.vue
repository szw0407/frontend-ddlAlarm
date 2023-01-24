<script setup>
import { ref } from "vue"

function login(a, b) {
    if (a === "admin" && b === "123456") {
        return true
    } else {
        return false
    }
}
function getMsg() {
    return [
        {
            "ddlContent": "123", "date": "2022-08-06", "group": "DDL发布群聊1",
            "rank": "紧急", "src": "原始信息1"
        },
        {
            "ddlContent": "DDL内容1", "date": "2022-10-03", "group": "DDL发布群聊2",
            "rank": "紧急", "src": "原始信息2"
        }, {

            "ddlContent": "DDL内容2", "date3": "2022-10-03", "group": "DDL发布群聊3",
            "rank": "不紧急", "src": "原始信息"
        }
        ,
        {
            "ddlContent": "DDL内容3", "date4": "2022-10-03", "group": "DDL发布群聊4",
            "rank": "非常紧急", "src": "原始信息"
        }
    ]
}
</script>
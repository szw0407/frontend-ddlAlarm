# 期望获取的数据格式: 
## 范例：    
```javascript
Data = {
        "userInformation": 
            {
                "avatarAddress": "../user1/avatar1.jpg" 
            }, 

        "ddl":   
            [
                {
                    "ddlContent": "一起去保卫萝卜",  
                    "date": "2022-06-08T22:12",   
                    "group": "保卫萝卜二群",  
                    "rank": "不紧急", 
                    "src": "经研究，本群决定于2022年6月8日22时12分，与大家一起去保卫萝卜，收到请回复！" 
                },
                ······
            ],

        "ddlGroups": 
            [
                {  
                    "groupName": "保卫萝卜二群", 
                    "status": true
                }, 
                ······
            ]

        }
```
## 具体介绍：
+ `Data`  
  + `userInformation`
    + 其值为一个对象，存放用户信息
    1. `"avatarAddress"` 
        + 其值为一个字符串，获取到的用户头像的存放路径
  + `"ddl"`
    + 其值为一个数组，按非常紧急到不紧急的顺序，存放各个ddl信息
    1. 第一个ddl信息
        1. `"ddlContent"`
           + 其值为一个字符串，该ddl的摘要
        2. `"date"`
           + 其值为一个字符串，该ddl精确到分的截止时间，格式应为:  
              > "yyyy-MM-dd'T'HH:mm"
        3. `"group"`
           + 其值为一个字符串，该ddl的发布群聊
        4. `"rank"`
           + 其值为一个字符串，该ddl的紧急等级
        5. `"src"`
           + 其值为一个字符串，该ddl的完整信息
    2. 第二个ddl信息
    3. ······
  + `"ddlGroups"`
    + 其值为一个数组，存放存在可抓取ddl信息的群聊名称及其抓取状态
    1. 第一个群聊
       1. `groupName`
          +  其值为一个字符串，该群聊的名称
       2. `status`
          +  其值为一个布尔值，该群聊被要求抓取的状态
    2. 第二个群聊
    3. ······
<script setup>
import { ref } from "vue"
import { CalendarCell } from "./CalendarCell.vue"
import { tableData } from "./WorkPage.vue"

class day {
    constructor(Data) {
        this.day = Data.date.getDate()
        this.color = Data.color
        this.weekRank = Data.date.getDay()
        this.show = Data.information
        this.index = Data.index
    }
}

const cellWidth = ref("10px")
const openCell = ref(null)

const days = ref([])
// for(i=Date.now().setMouth(Date.now().getMouth()-1);i)   这里是在把基于ddl单位的数据转换为基于day对象为单位的表现形式，还没做完
</script>

<template>
    <el-popover placement="right" width="80px" trigger="click">
        <template #reference>
            <el-button style="margin: 16px">纵览</el-button>
        </template>
        <div>
            <CalendarCell v-for="day in tableData">{{ day }}</CalendarCell>
        </div>
    </el-popover>
</template> 



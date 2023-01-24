<script setup>
import { ref } from "vue"
import { CalendarCell } from "./CalendarCell.vue"
import { tableData } from "./WorkPage.vue"

class day {
    constructor(date, color) {
        this.day = date.getDate()
        this.color = color
        this.weekRank = date.getDay()
    }
}

const cellWidth = ref("10px")
const openCell = ref(null)

const days = ref([])
for(i=Date.now().setMouth(Date.now().getMouth()-1);i)
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



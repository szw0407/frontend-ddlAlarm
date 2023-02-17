<script setup>
import { ref } from "vue"

import CalendarCell from "./CalendarCell.vue"
import { tableData,rank2Class } from "./export.js"

class day {
  constructor(Data) {
    this.day = Data.getDate()
    this.color = "white" //Data.color
    this.weekRank = Data.getDay()
    this.show = null //Data.information
    // this.index = null //Data.index 
  }
}

const days = ref([])

function* generateDays(start, end) {
  for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
    yield new day(currentDate);
  }
}

days.value = [...generateDays(
  new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1),
  new Date(new Date().setMonth(new Date().getMonth() + 2)).setDate(0)
)];

for (let ddl in tableData.value.ddl) {

  // 找对应的index
  const dateToFind = new Date(ddl.date);
  let index = 1
  let d = new Date()
  d.setDate(0)
  let counts = dateToFind.getMonth() - d.getMonth()
  if (counts < -4) { counts += 13; }
  else { counts++ }

  while (counts--) {
    index += dateToFind.getDate()
    dateToFind.setDate(0)
  }

  // 根据紧急等级植入颜色
  switch(rank2Class[ddl.rank]){
    case "red" : days.value[index].color = "red";
    break;
    case "yellow" : if (days.days.value[index].color !== "red") {
      days.value[index].color = "yellow";
    }
    break;
    case "green" : if (days.value[index].color === "white") {
      days.value[index].color = "green";
    }
  }

  // 植入完整内容
  days.value[index].show = ddl.src

}

</script>

<template>
  <el-popover placement="right" width="80px" trigger="click">
    <template #reference>
      <el-button style="margin: 16px">纵览</el-button>
    </template>
    <div class="width: 80px;">
      <CalendarCell v-for="day in days" :day="day"></CalendarCell>
    </div>
  </el-popover>
</template> 



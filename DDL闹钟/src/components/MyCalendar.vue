<script setup>
import { ref } from "vue"

import CalendarCell from "./CalendarCell.vue"
import { tableData, rank2Class } from "./export.js"

class day {
  constructor(Data) {
    this.month = Data.getMonth()
    this.day = Data.getDate()
    this.color = "white" //Data.color
    this.weekRank = Data.getDay()
    this.show = [] //Data.information
    this.index = []
  }
}

const days = ref([])
const showingDays = ref([])

function* generateDays(start, end) {
  for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
    yield new day(currentDate);
  }
}

days.value = [...generateDays(
  new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1),
  new Date(new Date().setMonth(new Date().getMonth() + 2)).setDate(0)
)];

for (let tableDataIndex in tableData.value.ddl) {

  // 找对应的index
  const dateToFind = new Date(tableData.value.ddl[tableDataIndex].date);
  let index = 1
  let tempMonth = dateToFind.getMonth()
  let tempDate = dateToFind.getDate()
  index = days.value.findIndex((day) => day.month === tempMonth && day.day === tempDate)
  // let d = new Date()
  // d.setDate(0)
  // let counts = dateToFind.getMonth() - d.getMonth()
  // if (counts < -4) { counts += 13; }
  // else { counts++ }

  // while (counts--) {
  //   index += dateToFind.getDate()
  //   dateToFind.setDate(0)
  // }

  days.value[index].index.push(tableDataIndex)

  // 根据紧急等级植入颜色
  switch (rank2Class[tableData.value.ddl[tableDataIndex].rank]) {
    case "red": days.value[index].color = "red";
      break;
    case "yellow": if (days.value[index].color !== "red") {
      days.value[index].color = "yellow";
    }
      break;
    case "green": if (days.value[index].color === "white") {
      days.value[index].color = "green";
    }
  }

  // 植入完整内容
  days.value[index].show.push({
    "ddlContent": tableData.value.ddl[tableDataIndex].ddlContent,
    "group": tableData.value.ddl[tableDataIndex].group,
    "rank": tableData.value.ddl[tableDataIndex].rank
  })

}


// showDays即单页展示的日子

let tempDays = []
const showingMonth = ref(0)
showingMonth.value = (new Date).getMonth()
tempDays = (days.value.filter(day => day.month === showingMonth.value))

// function addWhite() {
//   let tempFrontDay = new Date(tableData.value.ddl[tempDays[0].index])
//   let frontWhite = []
//   if (!tempDays[0].weekRank) {
//     tempFrontDay.setDate(tempFrontDay.getDate() - 1);
//     frontWhite.unshift(new day(tempFrontDay))
//     tempFrontDay.setDate(tempFrontDay.getDate() - 1);
//     while (!frontWhite[0].weekRank) {
//       frontWhite.unshift(new day(tempFrontDay))
//       tempFrontDay.setDate(tempFrontDay.getDate() - 1);
//     }
//   }
//   let tempBackDay = new Date(tableData.value.ddl[tempDays[tempDays.length - 1].index])
//   let backWhite = []
//   if (tempDays[tempDays.length - 1].weekRank !== 6) {
//     tempBackDay.setDate(tempBackDay.getDate() + 1);
//     backWhite.push(new day(tempBackDay))
//     tempBackDay.setDate(tempBackDay.getDate() + 1);
//     while (backWhite[backWhite.length - 1].weekRank !== 6) {
//       backWhite.push(new day(tempBackDay))
//       tempBackDay.setDate(tempBackDay.getDate() + 1);
//     }
//   }
//   console.log(frontWhite, tempDays, backWhite)
//   showingDays.value = showingDays.value.concat(frontWhite, tempDays, backWhite)
//   console.log(showingDays.value)
// }

function addWhite() {
  const tempFrontDay = new Date(tableData.value.ddl[tempDays[0].index]);
  const tempBackDay = new Date(tableData.value.ddl[tempDays[tempDays.length - 1].index]);
  const frontWhite = [];
  const backWhite = [];

  // 添加前置白天
  if (!tempDays[0].weekRank) {
    for (let i = 1; i <= 7; i++) {
      const temp = new Date(tempFrontDay.getTime() - i * 24 * 60 * 60 * 1000);
      if (temp.getDay() !== 0) {
        frontWhite.push(new day(temp));
      }
      else {
        break;
      }
    }
  }

  // 添加后置白天
  if (tempDays[tempDays.length - 1].weekRank !== 6) {
    for (let i = 1; i <= 7; i++) {
      const temp = new Date(tempBackDay.getTime() + i * 24 * 60 * 60 * 1000);
      if (temp.getDay() !== 6) {
        backWhite.push(new day(temp));
      }
      else {
        break;
      }
    }
  }

  showingDays.value = [...frontWhite, ...tempDays, ...backWhite];
}

addWhite()

</script>

<template>
  <el-popover placement="left" width="270px" trigger="click">
    <template #reference>
      <el-button style="margin: 40px;right: 260px;position: absolute;top: 70px;" size="large">纵览</el-button>
    </template>
    <div style="width:584px;margin-block:80px;">
      <div>
        <div :class="CalendarCell" @click="tempDays=[];showingDays=[];showingMonth--;" style="display: inline-block;">&lt;</div>
        <div :class="CalendarCell" @click="tempDays=[];showingDays=[];showingMonth++;" style="display: inline-block;">></div>
      </div>
      <CalendarCell v-for="day in showingDays" :day="day"></CalendarCell>
    </div>
  </el-popover>
</template> 


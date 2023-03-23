<script setup>
import { watch,ref } from "vue"

import CalendarCell from "./CalendarCell.vue"
import { tableData, rank2Class } from "./export.js"

const weekDayArr = ref(["日","一","二","三","四","五","六"])

class day {
  constructor(Data) {
    this.month = Data.getMonth()
    this.day = Data.getDate()
    this.color = "white" //Data.color
    this.weekRank = Data.getDay()
    this.show = [] //Data.information
    this.index = []
    this.date = Data
  }
}

const days = ref([])
const showingDays = ref([])

function* generateDays(start, end) {
  for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
    yield new day(new Date(currentDate.getTime()));
  }
}

days.value = [...generateDays(
  new Date(new Date().setMonth(new Date().getMonth() - 2)).setDate(1),
  new Date(new Date().setMonth(new Date().getMonth() + 2)).setDate(0)
)];

for (let tableDataIndex in tableData.value.ddl) {

  // 找对应的index
  const dateToFind = new Date(tableData.value.ddl[Number(tableDataIndex)].date);
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

  days.value[index].index.push(Number(tableDataIndex))
  console.log(days)

  // 根据紧急等级植入颜色
 switch (rank2Class.value[tableData.value.ddl[tableDataIndex].rank]) {
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
const TodayMonth = (new Date).getMonth()
const showingMonth = ref(0)
showingMonth.value = (new Date).getMonth()

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
  tempDays=[];
  showingDays.value =[];
  tempDays =(days.value.filter(day => day.month === showingMonth.value));
  const tempFrontDay = new Date(tempDays[0].date);
  const tempBackDay = new Date(tempDays[tempDays.length - 1].date);
  const frontWhite = [];
  const backWhite = [];

  // 添加前置白天
  if (tempDays[0].weekRank) {
    for (let i = 1; i <= 7; i++) {
      let temp = new Date(tempFrontDay.getTime());
      console.log("First Day Is :",tempFrontDay.getMonth(),"月",tempFrontDay.getDate(),"日")
      console.log("Final Day Is :",tempBackDay.getMonth(),"月",tempBackDay.getDate(),"日")
      temp.setDate(temp.getDate()-i)
      if (temp.getDay() !== 0) {
        console.log(temp.getDate()," is No.",temp.getDay())
        frontWhite.unshift((new day(temp)));
      }
      else {
        frontWhite.unshift((new day(temp)));
        break;
      }
    }
  }

  // 添加后置白天
  if (tempDays[tempDays.length - 1].weekRank !== 6) {
    for (let i = 1; i <= 7; i++) {
      let temp = new Date(tempBackDay.getTime());
      temp.setDate(temp.getDate()+i)
      if (temp.getDay() !== 6) {
        backWhite.push((new day(temp)));
      }
      else {
        backWhite.push((new day(temp)));
        break;
      }
      
    }
  }

  showingDays.value = [...frontWhite, ...tempDays, ...backWhite];
  // console.log(showingDays.value)
  // console.log(frontWhite)
  // console.log(backWhite)
}

addWhite()
watch(showingMonth,addWhite)

function toBeforeMonth(){
  if ( showingMonth.value - TodayMonth === 11 || showingMonth.value === TodayMonth - 1){
    console.warn("Impermissible Behavior.")
  }
  else{
    showingMonth.value--;
  }
}

function toNextMonth(){
  if ( TodayMonth - showingMonth.value === 11 || showingMonth.value === TodayMonth + 1){
    console.warn("Impermissible Behavior.")
  }
  else{
    showingMonth.value++;
  }
}

</script>

<template>
  <el-popover placement="left" width="584px" trigger="click">
    <template #reference>
      <el-button style="margin: 40px;right: 260px;position: absolute;top: 70px;" size="large">纵览</el-button>
    </template>
    <div style="width:584px;margin-block:80px;background-color: white;">
      <div>
        <p style="display: inline-block;">{{showingMonth + 1}}</p>
        <div :class="CalendarCell" @click="toBeforeMonth" style="display: inline-block;">&lt;</div>
        <div :class="CalendarCell" @click="toNextMonth" style="display: inline-block;">></div>
      </div>
      <div style="height:80px;width:80px;display: inline-block;" v-for="i in weekDayArr">{{i}}</div>
      <CalendarCell v-for="day in showingDays" :day="day"></CalendarCell>
    </div>
  </el-popover>
</template> 


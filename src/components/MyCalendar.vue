<script setup>
import { watch, ref } from "vue"

import CalendarCell from "./CalendarCell.vue"

import { tableData } from "../share/data"
import { rank2Class } from "../share/api"


const weekDayArr = ref(["日", "一", "二", "三", "四", "五", "六"])


const days = ref([])
const TodayMonth = (new Date).getMonth()
const showingMonth = ref(0)
const showingDays = ref([])   // showDays即单页展示的日子

let tempDays = []
showingMonth.value = (new Date).getMonth()  // 初始展示本月



class day {
  constructor(Data) {
    this.month = Data.getMonth()
    this.day = Data.getDate()
    this.color = "white"
    this.weekRank = Data.getDay()
    this.show = []
    this.index = []
    this.date = Data
  }
}



// 生成日序列
function* generateDays(start, end) {
  for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
    yield new day(new Date(currentDate.getTime()))
  }
}

// 加白
function addWhite() {
  tempDays = []
  showingDays.value = []
  tempDays = (days.value.filter(day => day.month === showingMonth.value))
  const tempFrontDay = new Date(tempDays[0].date)
  const tempBackDay = new Date(tempDays[tempDays.length - 1].date)
  const frontWhite = []
  const backWhite = []

  // 添加前置白天
  if (tempDays[0].weekRank) {
    for (let i = 1; i <= 7; i++) {
      let temp = new Date(tempFrontDay.getTime())
      temp.setDate(temp.getDate() - i)
      if (temp.getDay() !== 0) {
        frontWhite.unshift((new day(temp)))
      }
      else {
        frontWhite.unshift((new day(temp)))
        break
      }
    }
  }

  // 添加后置白天
  if (tempDays[tempDays.length - 1].weekRank !== 6) {
    for (let i = 1; i <= 7; i++) {
      let temp = new Date(tempBackDay.getTime())
      temp.setDate(temp.getDate() + i)
      if (temp.getDay() !== 6) {
        backWhite.push((new day(temp)))
      }
      else {
        backWhite.push((new day(temp)))
        break
      }

    }
  }

  showingDays.value = [...frontWhite, ...tempDays, ...backWhite]
}

// 切换到上个月
function toBeforeMonth() {
  if (showingMonth.value - TodayMonth === 11 || showingMonth.value === TodayMonth - 1) {
    console.warn("Impermissible Behavior.")
  }
  else {
    showingMonth.value--
  }
}

// 切换到下个月
function toNextMonth() {
  if (TodayMonth - showingMonth.value === 11 || showingMonth.value === TodayMonth + 1) {
    console.warn("Impermissible Behavior.")
  }
  else {
    showingMonth.value++
  }
}


// 生成前后一个月的日序列
days.value = [...generateDays(
  new Date(new Date().setMonth(new Date().getMonth() - 2)).setDate(1),
  new Date(new Date().setMonth(new Date().getMonth() + 2)).setDate(0)
)]

// 向日序列内植入信息
for (let tableDataIndex in tableData.value.ddl) {

  // 找对应的index
  const dateToFind = new Date(tableData.value.ddl[Number(tableDataIndex)].date);
  let index = 1
  let tempMonth = dateToFind.getMonth()
  let tempDate = dateToFind.getDate()
  index = days.value.findIndex((day) => day.month === tempMonth && day.day === tempDate)
  days.value[index].index.push(Number(tableDataIndex))

  // 根据紧急等级植入颜色
  switch (rank2Class.value[tableData.value.ddl[tableDataIndex].rank]) {
    case "red": days.value[index].color = "red"
      break
    case "yellow": if (days.value[index].color !== "red") {
      days.value[index].color = "yellow"
    }
      break
    case "green": if (days.value[index].color === "white") {
      days.value[index].color = "green"
    }
  }

  // 植入完整内容
  days.value[index].show.push({
    "ddlContent": tableData.value.ddl[tableDataIndex].ddlContent,
    "group": tableData.value.ddl[tableDataIndex].group,
    "rank": tableData.value.ddl[tableDataIndex].rank
  })

}


// 初始加白
addWhite()

// 切换展示月，则加一次白
watch(showingMonth, addWhite)

</script>

<template>
  <el-popover placement="left" width="584px" trigger="click">
    <template #reference>
      <el-button style="margin: 40px;right: 260px;position: absolute;top: 70px;" size="large">纵览</el-button>
    </template>
    <div style="width:584px;margin-block:80px;background-color: white;">
      <div style="margin-bottom: 2%;">
        <div :class="CalendarCell" @click="toBeforeMonth" style="display: inline-block;margin-left: 38%;margin-right: 5%;">&lt;</div>
        <p style="display: inline-block;">{{ showingMonth + 1 }}</p>
        <div :class="CalendarCell" @click="toNextMonth" style="display: inline-block;margin-left: 5%;">></div>
      </div>
      <div style="height:80px;width:80px;display: inline-block;text-align: center;" v-for="i in weekDayArr">{{ i }}</div>
      <CalendarCell v-for="day in showingDays" :day="day"></CalendarCell>
    </div>
  </el-popover>
</template> 


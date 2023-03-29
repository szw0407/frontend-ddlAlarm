import { tableData, days } from './data'

import { rank2Class } from "./api"

export const calendar = () => {
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

}

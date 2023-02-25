<script setup>
import { ref, computed } from "vue"

import { cellWidth, openCell } from "./export.js"
import DDLOperations  from "./DDLOperations.vue"

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

const props = defineProps(["day"])

const cell = ref(null)
const showCell = ref(null)
const thisCellStatus = computed(() => {
    return openCell.value === props.day
})

function clickEvent(number) {
    if (props.day.color !== "white") {
        if (!thisCellStatus.value) {
            openCell.value = props.day
            cell.value.width = (cellWidth.value - "px") * (7 - number) + "" + "px"
        } else {
            openCell.value = null
            cell.value.width = cellWidth.value
        }
    }
}

function returnClassName(day){
    console.log(day.color)
    return day.color
}

function consoleFunc(a){
    console.log(a)
    return a
}
</script>

<template>
    <div style="display:inline-block;" @click="clickEvent(props.day.weekRank)">
        <div :style="{backgroundColor: returnClassName(props.day)}" ref="cell" 
        style="height:80px;width:80px;align-items: center;justify-content: center;">
            <p class="cellContent"> {{ props.day.day }} </p>
        </div>
    </div>
    <div v-if="thisCellStatus" class="ddlShow" style="display: block;">
                <div class="ddlContent"><div style="display: flex;justify-content: space-around;">
                    <div class="intextMenu1"><p>DDL内容</p></div>
                    <div class="intextMenu2"><p>发布群聊</p></div>
                    <div class="intextMenu3"><p>紧急程度</p></div>
                    </div>

                    <el-popover ref="popover" title="操作" trigger="contextmenu"
                        v-for="ddlIndex in [...Array(props.day.show.length).keys()]" :width="300">
                        <template #reference>
                                <div>
                                <div class="intextMenu1"><p>{{props.day.show[ddlIndex].ddlContent}}</p></div>
                                <div class="intextMenu2"><p>{{props.day.show[ddlIndex].group}}</p></div>
                                <div class="intextMenu3"><p>{{props.day.show[ddlIndex].rank}}</p></div>
                            </div>
                        </template>
                                <DDLOperations :index="consoleFunc(props.day.index[ddlIndex])" />
                    </el-popover>
                </div>
            </div>                                                    
</template>

<style scoped>
.red {
    color: black;
    background-color: red;
}

.green {
    color: black;
    background-color: green;
}

.yellow {
    color: black;
    background-color: yellow;
}

.white {
    color: black;
    background-color: white;
}

.cellContent {
    color: black;
    margin: 0 auto;
    text-align: center;
}

.ddlShow {
    color: black;
    width: 560px;
    height: 160px;
}

.ddlContent {
    margin: 0 auto;
}

.intextMenu1,.intextMenu2,.intextMenu3{
    display: inline-block;
    text-align: center;
}
.intextMenu1{
    width: 35%;
}
.intextMenu2{
    width: 35%;
}
.intextMenu3{
    width: 30%;
}
</style>
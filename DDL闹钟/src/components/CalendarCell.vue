<script setup>
import { ref, computed } from "vue"

import { cellWidth, openCell } from "./export.js"
import DDLOperations  from "./DDLOperations.vue"

const props = defineProps(["day"])

const cell = ref(null)
const thisCellStatus = computed(() => {
    return openCell.value === props.day
})

function clickEvent(cellWidth, number) {
    if (day.color !== "white") {
        if (!thisCellStatus.value) {
            openCell.value = props.day
            cell.value.width = (cellWidth.value - "px") * (7 - number) + "" + "px"
        } else {
            openCell.value = null
            cell.value.width = cellWidth.value
        }
    }
}
</script>

<template>
    <div style="display:inline-block;">
        <div :class="day.color" ref="cell" style="height:80px;width:80px">
            <p @click="clickEvent" class="cellContent"> {{ day.day }} </p>
            <div v-if="thisCellStatus" class="ddlShow">
                <div class="ddlContent">
                    <el-popover ref="popover" title="Title" :width="200" trigger="contextmenu"
                        v-for="ddl in day.show">
                        <template #reference>
                            <div><p>DDL内容 发布群聊 紧急程度</p></div>
                            <div class="m-2"><p>{{ddl.ddlcontent}}  {{ddl.group}}  {{ddl.rank}}</p></div>
                        </template>
                        <DDLOperations :index="day.index" />
                    </el-popover>
                </div>
            </div>
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
}

.ddlShow {
    color: black;
    width: 70px;
    height: auto;
}

.ddlContent {
    margin: 0 auto;
}
</style>
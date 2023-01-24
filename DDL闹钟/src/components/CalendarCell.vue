<script setup>
import { ref, computed } from "vue"
import { cellWidth, openCell } from "./MyCalendar.vue"

defineProps(["day"])

const cell = ref(null)
const thisCellStatus = computed(() => {
    return openCell.value === day
})

function clickEvent(cellWidth, number) {
    if (day.color !== "white") {
        if (!thisCellStatus.value) {
            openCell.value = day
            cell.value.width = (cellWidth.value - "px") * (7 - number) + "" + "px"
        } else {
            openCell.value = null
            cell.value.width = cellWidth.value
        }
    }
}
</script>

<template>
    <div>
        <div :class="day.color" ref="cell">
            <p @click="clickEvent" class="cellContent"> {{ day.day }} </p>
            <div v-if="thisCellStatus" class="ddlShow">
                <div class="ddlContent"></div>
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
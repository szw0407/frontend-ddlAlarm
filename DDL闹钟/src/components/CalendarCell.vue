<script setup>
    import { ref } from "vue"
    import { cellWidth } from "./MyCalendar.vue"

    defineProps(["day"])

    const showStatus = ref(false)
    const cell = ref(null)
    function clickEvent(cellWidth, number){
        if (!showStatus){
            showStatus = !showStatus
            cell.value.width = (cellWidth.value-"px")*(7-number) + "" + "px"
        }else{
            showStatus = !showStatus
            cell.value.width = cellWidth.value
        }
    }
</script>

<template>
    <div>
        <div :class="day.color" ref="cell" >
            <p @click="clickEvent" class="cellContent"> {{ day.day }} </p>
            <div v-if="showStatus" class="ddlShow">
                <div class="ddlContent"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .red{
        color: black;
        background-color: red;
    }
    .green{
        color: black;
        background-color: green;
    }
    .yellow{
        color: black;
        background-color: yellow;
    }
    .white{
        color: black;
        background-color: white;
    }
    .cellContent{
        color: black;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 5px;
    }
    .ddlShow{
        color: black;
        width: 70px;
        height: auto;
    }
    .ddlContent{
        margin: 5px;
    }

</style>
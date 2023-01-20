<script setup>
    defineEmits(["Warn-done"])   // 警告完成后抛出事件提醒父组件
</script>

<template>
    <p><slot></slot></p>        <!-- 警告内容插入 -->
    <button @click ='$emit("Warn-done")'>test</button> 
</template>

<style>
    p{
        color: black;
        margin: 10px;
    }
    button{
        color: black;
        width: 10px;
        height: 5px;
        margin: 5px;
    }
</style>
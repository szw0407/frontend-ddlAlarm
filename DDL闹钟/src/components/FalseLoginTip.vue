<script setup>
    defineEmits(["Warn-done"])
</script>

<template>
    <p><slot></slot></p>
    <button @click="$emit("Warn-done")">test</button>
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
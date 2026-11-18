<script setup>
import {ref} from 'vue';
const props=defineProps({initial:{type:Number,default:0},label:{type:String,default:'Vue counter'}});
const count=ref(props.initial);
</script>
<template><div class="counter"><span>{{ label }}</span><button @click="count++" :aria-label="`${label}: ${count}`">Count: {{ count }}</button></div></template>
<style scoped>
.counter{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px;border:1px solid var(--border);border-radius:var(--panel-radius);background:var(--surface);font:14px var(--font)}button{font:inherit;background:var(--accent);color:var(--accent-text);border:0;border-radius:var(--radius);padding:10px 16px;cursor:pointer;min-height:44px}
</style>

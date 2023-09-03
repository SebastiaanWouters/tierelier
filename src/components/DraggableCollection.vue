<template>
    <img :draggable="true" @dragstart="initDrag" :src='props.src' class=""/>
</template>

<script setup lang="ts">
    import { useTierlistStore } from '../stores/store';

    const props = defineProps<{
        id: string
        src: string
    }>()

    const store = useTierlistStore();

    function initDrag(e: DragEvent) {
        e.dataTransfer.effectAllowed = "copyMove";
        console.log("starting drag")
        store.dragged = { id: props.id, src: props.src, origin: 'collection'}
    }
</script>

<style scoped>
    img {
        width: 100%;
        aspect-ratio: 4/5;
        background: green;
        
    }
</style>
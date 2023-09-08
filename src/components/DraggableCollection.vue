<template>
    <img :key="props.id" :draggable="true" @dragstart="initDrag" :src='props.src' class=""/>
</template>

<script setup lang="ts">
    import { useTierlistStore } from '../stores/store';

    const props = defineProps<{
        id: string
        src: string
    }>()

    const store = useTierlistStore();

    function initDrag(e: DragEvent) {
        if (!e.dataTransfer?.effectAllowed) return;
        e.dataTransfer.effectAllowed = "copyMove";
        console.log("starting drag")
        store.dragged = { id: props.id, src: props.src, origin: 'collection'}
    }
</script>

<style scoped>
    img {
        width: 100%;
        background: green;
        transition: transform 0.2s;
    }
    img:hover {
            transform: scale(1.04);
            transition: transform 0.2s;
        }
</style>
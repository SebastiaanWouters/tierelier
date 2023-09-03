<template>
    <img :draggable="true" @dragstart="initDrag" :src='props.src' class=""/>
</template>

<script setup lang="ts">
    import { useTierlistStore } from '../stores/store';

    const props = defineProps<{
        id: string
        src: string
        origin: string;
    }>()

    const store = useTierlistStore();

    function initDrag() {
        console.log("starting drag")
        store.dragged = { id: props.id, src: props.src, origin: props.origin }
    }
</script>

<style scoped>
    img {
        max-height: 100%;
        aspect-ratio: 4/5;
        background: green;
        cursor: grab;
    }
</style>
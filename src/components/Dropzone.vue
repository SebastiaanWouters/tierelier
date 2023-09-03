<template>
    <div class="row"><div class="first uppercase">{{ props.cat }}</div><div @dragenter.prevent="handleEnter" @dragover.prevent @drop="handleDrop" class="row-content"><slot></slot></div></div>
</template>

<script setup lang="ts">
    import { useTierlistStore } from '../stores/store';

    const props = defineProps<{
        cat: string
    }>()

    const store = useTierlistStore();

    function handleDrop() {
        store.move(props.cat)
    }

    function handleEnter(e: DragEvent) {
        e.dataTransfer ? e.dataTransfer.dropEffect = "move" : '';

    }
</script>

<style scoped>
    .row {
        width: 100%;
        background: pink;
        border: thin solid blue;
        flex: 1;
        overflow: hidden;
        display: flex;
        gap: 1rem;
    }

    

    .first {
        aspect-ratio: 1/1;
        height: 100%;
        background: brown;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .row-content {
        display: flex;
        gap: 1rem;
        overflow: auto;
        background: wheat;
        min-width: 30rem;
    }
</style>
<template>
    <div class="row"><div class="first uppercase">{{ props.cat === "d" ? 'Glenn Leys' : props.cat }}</div><div @dragenter.prevent="handleEnter" @dragover.prevent @drop="handleDrop" class="row-content"><slot></slot></div></div>
</template>

<script setup lang="ts">
    import { useTierlistStore } from '../stores/store';

    const props = defineProps<{
        cat: string
    }>()

    const store = useTierlistStore();

    function handleDrop() {
        store.moveToCategory(props.cat)
    }

    function handleEnter(e: DragEvent) {
        e.dataTransfer ? e.dataTransfer.dropEffect = "move" : '';

    }
</script>

<style scoped>
    .row {
        width: 100%;
        border: thin solid var(--border-color);
        flex: 1;
        overflow: hidden;
        display: flex;
        gap: 1rem;
        position: relative;
    }
    

    .first {
        aspect-ratio: 1/1;
        max-width: 15vw;
        height: 100%;
        color: #fff;
        font-size: clamp(1.3rem, 1.4rem + 0.56vw, 2.4rem);
        background: var(--background);
        display: grid;
        place-items: center;
        text-align: center;
    }

    .row-content {
        display: flex;
        gap: 1rem;
        overflow-y: hidden;
        overflow-x: auto;  
        min-width: 80%;
    }
</style>
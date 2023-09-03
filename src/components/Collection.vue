<template>
    <div class="main">
        <div class="search">
            
        </div>
        <div @dragenter.prevent @dragover.prevent @drop="handleDrop" class="items" >
            <Draggable v-for="item in store.collection"  :id="item.id" :src="item.src"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useTierlistStore } from '../stores/store'
    import Draggable from './DraggableCollection.vue';

    const store = useTierlistStore()

    function handleDrop() {
        store.moveToCollection()
    }
</script>

<style lang="scss" scoped>
    main {
        display: flex;
        flex-direction: column;
        
        gap: 2vh;

        .search {
            height: max(50px, 10vh);
            width: 100%;
            padding: 1rem;
            background: purple;
            @media only screen and (max-width: 1200px) {
                display: none;
            }

        }

        [draggable] {
            cursor: grab;
        }

        .items {
            display: grid;
            grid-template-columns: 1fr 1fr;
            @media only screen and (max-width: 1200px) {
                grid-template-columns: 1fr;
            }
            gap: 1rem;
            background: lime;
            min-height: 60vh;
            //flex-grow: 1;
            overflow-y: scroll;
            max-height: 80vh;
            position: relative;

            .item {
                width: 100%;
                aspect-ratio: 4/5;
                position: relative;
            }
        }
    }
</style>
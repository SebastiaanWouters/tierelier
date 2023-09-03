<template>
    <div class="main" @dragenter.prevent @dragover.prevent @drop="handleDrop">
        <div class="search">
            <input placeholder="zoeken..." type="text" v-model="searchTerm">
        </div>
        <TransitionGroup name="list" tag="div" class="items" >
            <Draggable :key="item.id" v-for="item in filtered" :id="item.id" :src="item.src"/>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useTierlistStore } from '../stores/store'
    import Draggable from './DraggableCollection.vue';

    const store = useTierlistStore()

    function handleDrop() {
        store.moveToCollection()
    }

    const searchTerm = ref('');

    const filtered = computed(() => store.collection.filter(item => item.id.includes(searchTerm.value)))
</script>

<style lang="scss" scoped>
    .main {
        display: flex;
        flex-direction: column;
        gap: 1vh;
        height: 100%;
        padding-inline: 1rem;

        .search {
            height: max(50px, 4vh);
            width: 100%;
            
            @media only screen and (max-width: 1200px) {
                display: none;
            }

            input {
                padding: 0.5rem 0.5rem;
                font-size: 1.2rem;
                width: 100%;
                background: #ddd;
                outline: none;
                border: thin solid var(--border-color);
                
            }

        }

        [draggable] {
            cursor: grab;
        }

        .items {
            display: grid;
            grid-template-columns: 1fr 1fr;
            position: relative;
            overflow-x: hidden;
            @media only screen and (max-width: 1200px) {
                grid-template-columns: 1fr;
            }
            gap: 1rem;
            
            overflow-y: auto;

        }
    }

    .list-move, /* apply transition to moving elements */
    .list-enter-active,
    .list-leave-active {
    transition: all 0.5s ease, opacity 0s ease;
    }

    
    .list-leave-to {
        opacity: 0
    
    }

    /* ensure leaving items are taken out of layout flow so that moving
    animations can be calculated correctly. */
    .list-leave-active {
    position: absolute;
    }
</style>
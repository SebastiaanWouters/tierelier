<template>
    <div class="main">
        <Dropzone cat="goat">
                <Draggable v-for="drink in store.GOAT" origin="goat" :id="drink.id" :src="drink.src"></Draggable>
        </Dropzone>
         <Dropzone cat="a">
                <Draggable v-for="drink in store.A" origin="a" :id="drink.id" :src="drink.src"></Draggable>
        </Dropzone>
        <Dropzone cat="b">
                <Draggable v-for="drink in store.B" origin="b" :id="drink.id" :src="drink.src"></Draggable>
        </Dropzone>
        <Dropzone cat="c">
                <Draggable v-for="drink in store.C" origin="c" :id="drink.id" :src="drink.src"></Draggable>
        </Dropzone>
        <Dropzone cat="d">
                <Draggable v-for="drink in store.D" origin="d" :id="drink.id" :src="drink.src"></Draggable>
        </Dropzone>
        
    </div>
</template>

<script setup lang="ts">
    
    import { useTierlistStore } from '../stores/store';
    import Dropzone from './Dropzone.vue'
    import Draggable from './Draggable.vue';

    const store = useTierlistStore();

    // onMounted(() => {
    //     store.GOAT.push({ id: "monster", src: '/monster-min.jpg'})
    // })
</script>

<style scoped lang="scss">
    .main {
        display: flex;
        height: 100%;
        gap: 1rem;
        flex-direction: column;

        .column {
            width: 100%;
            background: pink;
            border: thin solid blue;
            flex: 1;
            position: relative;
            display: flex;
            gap: 2rem;

            .item {
                width: auto;
                height: 100%;
                background: green;
            }
          
        }
    }
</style>
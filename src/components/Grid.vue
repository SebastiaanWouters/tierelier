<template>
    <div class="main">
        <Dropzone style="--background: var(--red)" cat="goat">
            <TransitionGroup name="list">
                <Draggable :key="drink.id" v-for="drink in store.GOAT" origin="goat" :id="drink.id" :src="drink.src"></Draggable>
            </TransitionGroup>
        </Dropzone>
         <Dropzone style="--background: var(--orange)" cat="a">
            <TransitionGroup name="list">
                <Draggable :key="drink.id" v-for="drink in store.A" origin="a" :id="drink.id" :src="drink.src"></Draggable>
            </TransitionGroup>
        </Dropzone>
        <Dropzone style="--background: var(--yellow)" cat="b">
                <TransitionGroup name="list">
                    <Draggable :key="drink.id" v-for="drink in store.B" origin="b" :id="drink.id" :src="drink.src"></Draggable>
                </TransitionGroup>
        </Dropzone>
        <Dropzone style="--background: var(--green)" cat="c">
                <TransitionGroup name="list">
                    <Draggable :key="drink.id" v-for="drink in store.C" origin="c" :id="drink.id" :src="drink.src"></Draggable>
                </TransitionGroup>
        </Dropzone>
        <Dropzone style="--background: var(--purple)" cat="d">
                <TransitionGroup name="list">
                    <Draggable :key="drink.id" v-for="drink in store.D" origin="d" :id="drink.id" :src="drink.src"></Draggable>
                </TransitionGroup>
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
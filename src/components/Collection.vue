<template>
    <div class="main">
        <div class="search">
            
        </div>
        <div class="items">
            <img draggable class="item" src="/monster-min.jpg"/>
            <div class="w-full h-full bg-pink-400"></div>
            
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div> 
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Drink from './Drink.vue'
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

        .items {
            display: grid;
            grid-template-columns: 1fr 1fr;
            @media only screen and (max-width: 1200px) {
                grid-template-columns: 1fr;
            }
            gap: 1rem;
            background: brown;
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
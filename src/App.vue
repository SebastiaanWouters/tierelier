<script setup lang="ts">
import {  VNodeRef, onMounted, ref } from 'vue';
import Collection from './components/Collection.vue'
import Grid from './components/Grid.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const mdAndLarger = breakpoints.greaterOrEqual('md') // sm and larger

onMounted(() => {
  modal.value.showModal();
})

const modal = ref<null | VNodeRef>(null);

function handleClose() {
  console.log('cl0se')
  if (modal.value) {modal.value.close()}
}

</script>

<template>
 <main v-if="mdAndLarger">
  <div class="header">
    <h1>Energy Drink Tierlist</h1>
    <h1 class="counter">o</h1>
  </div>
  <div class="left">
    <Grid></Grid>
  </div>
  <div class="right">
    <Collection></Collection>
  </div>
  <dialog ref="modal" id="modal"><button @click="handleClose">X</button></dialog>
 </main>
 <main class="small text-center" v-else>
  Monster is dodelijk <br>drink met maten
 </main>
</template>

<style lang="scss" scoped>
  main {
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-template-rows: repeat(12, 1fr);
  }

  .header {
    grid-column: span 19;
    grid-row: span 1;
    
  }

  .left {
    grid-column: span 19;
    grid-row: span 11;
    
  }

  .right {
    grid-column: span 5;
    grid-row: span 11;
    
    
  }

  .item {
    width: 100%;
    flex: 1;
    
    border: thin solid blue;
    height: 500px;
  }

  #modal {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;
    height: 40vh;
    background: black;
    border: thin solid lime;

    button {
      outline: none;
      all: unset;
      position: absolute;
      top: 0px;
      right: 6px;
      background: black;
      color: white;
      cursor: pointer;
      font-size: 2rem;
    }

  }

   #modal::backdrop {
      background: oklab(10% 0 0 / 80%);
    }

  .small {
    display: flex;
    justify-content: center;
    align-items: center;
    color: limegreen;
    font-size: 2rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-left: 0.3rem;
    line-height: 4rem;
    font-size: clamp(0.8rem, 0.8rem + 0.26vw*3, 2.6rem);
    font-family: 'Monster', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    h1 {
      color: #eee;
    }
    .counter {
      font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
  }

  
</style>

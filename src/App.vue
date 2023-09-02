<script setup lang="ts">
import Collection from './components/Collection.vue'
import Grid from './components/Grid.vue'
</script>

<template>
 <main>
  <!-- <div class="heading"><h1>Energy Drink Tierlist</h1></div>
  <div class="content">
    <div class="categories">
      <Grid></Grid>
    </div>
    <div class="collection">
      <Collection></Collection>
    </div>
  </div> -->
  <div class="header"></div>
  <div class="left">
    <Grid></Grid>
  </div>
  <div class="right">
    <Collection></Collection>
  </div>
 
 </main>
</template>

<style lang="scss" scoped>
  main {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
  }

  .header {
    background: blue;
    grid-column: span 12;
    grid-row: span 1;
  }

  .left {
    grid-column: span 10;
    grid-row: span 11;
    background: red;
  }

  .right {
    grid-column: span 2;
    grid-row: span 11;
    background: yellow;
  }

  .item {
    width: 100%;
    flex: 1;
    
    border: thin solid blue;
    height: 500px;
  }

  
  // .heading {
  //   height: min(10vmax, 120px);
  //   padding-left: 1vw;
  //   width: full;
  //   background: yellow;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;

  //   h1 {
  //     font-size: clamp(2rem, 1.6471rem + 1.8824vw, 4rem);
  //   }

  // }

  // .content {
  //   background: orange;
  //   display: flex;
  //   flex-grow: 1;
  //   .categories {
  //     flex: 1;
  //     background: gray;
  //   }
  //   .collection {
  //     width: max(20vw, 120px);
  //     height: 100%;
  //     background: green;
  //   }

  // }
</style>

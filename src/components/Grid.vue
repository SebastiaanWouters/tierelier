<template>
    <div class="main">
        <div class="column">
            <div class="category"></div>
        </div>
         <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
    </div>
</template>

<script setup lang="ts">

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

          
        }
    }
</style>
<script setup lang="ts">
import {  VNodeRef, computed, onMounted, ref, watch } from 'vue';
import Collection from './components/Collection.vue'
import Grid from './components/Grid.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useTierlistStore } from './stores/store';
import Cookies from 'universal-cookie';

const store = useTierlistStore()

const counterValue = computed(() => store.GOAT.length + store.A.length + store.B.length + store.C.length + store.D.length)

const breakpoints = useBreakpoints(breakpointsTailwind)

const mdAndLarger = breakpoints.greaterOrEqual('md') // sm and larger

onMounted(() => {
  const cookies = new Cookies(null, { path: '/' });

  const cookie  = cookies.get('visited');

  if (!cookie) {
    setTimeout(() => {
      modalWelcome.value.showModal()
      cookies.set('visited', true)
    }, 500)
    
  }
 
})

watch(counterValue, () => {
  if (counterValue.value === 10) {
    setTimeout(() => modal10.value.showModal(), 900)
  }
  if (counterValue.value === 20) {
    setTimeout(() => modal20.value.showModal(), 900)
  }
  if (counterValue.value === 36) {
    setTimeout(() => modalEnd.value.showModal(), 900)
  }
})

const modal10 = ref<null | VNodeRef>(null);
const modal20 = ref<null | VNodeRef>(null);
const modalEnd = ref<null | VNodeRef>(null);
const modalWelcome = ref<null | VNodeRef>(null);

function handleClose10() {
  console.log('cl0se')
  if (modal10.value) {modal10.value.close()}
}
function handleClose20() {
  console.log('cl0se')
  if (modal10.value) {modal20.value.close()}
}
function handleCloseEnd() {
  console.log('cl0se')
  if (modal10.value) {modalEnd.value.close()}
}

function handleCloseWelcome() {
  console.log('cl0se')
  if (modalWelcome.value) {modalWelcome.value.close()}
}

</script>

<template>
 <main v-if="mdAndLarger">
  <div class="header">
    <h1>Energy Drink Tierlist</h1>
    <h1 class="counter">{{  counterValue }}</h1>
  </div>
  <div class="left">
    <Grid></Grid>
  </div>
  <div class="right">
    <Collection></Collection>
  </div>
  <dialog ref="modal10" id="modal"><div class="modal-content"><button @click="handleClose10"><iconify-icon icon="line-md:close" style="color: #B3E116;"  rotate="270deg" flip="horizontal,vertical"></iconify-icon></button><img class="w-96" src="https://media4.giphy.com/media/W1TPavKSPEVVjz4LAJ/giphy.gif" /><p style="font-size: 2.2rem;">10 van de 26 gekanteld <br><br>keep on grinding</p></div></dialog>
  <dialog ref="modal20" id="modal"><div class="modal-content"><button @click="handleClose20"><iconify-icon icon="line-md:close" style="color: #B3E116;"  rotate="270deg" flip="horizontal,vertical"></iconify-icon></button><img class="w-56" src="https://media3.giphy.com/media/HB4reLrq4b5MiGE2ve/giphy.gif"/><p style="font-size: 2.2rem;">Opgespast! <br>20 energiedrankjes is best veel<br> De kans op hartfalen is nu aanwezig <br> blijf drinken op eigen risico</p></div></dialog>
  <dialog ref="modalEnd" id="modal"><div class="modal-content"><button @click="handleCloseEnd"><iconify-icon icon="line-md:close" style="color: #B3E116;"  rotate="270deg" flip="horizontal,vertical"></iconify-icon></button><img class="w-56" src="https://media3.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif"/><p style="font-size: 2rem;">Mission Accomplished <br><br>Gefeliciteerd met uw diploma in de energiedrankologie <br><br>Dikke merci voor alle fantastische cafeetjes <br> we love you</p></div></dialog>
  <dialog ref="modalWelcome" id="modal"><div class="modal-content"><button @click="handleCloseWelcome"><iconify-icon icon="line-md:close" style="color: #B3E116;"  rotate="270deg" flip="horizontal,vertical"></iconify-icon></button><p style="font-size: 2.6rem;">Laat het smaken legend</p><img class="w-96" src="https://media3.giphy.com/media/l0HlBAAkI1I5zKzV6/giphy.gif" /></div></dialog>
</main>
 <main class="small text-center" v-else>
  <img class="w-32" src="logo.png" />
  <p>Jow Thews  <br><br> kom terug op desktop<br> bro <br><span style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">monsterislife.be</span><br><br>Nieuwe Upload PLS</p>
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
    height: fit-content;

    background: black;
    border: thin solid #B3E116;
    color: #B3E116;
    // display: flex;
    padding-block: 2rem;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    .modal-content {
      text-align: center;
      gap: 1rem;
      font-size: 1.7rem;
      
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      p {
        max-width: 50ch;
      }

    }
  
    button {
      outline: none;
      all: unset;
      position: absolute;
      top: 6px;
      right: 6px;
      background: black;
      color: white;
      cursor: pointer;
      font-size: 2rem;
    }

  }

   #modal::backdrop {
      background: oklab(10% 0 0 / 80%);
      backdrop-filter: blur(5px);
    }

  .small {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #B3E116;
    font-size: 2rem;
    flex-direction: column;


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
  
  }

  
</style>

import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { useLocalStorage } from '@vueuse/core'

export const useTierlistStore = defineStore('tierlist', () => {
  const dragged = ref<null | { id: string, src: string, origin: string }>(null);

  const GOAT = useLocalStorage<{ id: string, src: string}[]>('row0', [])
  const A = useLocalStorage<{ id: string, src: string}[]>('row1', [])
  const B = useLocalStorage<{ id: string, src: string}[]>('row2', [])
  const C = useLocalStorage<{ id: string, src: string}[]>('row3', [])
  const D = useLocalStorage<{ id: string, src: string}[]>('row4', [])
    
  const collection = useLocalStorage<{ id: string, src: string}[]>('collection', [ { id: "boni", src: "/boni_up-min.jpg" },
    { id: "delhaize", src: "/delhaize-min.jpg" },
    { id: "energy_sugar_ah_albert_heijn", src: "/energy_drink_sugar-min.jpg" },
    { id: "energy_ah_albert_heijn", src: "/energy_drink-min.jpg" },
    { id: "hell", src: "/hell-min.jpg" },
    { id: "king", src: "/king-min.jpg" },
    { id: "monster_aussie", src: "/monster_aussie_lemonade-min.jpg" },
    { id: "monster_hamilton", src: "/monster_hamilton-min.jpg" },
    { id: "monster_mango_loco", src: "/monster_mango_loco-min.jpg" },
    { id: "monster_pacific_punch", src: "/monster_pacific_punch-min.jpg" },
    { id: "monster_pipeline_punch", src: "/monster_pipeline_punch-min.jpg" },
    { id: "monster_ultra", src: "/monster_ultra-min.jpg" },
    { id: "monster", src: "/monster-min.jpg" },
    { id: "nalu_botanical", src: "/nalu_botanical-min.jpg" },
    { id: "nalu_frost", src: "/nalu_frost-min.jpg" },
    { id: "nalu_melon_splash", src: "/nalu_melon_splash-min.jpg" },
    { id: "nalu_tropical", src: "/nalu_tropical-min.jpg" },
    { id: "nalu", src: "/nalu-min.jpg" },
    { id: "nightwatch", src: "/nightwatch-min.jpg" },
    { id: "nitro", src: "/nitro-min.jpg" },
    { id: "npva", src: "/npva-min.jpg" },
    { id: "nocco_mango", src: "/nocco_mango-min.jpg" },
    { id: "nocco", src: "/nocco-min.jpg" },
    { id: "redbull_green", src: "/redbull_green-min.jpg" },
    { id: "redbull_red", src: "/redbull_red_jpg-min.jpg" },
    { id: "redbull_summer", src: "/redbull_summer_jpg-min.jpg" },
    { id: "redbull_white", src: "/redbull_white_jpg-min.jpg" },
    { id: "redbull-min", src: "/redbull-min.jpg" },
    { id: "rockstar_no_sugar", src: "/rockstar_no_sugar-min.jpg" },
    { id: "rockstar_tropical", src: "rockstar_tropical-min.jpg" },
    { id: "rockstar", src: "/rockstar-min.jpg" },
    { id: "rodeo", src: "/rodeo-min.jpg" },
    { id: "tao_organic", src: "/tao_organic-min.jpg" },
    { id: "tao", src: "/tao-min.jpg" },
    { id: "tenzing_raspberry", src: "/tenzing_raspberry-min.jpg" },
    { id: "tenzing", src: "/tenzing-min.jpg" },])


  function moveToCategory(dest: string) {
    if (dragged.value) {
      
      if (dragged.value.origin === "collection") {
        collection.value = collection.value.filter(item => item.id !== dragged.value?.id)
      }
      switch (dragged.value.origin) {
          case "goat":
              GOAT.value = GOAT.value.filter(item => item.id !== dragged.value?.id)
            break;
          case 'a': 
              A.value = A.value.filter(item => item.id !== dragged.value?.id)
              break;
          case 'b':
              B.value = B.value.filter(item => item.id !== dragged.value?.id)
              break;
          case 'c':
              C.value = C.value.filter(item => item.id !== dragged.value?.id)
              break;
          case 'd':
              D.value = D.value.filter(item => item.id !== dragged.value?.id)
        }
      switch (dest) {
        case "goat":
          GOAT.value.push({ id: dragged.value.id, src: dragged.value.src })
          break;
        case 'a': 
          A.value.push({ id: dragged.value.id, src: dragged.value.src })
          break;
        case 'b':
          B.value.push({ id: dragged.value.id, src: dragged.value.src })
          break;
        case 'c':
          C.value.push({ id: dragged.value.id, src: dragged.value.src })
          break;
        case 'd':
          D.value.push({ id: dragged.value.id, src: dragged.value.src })
      }
    }
    dragged.value = null
  }

  function moveToCollection() {
      if (dragged.value) {
        switch (dragged.value.origin) {
          case "goat":
              GOAT.value = GOAT.value.filter(item => item.id !== dragged.value?.id)
            break;
          case 'a': 
              A.value = A.value.filter(item => item.id !== dragged.value?.id)
              break;
          case 'b':
              B.value = B.value.filter(item => item.id !== dragged.value?.id)
              break;
          case 'c':
              C.value = C.value.filter(item => item.id !== dragged.value?.id)
              break;
          case 'd':
              D.value = D.value.filter(item => item.id !== dragged.value?.id)
              break;
          case 'collection':
            collection.value = collection.value.filter(item => item.id !== dragged.value?.id)
        }
        
        collection.value.push({ id: dragged.value.id, src: dragged.value.src })
     
      }
      dragged.value = null
  }
  return { GOAT, A, B, C, D, collection, dragged, moveToCategory, moveToCollection }
})
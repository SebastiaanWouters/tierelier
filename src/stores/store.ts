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
    
  const collection = useLocalStorage<{ id: string, src: string}[]>('collection', [{ id: 'monster', src: '/monster-min.jpg'}, { id: 'nalu', src: '/nalu-min.jpg'}])


  function move(dest: string) {
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
  }

  function moveToCollection() {
      if (dragged.value && dragged.value.origin !== "collection") {
        collection.value.push({ id: dragged.value.id, src: dragged.value.src })
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
      }
  }
  return { GOAT, A, B, C, D, collection, dragged, move, moveToCollection }
})
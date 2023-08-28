<script lang="ts">
  import { onMount } from "svelte";
  import { dragged, dropSame, dropTarget, dropzone } from "../dnd";
  import EnergyImage from "./EnergyImage.svelte";
  import { persisted } from "svelte-local-storage-store";
  import { flip } from "svelte/animate";
  import { crossfade } from "svelte/transition";
  const [send, receive] = crossfade({});

  export let tier: string;
  export let color: string;

  const components = persisted<{ id: string; src: string }[]>(tier, []);

  // Initialize the dropzone

  function handleDragStart(item: { id: string; src: string }) {
    $dropTarget = "";
    $dragged = { id: item.id, src: item.src };
  }

  function handleDragEnd() {
    if ($dropTarget === "dropzone") {
      if ($dragged && !$dropSame) {
        removeFirstById($dragged.id);
      }
    }
  }

  function handleDrop() {
    if ($dragged !== null) {
      const id = $dragged.id;
      const src = $dragged.src;
      console.log("drop");
      $dropTarget = "dropzone";
      removeFirstById($dragged.id);
      $components.push({ id, src });
      $components = $components;
      console.log(tier);
    }
  }

  const removeFirstById = (idToRemove: string) => {
    components.update((list) => {
      const indexToRemove = list.findIndex((item) => item.id === idToRemove);

      if (indexToRemove !== -1) {
        $dropSame = true;
        list.splice(indexToRemove, 1);
      } else {
        $dropSame = false;
      }

      return [...list];
    });
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  id="dropzone"
  on:dragover={(e) => {
    e.preventDefault();
  }}
  on:drop={() => {
    handleDrop();
  }}
  class="row"
  style="--tier: '{tier}'; --color: {color}"
>
  {#each $components as item (item.id)}
    <div
      class="imgContainer grab"
      animate:flip={{ duration: 200 }}
      in:receive={{ key: item.id }}
      out:send={{ key: item.id }}
      draggable="true"
      on:dragstart={() => handleDragStart(item)}
      on:dragend={() => handleDragEnd()}
    >
      <EnergyImage src={item.src} id={item.id} />
    </div>
  {/each}
</div>

<style lang="scss">
  .row {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--size-fluid-1);
    border: thin solid var(--surface-3);
    height: 100%;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-gutter: stable;
    padding: 0;

    .imgContainer {
      padding: 0.58rem var(--size-fluid-1);
      display: flex;
      width: fit-content;
      min-width: fit-content;
      height: 100%;
    }
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: #666;
  }

  .row::before {
    color: var(--text-1);
    font-size: var(--size-fluid-3);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    content: var(--tier);
    position: sticky;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    aspect-ratio: var(--ratio-square);
    max-width: 29%;
    background: var(--color);
  }
</style>

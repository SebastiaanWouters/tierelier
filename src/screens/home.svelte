<script lang="ts">
  import { flip } from "svelte/animate";
  import EnergyImage from "../lib/components/EnergyImage.svelte";
  import Row from "../lib/components/Row.svelte";
  import {
    draggable,
    dragged,
    dropSame,
    dropTarget,
    dropzone,
  } from "../lib/dnd";
  import { crossfade, fade } from "svelte/transition";
  import { persisted } from "svelte-local-storage-store";
  const [send, receive] = crossfade({});

  let draggedItem: HTMLElement | null | EventTarget = null;

  const components = persisted<{ src: string; id: string }[]>("remaining", [
    { id: "monster", src: "/public/monster.png" },
    { id: "nalu", src: "/public/nalu.png" },
    { id: "golden", src: "/public/golden.png" },
    { id: "rodeo", src: "/public/rodeo.png" },
    { id: "prime", src: "/public/prime.png" },
    { id: "redbull", src: "/public/redbull.png" },
    { id: "psychik", src: "/public/psychik.png" },
  ]);

  $: counter = 7 - $components.length;

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

<div class="grid">
  <div class="container">
    <div class="top">
      <h2>Energy Drink Tierlist</h2>
      <h2>Gedronken: {counter}</h2>
    </div>

    <div class="table">
      <Row tier="Goat" color="#bf616a" />
      <Row tier="a" color="#d08770" />
      <Row tier="b" color="#ebcb8b" />
      <Row tier="c" color="#a3be8c" />
      <Row tier="Glenn Leys" color="#7b5804" />
    </div>
  </div>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    on:dragover={(e) => {
      e.preventDefault();
    }}
    on:drop={() => {
      if ($dragged !== null) {
        const id = $dragged.id;
        const src = $dragged.src;
        $dropTarget = "dropzone";
        console.log("drop");
        removeFirstById(id);
        $components.push({ id, src });
        $components = $components;
      }
    }}
    class="column"
  >
    {#each $components as item (item.id)}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="imgWrapper grab"
        draggable="true"
        on:dragstart={() => {
          $dropTarget = "";
          $dragged = { id: item.id, src: item.src };
        }}
        on:dragend={(e) => {
          console.log("dragend");
          if ($dropTarget === "dropzone") {
            if ($dragged && !$dropSame) {
              removeFirstById($dragged.id);
            }
          }
        }}
        animate:flip={{ duration: 200 }}
        in:receive={{ key: item.id }}
        out:send={{ key: item.id }}
      >
        <EnergyImage src={item.src} id={item.id} />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: 7fr 2fr;
    height: 100vh;
  }
  .table {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: var(--size-fluid-1);
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: var(--size-fluid-2);
    height: 100%;
    padding: var(--size-fluid-1);

    > h1 {
      font-size: var(--size-fluid-4);
    }
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  .imgWrapper {
    display: flex;
    justify-content: center;
  }
  .column {
    height: 100%;
    width: 100%;
    padding: var(--size-fluid-5) var(--size-fluid-2);
    justify-items: center;
    align-content: start;
    overflow: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media only screen and (max-width: 1600px) {
      grid-template-columns: 1fr 1fr;
    }
    @media only screen and (max-width: 800px) {
      grid-template-columns: 1fr;
    }

    column-gap: var(--size-fluid-1);
    row-gap: var(--size-fluid-3);
    > img {
      width: auto;
      aspect-ratio: auto;
      height: 20vmin;
      padding: var(--size-fluid-1);
    }
  }
  h1 {
    color: var(--text-1);
  }
</style>

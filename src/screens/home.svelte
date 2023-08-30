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
    { id: "boni", src: "/boni_up-min.jpg" },
    { id: "delhaize", src: "/delhaize-min.jpg" },
    { id: "energy_sugar", src: "/energy_drink_sugar-min.jpg" },
    { id: "energy", src: "/energy_drink-min.jpg" },
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
    { id: "redbull_red", src: "/redbull_red-min.jpg" },
    { id: "redbull_summer", src: "/redbull_summer-min.jpg" },
    { id: "redbull_white", src: "/redbull_white-min.jpg" },
    { id: "redbull-min", src: "/redbull-min.jpg" },
    { id: "rockstar_no_sugar", src: "/rockstar_no_sugar-min.jpg" },
    { id: "rockstar_tropical", src: "rockstar_tropical-min.jpg" },
    { id: "rockstar", src: "/rockstar-min.jpg" },
    { id: "rodeo", src: "/rodeo-min.jpg" },
    { id: "tao_organic", src: "/tao_organic-min.jpg" },
    { id: "tao", src: "/tao-min.jpg" },
    { id: "tenzing_raspberry", src: "/tenzing_raspberry-min.jpg" },
    { id: "tenzing", src: "/tenzing-min.jpg" },
  ]);

  let searchTerm = "";

  $: filtered = $components.filter((item) => item.id.includes(searchTerm));

  $: counter = 36 - $components.length;

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
      <h2 class="lg-only">Energy Drink Tierlist</h2>
      <h2>Gedronken: {counter > 10 ? `${counter} - RIP` : counter}</h2>
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
        searchTerm = "";
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
    <input placeholder="zoeken..." bind:value={searchTerm} />
    {#each filtered as item (item.id)}
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
    grid-template-columns: minmax(0, 7fr) min(2fr);
    height: 100vh;

    max-width: 100vw;
    width: 100vw;
  }
  input {
    grid-column: 1/4;
    width: 100%;
    margin: 0.6rem ar(--size-fluid-3);
    padding-block: var(--size-2);
    @media only screen and (max-width: 1600px) {
      grid-column: 1/3;
    }
    @media only screen and (max-width: 1200px) {
      display: none;
    }
  }
  .table {
    max-height: 100%;
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
    flex-shrink: 0;
  }
  .column {
    width: 100%;
    padding: var(--size-fluid-3) var(--size-fluid-2);
    justify-items: center;
    align-content: start;
    overflow-y: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media only screen and (max-width: 1600px) {
      grid-template-columns: 1fr 1fr;
    }
    @media only screen and (max-width: 1200px) {
      grid-template-columns: 1fr;
    }

    column-gap: var(--size-fluid-1);
    row-gap: var(--size-fluid-2);
    > img {
      width: auto;
      aspect-ratio: auto;
      height: 20vmin;
      padding: var(--size-fluid-1);
    }
  }
  h2 {
    color: var(--text-1);
    @media only screen and (max-width: 800px) {
      font-size: var(--size-7);
      white-space: nowrap;
    }
  }
  .lg-only {
    @media only screen and (max-width: 1000px) {
      display: none;
    }
  }
</style>

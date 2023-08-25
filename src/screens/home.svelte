<script lang="ts">
  import { flip } from "svelte/animate";
  import EnergyImage from "../lib/components/EnergyImage.svelte";
  import Row from "../lib/components/Row.svelte";
  import { draggable, dragged, dropTargetId, dropzone } from "../lib/dnd";
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
  ]);
</script>

<div class="grid">
  <div class="container">
    <h1>Energy Drink Tierlist</h1>
    <div class="table">
      <Row tier="Goat" color="#bf616a" />
      <Row tier="a" color="#d08770" />
      <Row tier="b" color="#ebcb8b" />
      <Row tier="c" color="#a3be8c" />
      <Row tier="Lenka M." color="#b48ead" />
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
        $dropTargetId = "dropzone";
        console.log("drop");
        $components.push({ id, src });
        $components = $components;
      }
    }}
    class="column"
  >
    {#each $components as item (item.id)}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="imgWrapper"
        draggable="true"
        on:dragstart={() => {
          $dropTargetId = "";
          $dragged = { id: item.id, src: item.src };
        }}
        on:dragend={(e) => {
          console.log(e.target);
          if ($dropTargetId === "dropzone") {
            $components = $components.filter(
              (comp) => comp.id !== $dragged?.id
            );
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
  }
  .table {
    display: flex;
    flex-direction: column;
    gap: var(--size-fluid-1);
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: var(--size-fluid-2);
    height: 100vh;
    padding: var(--size-fluid-1);

    > h1 {
      font-size: var(--size-fluid-4);
    }
  }
  .imgWrapper {
    max-height: 19vmin;
    display: flex;
    justify-content: center;
  }
  .column {
    height: 100vh;
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

<script lang="ts">
  import Row from "../lib/components/Row.svelte";
  import { draggable } from "../lib/components/dnd";

  let draggedItem: HTMLElement | null | EventTarget = null;
</script>

<div class="grid">
  <div class="container">
    <h1>Energy Drink Tierlist</h1>
    <div class="table">
      <Row tier="s" color="#bf616a" />
      <Row tier="a" color="#d08770" />
      <Row tier="b" color="#ebcb8b" />
      <Row tier="c" color="#a3be8c" />
      <Row tier="d" color="#b48ead" />
      <Row tier="glen leys" color="#7b5804" />
    </div>
  </div>
  <div class="column">
    <img
      use:draggable={"/public/monster.png"}
      src="/public/monster.png"
      alt="monster"
    /><img
      use:draggable={"/public/nalu.png"}
      src="/public/nalu.png"
      alt="monster"
    /><img
      use:draggable={"/public/prime.png"}
      src="/public/prime.png"
      alt="monster"
    /><img
      use:draggable={"/public/rodeo.png"}
      src="/public/rodeo.png"
      alt="monster"
    /><img
      use:draggable={"/public/golden.png"}
      src="/public/golden.png"
      alt="monster"
    />
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
      border: thin solid var(--surface-4);
    }
  }
  h1 {
    color: var(--text-1);
  }
</style>

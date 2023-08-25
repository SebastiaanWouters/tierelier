<script lang="ts">
  import { onMount } from "svelte";
  import { dragged, dropTargetId, dropzone } from "../dnd";
  import EnergyImage from "./EnergyImage.svelte";
  import { persisted } from "svelte-local-storage-store";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import { crossfade } from "svelte/transition";
  import { writable } from "svelte/store";
  const [send, receive] = crossfade({});

  export let tier: string;
  export let color: string;

  const components = persisted<{ id: string; src: string }[]>(tier, []);

  // Initialize the dropzone

  onMount(() => {});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  id="dropzone"
  on:dragover={(e) => {
    e.preventDefault();
  }}
  on:drop={() => {
    if ($dragged !== null) {
      const id = $dragged.id;
      const src = $dragged.src;
      console.log("drop");
      $dropTargetId = "dropzone";
      $components.push({ id, src });
      $components = $components;
    }
  }}
  class="row"
  style="--tier: '{tier}'; --color: {color}"
>
  {#each $components as item (item.id)}
    <div
      class="imgContainer"
      animate:flip={{ duration: 200 }}
      in:receive={{ key: item.id }}
      out:send={{ key: item.id }}
      draggable="true"
      on:dragstart={() => {
        $dropTargetId = "";
        $dragged = { id: item.id, src: item.src };
      }}
      on:dragend={() => {
        if ($dropTargetId === "dropzone") {
          components.update((value) => {
            return value.filter((item) => item.id !== $dragged?.id);
          });
        }
      }}
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
    gap: var(--size-fluid-2);
    border: thin solid var(--surface-3);
    height: var(--size-fluid-6);
    @media only screen and (max-width: 1260px) {
      height: var(--size-fluid-7);
    }
    width: 100%;
    overflow: scroll;
    padding: 0;

    .imgContainer {
      height: 100%;
      padding: 0.6rem var(--size-fluid-1);
    }
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
    top: 0;
    bottom: 0;
    left: 0;
    aspect-ratio: var(--ratio-square);
    height: 100%;
    background: var(--color);
  }
</style>

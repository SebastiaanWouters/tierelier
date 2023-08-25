<script lang="ts">
  import { dropzone } from "../dnd";

  export let tier: string;
  export let color: string;
  export let data: string[] = [];
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div use:dropzone class="row" style="--tier: '{tier}'; --color: {color}">
  {#each data as item}
    <div>{item}</div>
  {/each}
</div>

<style lang="scss">
  .row {
    //padding-left: calc(var(--size-fluid-6) + 1rem);
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
    padding-block: var(--size-fluid-1);
    overflow: scroll;
    padding: 0;
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

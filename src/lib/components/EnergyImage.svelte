<script lang="ts">
  import { fade } from "svelte/transition";
  import { crossfade } from "svelte/transition";
  const [send, receive] = crossfade({});

  export let src: string;
  export let id: string;
</script>

<img {id} {src} alt={id} />

<style>
  img {
    display: block;
    align-self: stretch;
    max-block-size: 14vh;
  }
</style>

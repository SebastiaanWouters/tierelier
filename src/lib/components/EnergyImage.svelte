<script lang="ts">
  import { fade } from "svelte/transition";
  import { crossfade } from "svelte/transition";
  const [send, receive] = crossfade({});

  import { dragged } from "../dnd";
  import { flip } from "svelte/animate";

  export let src: string;
  export let id: string;
</script>

<img {id} {src} alt={id} />

<style>
  img {
    width: auto;
    aspect-ratio: auto;
    height: 100%;
  }
</style>

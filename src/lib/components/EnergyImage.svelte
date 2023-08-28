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
    object-fit: cover;
    display: block;
    max-block-size: 13.3vh;
    min-height: 100%;
    transition: transform 300ms var(--ease-spring-4);
  }
  img:hover {
    filter: drop-shadow(0px 0px 6px var(--surface-3));
    transform: scale(1.1);
  }
  img:active {
    transform: scale(0.95);
  }
</style>

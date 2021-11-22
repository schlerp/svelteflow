<script lang="ts">
  import Canvas from "./Canvas.svelte";
</script>

<main>
  <Canvas />
</main>

<style>
  main {
    height: 100%;
    width: 100%;
  }
  :global(body, html) {
    padding: 0px;
    height: 100%;
    width: 100%;
    /* overflow: hidden; */
  }
  :root {
    --spacing: 8px;
  }
</style>

<script lang="ts">
  import Canvas from "./Canvas.svelte";
  import Theme from "./Theme.svelte";
</script>

<main>
  <Theme />
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

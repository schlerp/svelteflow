<script lang="ts">
  import type { SvelteComponent } from "svelte";

  export let component: SvelteComponent;
  export let props: Object = {};

  let open: boolean = false;

  function handleOpen(): void {
    open = true;
    console.debug("opening overlay");
  }

  function handleClose(): void {
    open = false;
    console.debug("closing overlay");
  }
</script>

<button on:click|preventDefault={handleOpen}>Overlay</button>
<div class="backdrop" on:click={handleClose}>
  <svelte:component this={component} {...props} />
</div>

<script lang="ts">
  import App from "./App.svelte";
  import Canvas from "./Canvas.svelte";

  export let formControls = [
    {
      label: "derp",
      type: "text",
    },
  ];
</script>

<form>
  {#each formControls as formControl}
    <input {...formControl} />
  {/each}
</form>

<script lang="ts">
  import { onMount } from "svelte";
  import type { BrowserJsPlumbInstance } from "@jsplumb/browser-ui";
  import TableForm from "./TableForm.svelte";
  import safeid from "./utils/safeid";

  export let id: string = safeid();
  export let jsPlumbInstance: BrowserJsPlumbInstance;

  let element: HTMLDivElement;

  let table: string;
  let schema: string = "";
  let database: string = "";

  onMount(() => {
    console.debug("Draggable element", element);
    jsPlumbInstance.manage(element);
    jsPlumbInstance.setDraggable(element, true);
  });

  let value: string = "";

  $: console.debug(value);
</script>

<div {id} class="draggableWrapper" bind:this={element}>
  <header>
    {table}
  </header>
  <section>
    <TableForm {jsPlumbInstance} bind:table bind:schema bind:database />
  </section>
  <footer>
    {#if schema !== ""}
      {`[${schema}].[${table}]`}
    {:else}
      {`[${table}]`}
    {/if}
  </footer>
</div>

<style>
  .draggableWrapper {
    position: absolute;
    background-color: white;
    box-shadow: 4px 4px 4px #efefef;
    width: clamp(150px, 300px, 600px);
    user-select: none;
    padding: var(--spacing);
    margin: var(--spacing);
    border-radius: var(--spacing);
    border: 1px solid black;
  }
  header {
    padding: var(--spacing);
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  section {
    padding: var(--spacing);
  }
  footer {
    color: #ccc;
    border-top: 1px solid #ddd;
    text-align: right;
  }
</style>

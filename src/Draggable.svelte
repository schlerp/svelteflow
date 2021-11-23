<script lang="ts">
  import { onMount } from "svelte";
  import type { BrowserJsPlumbInstance } from "@jsplumb/browser-ui";
  import { nanoid } from "nanoid/non-secure";
  import Connectable from "./Connectable.svelte";
  import InputControl from "./InputControl.svelte";
  import ConnectableForm from "./ConnectableForm.svelte";
  import TableForm from "./TableForm.svelte";
  import ColumnControlGroup from "./ColumnControlGroup.svelte";

  export let id: string = nanoid();
  export let content: string = undefined;
  export let headerText: string = undefined;
  export let footerText: string = undefined;
  export let jsPlumbInstance: BrowserJsPlumbInstance;

  let element: HTMLDivElement;

  onMount(() => {
    console.debug("Draggable element", element);
    jsPlumbInstance.manage(element);
    jsPlumbInstance.setDraggable(element, true);
  });

  let value: string = "";

  $: console.debug(value);
</script>

<div {id} class="draggableWrapper" bind:this={element}>
  {#if headerText !== undefined}
    <header>
      {headerText}
    </header>
  {/if}
  {#if content !== undefined}
    <section>
      <!-- {content}
      <Connectable {jsPlumbInstance}>
        <InputControl name="derp" label="derp" bind:value />
      </Connectable>
      <ConnectableForm {jsPlumbInstance} /> -->
      <TableForm {jsPlumbInstance} />
      <!-- <ColumnControlGroup
        columnDefinition={{
          name: "derp",
          isPk: true,
          isNullable: false,
          isUnique: true,
        }}
      /> -->
    </section>
  {/if}
  <slot />
  {#if footerText !== undefined}
    <footer>
      {footerText}
    </footer>
  {/if}
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

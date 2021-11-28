<script lang="ts">
  import { onMount } from "svelte";
  import type { BrowserJsPlumbInstance } from "@jsplumb/browser-ui";
  import type { SvelteComponent } from "svelte/internal";

  export let id: string;
  export let title: string = undefined;
  export let content: string = undefined;
  export let footer: string = undefined;
  export let form: SvelteComponent = undefined;
  export let formContext: Object = undefined;
  export let jsPlumbInstance: BrowserJsPlumbInstance;

  let element: HTMLDivElement;

  onMount(() => {
    jsPlumbInstance.manage(element);
    jsPlumbInstance.setDraggable(element, true);
  });
</script>

<div {id} class="draggableWrapper" bind:this={element}>
  {#if title !== undefined}
    <header>
      {title}
    </header>
  {/if}
  <section>
    <slot />
    {#if content !== undefined}
      {content}
    {/if}
    {#if form !== undefined}
      <svelte:component this={form} bind:formContext {jsPlumbInstance} />
    {/if}
  </section>
  {#if footer !== undefined}
    <footer>
      {footer}
    </footer>
  {/if}
</div>

<style>
  .draggableWrapper {
    position: absolute;
    background-color: white;
    box-shadow: 4px 4px 4px var(--pal-shadow);
    width: clamp(150px, 300px, 600px);
    user-select: none;
    padding: var(--spacing);
    margin: var(--spacing);
    border-radius: var(--spacing);
    border: 1px solid var(--pal-border-hard);
  }
  header {
    padding: var(--spacing);
    text-align: center;
    border-bottom: 1px solid var(--pal-border-soft);
  }
  section {
    padding: var(--spacing);
  }
  footer {
    color: var(--pal-text-soft);
    border-top: 1px solid var(--pal-border-soft);
    text-align: right;
  }
</style>

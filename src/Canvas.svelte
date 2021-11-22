<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { BrowserJsPlumbInstance, newInstance } from "@jsplumb/browser-ui";
  import { nanoid } from "nanoid/non-secure";
  import type { IDraggable, IDragMoveEvent } from "./types";
  import { nodeStore } from "./store";
  import Draggable from "./Draggable.svelte";

  let canvasElement: HTMLDivElement;
  let nodes: IDraggable[] = [];

  let jsPlumbInstance: BrowserJsPlumbInstance;

  onMount(() => {
    const spacing = Number.parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--spacing")
    );
    jsPlumbInstance = newInstance({
      container: canvasElement,
      dragOptions: {
        grid: { w: spacing, h: spacing },
      },
    });
  });

  nodeStore.subscribe((value) => {
    nodes = value;
  });

  const addNode = (event) => {
    const randomId: string = nanoid();
    const options = {
      content: "new element!",
    };
    nodeStore.set([
      ...nodes,
      {
        content: nanoid(),
        id: nanoid(),
        headerText: nanoid(),
        footerText: nanoid(),
      },
    ]);
  };
</script>

<div bind:this={canvasElement} class="canvas">
  {#each nodes as node}
    <svelte:component this={Draggable} {...node} {jsPlumbInstance} />
  {/each}
</div>
<button on:click={addNode}>add element</button>

<style>
  .canvas {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: scroll;
    background-image: linear-gradient(
        transparent calc(var(--spacing) - 1px),
        #eee var(--spacing),
        transparent var(--spacing)
      ),
      linear-gradient(
        90deg,
        transparent calc(var(--spacing) - 1px),
        #eee var(--spacing),
        transparent var(--spacing)
      );
    background-size: 100% var(--spacing), var(--spacing) 100%;
  }
  button {
    position: absolute;
    bottom: var(--spacing);
    right: var(--spacing);
  }
</style>

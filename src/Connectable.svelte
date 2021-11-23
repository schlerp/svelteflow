<script lang="ts">
  import { onMount } from "svelte";
  import type { BrowserJsPlumbInstance } from "@jsplumb/browser-ui";
  import { nanoid } from "nanoid/non-secure";

  export let isSource: Boolean = true;
  export let isTarget: Boolean = true;
  export let id: string = nanoid();
  export let jsPlumbInstance: BrowserJsPlumbInstance;

  let element: HTMLDivElement;

  onMount(() => {
    console.debug("Connectable element", element);
    if (isSource) {
      jsPlumbInstance.addEndpoint(element, {
        endpoint: "Dot",
        anchor: "Right",
        source: true,
        target: false,
        cssClass: "endpointRound",
        hoverClass: "endpointRoundHover",
      });
    }
    if (isTarget) {
      jsPlumbInstance.addEndpoint(element, {
        endpoint: "Rectangle",
        anchor: "Left",
        source: false,
        target: true,
        cssClass: "endpointSquare",
        hoverClass: "endpointSquareHover",
      });
    }
  });
</script>

<div {id} bind:this={element}>
  <slot />
</div>

<style>
  /* endpoint styles */
  :global(.endpointSquare) {
    border: 2px solid #aaa;
  }
  :global(.endpointRound) {
    border: 2px solid #aaa;
    border-radius: 50%;
  }
  :global(.endpointSquareHover) {
    border: 2px solid red;
  }
  :global(.endpointRoundHover) {
    border: 2px solid red;
    border-radius: 50%;
  }
</style>

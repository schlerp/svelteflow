<script lang="ts">
  import { onMount } from "svelte";
  import type { BrowserJsPlumbInstance } from "@jsplumb/browser-ui";
  import safeid from "../utils/safeid";

  export let isSource: Boolean = true;
  export let isTarget: Boolean = true;
  export let id: string;
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
    border: 1px solid var(--pal-border);
  }
  :global(.endpointRound) {
    border: 1px solid var(--pal-border);
    border-radius: 50%;
  }
  :global(.endpointSquareHover) {
    border: 1px solid var(--pal-info);
  }
  :global(.endpointRoundHover) {
    border: 1px solid var(--pal-success);
    border-radius: 50%;
  }
</style>

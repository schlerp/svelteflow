<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import type { BrowserJsPlumbInstance } from "@jsplumb/browser-ui";
  import interact from "interactjs";
  import { nanoid } from "nanoid/non-secure";

  export let id: string = nanoid();
  export let content: string = undefined;
  export let headerText: string = undefined;
  export let footerText: string = undefined;
  export let jsPlumbInstance: BrowserJsPlumbInstance;

  const dispatch = createEventDispatcher();

  let element: HTMLDivElement;
  let x = 0;
  let y = 0;

  onMount(() => {
    jsPlumbInstance.manage(element);
    jsPlumbInstance.setDraggable(element, true);
    jsPlumbInstance.addEndpoint(element, { endpoint: "Dot" });
    // interact(element)
    //   .draggable({
    //     modifiers: [
    //       interact.modifiers.snap({
    //         targets: [interact.snappers.grid({ x: spacing, y: spacing })],
    //         range: Infinity,
    //         relativePoints: [{ x: 0, y: 0 }],
    //       }),
    //       interact.modifiers.restrict({
    //         restriction: "parent",
    //         elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
    //         endOnly: true,
    //       }),
    //     ],
    //     inertia: false,
    //   })
    //   .on("dragmove", function (event) {
    //     x += event.dx;
    //     y += event.dy;

    //     event.target.style.transform = "translate(" + x + "px, " + y + "px)";
    //   })
    //   .on("dragend", function (event) {
    //     const eventData = { id, x: event.dx, y: event.dy };
    //     console.debug("dragend", eventData);
    //     dispatch("dragend", eventData);
    //   });
  });
</script>

<div {id} class="draggableWrapper" bind:this={element}>
  {#if headerText !== undefined}
    <header>
      {headerText}
    </header>
  {/if}
  {#if content !== undefined}
    <section>
      {content}
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

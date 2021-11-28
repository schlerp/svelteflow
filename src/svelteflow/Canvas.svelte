<script lang="ts">
  import type { ConnectionEstablishedParams } from "@jsplumb/core";
  import {
    isITableDefinition,
    isITransformDefinition,
    ITableDefinition,
    ITransformDefinition,
    IEdge,
  } from "./types";
  import { onMount } from "svelte";
  import { BrowserJsPlumbInstance, newInstance } from "@jsplumb/browser-ui";
  import { EVENT_CONNECTION } from "@jsplumb/core";
  import { safeid } from "./utils/safeid";
  import ButtonControl from "./controls/ButtonControl.svelte";
  import Node from "./Node.svelte";
  import TableForm from "./components/TableForm.svelte";
  import TransformForm from "./components/TransformForm.svelte";
  import type { Writable } from "svelte/store";
  import { panElements, setZoom } from "./utils/canvasUtils";

  export let nodeStore: Writable<
    Array<ITableDefinition | ITransformDefinition>
  >;
  export let edgeStore: Writable<IEdge[]>;

  let canvasElement: HTMLDivElement;
  let nodes: Array<ITableDefinition | ITransformDefinition> = [];
  let edges: Array<IEdge> = [];
  let jsPlumbInstance: BrowserJsPlumbInstance;
  let currentZoom: number = 1.0;
  let panPosition: [number, number] = [0, 0];

  nodeStore.subscribe((value) => {
    nodes = value;
  });

  edgeStore.subscribe((value) => {
    edges = value;
  });

  onMount(() => {
    const spacing = Number.parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--spacing")
    );
    jsPlumbInstance = newInstance({
      container: canvasElement,
      dragOptions: {
        grid: { w: spacing, h: spacing },
        cursor: "grabbing",
      },
    });
    jsPlumbInstance.bind(EVENT_CONNECTION, handleConnection);
  });

  function handleConnection(params: ConnectionEstablishedParams) {
    edgeStore.set([...edges, { ...params }]);
  }

  function addNode(newNode: ITableDefinition | ITransformDefinition) {
    let id = safeid();
    nodeStore.set([...nodes, { id, ...newNode }]);
  }

  function addTable() {
    const newTable: ITableDefinition = {
      table: `table_${safeid(6)}`,
      schema: "",
      database: "",
      columns: [],
    };
    addNode(newTable);
  }
  function addTransform() {
    const newTransform: ITransformDefinition = {
      transform: "{col}",
      filter: "1=1",
    };
    addNode(newTransform);
  }

  function handleScroll(event: WheelEvent) {
    if (event.deltaY > 0) {
      currentZoom -= 0.125;
    } else if (event.deltaY < 0) {
      currentZoom += 0.125;
    }
    currentZoom = Math.min(Math.max(0.25, currentZoom), 2);
    setZoom(currentZoom, jsPlumbInstance);
  }

  function handleMouseDown(event: MouseEvent) {
    if (event.target === canvasElement && event.button === 0) {
      event.target.addEventListener("mousemove", handlePanning);
    }
  }

  function handleMouseUp(event: MouseEvent) {
    if (event.target === canvasElement && event.button === 0) {
      event.target.removeEventListener("mousemove", handlePanning);
      panPosition = [0, 0];
    }
  }

  function handlePanning(event: MouseEvent) {
    let el: HTMLDivElement = jsPlumbInstance.getContainer();
    let deltaX = (event.x - panPosition[0]) * (1 / currentZoom);
    let deltaY = (event.y - panPosition[1]) * (1 / currentZoom);
    if (panPosition[0] === 0 && panPosition[1] === 0) {
      [deltaX, deltaY] = [0, 0];
    }
    panElements(el, deltaX, deltaY);
    panPosition = [event.x, event.y];
    jsPlumbInstance.repaintEverything();
  }

  $: console.debug("nodes", nodes);
  $: console.debug("edges", edges);
</script>

<div class="wrapper">
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <div
    bind:this={canvasElement}
    class="canvas"
    on:wheel|preventDefault={handleScroll}
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
    on:mouseout={handleMouseUp}
  >
    {#each nodes as node, idx}
      {#if isITableDefinition(node)}
        <svelte:component
          this={Node}
          form={TableForm}
          bind:formContext={nodes[idx]}
          id={node.id}
          title="Table"
          footer={node.schema !== ""
            ? `[${node.schema}].[${node.table}]`
            : `[${node.table}]`}
          {jsPlumbInstance}
        />
      {:else if isITransformDefinition(node)}
        <svelte:component
          this={Node}
          form={TransformForm}
          bind:formContext={nodes[idx]}
          title="Transform"
          id={node.id}
          {jsPlumbInstance}
        />
      {/if}
    {/each}
  </div>
</div>
<div class="buttonWrapper">
  <ButtonControl handleClick={addTable}>add Table</ButtonControl>
  <ButtonControl handleClick={addTransform}>add Transform</ButtonControl>
</div>

<style>
  .wrapper {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .canvas {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        transparent calc(var(--spacing) - 1px),
        var(--pal-border-light) var(--spacing),
        transparent var(--spacing)
      ),
      linear-gradient(
        90deg,
        transparent calc(var(--spacing) - 1px),
        var(--pal-border-light) var(--spacing),
        transparent var(--spacing)
      );
    background-size: 100% var(--spacing), var(--spacing) 100%;
  }
  .buttonWrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing);
    position: absolute;
    bottom: var(--spacing);
    right: var(--spacing);
  }
</style>

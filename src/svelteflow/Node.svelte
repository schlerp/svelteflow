<script lang="ts">
  import type { SvelteComponent } from "svelte/internal";
  import type { BrowserJsPlumbInstance } from "@jsplumb/browser-ui";
  import Draggable from "./components/Draggable.svelte";

  export let id: string;
  export let title: string = undefined;
  export let content: string = undefined;
  export let footer: string = undefined;
  export let form: SvelteComponent = undefined;
  export let formContext: Object = undefined;
  export let jsPlumbInstance: BrowserJsPlumbInstance;

  $: console.log("Node", formContext);
</script>

<Draggable
  {id}
  {title}
  {content}
  {footer}
  {form}
  bind:formContext
  {jsPlumbInstance}
/>

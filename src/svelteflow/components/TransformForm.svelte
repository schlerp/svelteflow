<script lang="ts">
  import safeid from "../utils/safeid";
  import type { BrowserJsPlumbInstance } from "@jsplumb/browser-ui";
  import InputControl from "../controls/InputControl.svelte";
  import Connectable from "./Connectable.svelte";
  import type { ITransformDefinition } from "../types";

  export let jsPlumbInstance: BrowserJsPlumbInstance;
  export let formContext: ITransformDefinition;
  export let id: string;
</script>

<form {id}>
  <Connectable {id} {jsPlumbInstance}>
    <InputControl
      name="transform"
      type="text"
      label="Transform"
      bind:value={formContext.transform}
    />
  </Connectable>
  <InputControl
    name="filter"
    type="text"
    label="Filter"
    bind:value={formContext.filter}
  />
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing);
  }
</style>

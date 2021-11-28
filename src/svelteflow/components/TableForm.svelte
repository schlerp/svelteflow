<script lang="ts">
  import safeid from "../utils/safeid";
  import type { BrowserJsPlumbInstance } from "@jsplumb/browser-ui";
  import InputControl from "../controls/InputControl.svelte";
  import Connectable from "./Connectable.svelte";
  import type { IColumnDefinition, ITableDefinition } from "../types";
  import ColumnControlGroup from "../controls/ColumnControlGroup.svelte";
  import ButtonControl from "../controls/ButtonControl.svelte";

  export let jsPlumbInstance: BrowserJsPlumbInstance;
  export let formContext: ITableDefinition;

  function handleAddColumn(event: MouseEvent) {
    const id: string = safeid();
    const name: string = `col_${id}`;
    const columnDefinition: IColumnDefinition = {
      id,
      name,
      isPk: false,
      isNullable: false,
      isUnique: false,
    };
    console.debug("adding new column", name);
    // for svelte auto update
    formContext.columns = [...formContext.columns, columnDefinition];
  }

  $: console.debug("TableForm", formContext);
</script>

<form>
  <InputControl
    name="table"
    type="text"
    label="Name"
    bind:value={formContext.table}
  />
  <InputControl
    name="schema"
    type="text"
    label="Schema"
    bind:value={formContext.schema}
  />
  <InputControl
    name="database"
    type="text"
    label="Database"
    bind:value={formContext.database}
  />
  {#each formContext.columns as column, idx}
    <Connectable {jsPlumbInstance} id={column.id}>
      <ColumnControlGroup
        bind:columnDefinition={formContext.columns[idx]}
        id={column.id}
      />
    </Connectable>
  {/each}
  <ButtonControl handleClick={handleAddColumn}>Add Column</ButtonControl>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing);
  }
</style>

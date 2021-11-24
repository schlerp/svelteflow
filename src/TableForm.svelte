<script lang="ts">
  import safeid from "./utils/safeid";
  import type { BrowserJsPlumbInstance } from "@jsplumb/browser-ui";
  import InputControl from "./InputControl.svelte";
  import Connectable from "./Connectable.svelte";
  import type { IColumnDefinition, ITableDefinition } from "./types";
  import { SvelteComponent } from "svelte/internal";
  import ColumnControlGroup from "./ColumnControlGroup.svelte";
  import ButtonControl from "./ButtonControl.svelte";

  export let jsPlumbInstance: BrowserJsPlumbInstance;
  export let table: string = `table_${safeid()}`;
  export let schema: string = "";
  export let database: string = "";
  export let columns: IColumnDefinition[] = [];

  export let tableDefinition: ITableDefinition = {
    table,
    schema,
    database,
    columns,
  };

  function handleAddColumn(event: MouseEvent) {
    const name: string = `col_${safeid()}`;
    const columnDefinition = {
      name,
      isPk: false,
      isNullable: false,
      isUnique: false,
    };
    console.log("adding new column", name);
    // for svelte auto update
    columns = [...columns, columnDefinition];
  }

  $: {
    tableDefinition = {
      table,
      schema,
      database,
      columns,
    };
    console.debug("tableDefinition", tableDefinition);
  }
</script>

<form>
  <InputControl
    name="table"
    type="text"
    label="Table Name"
    bind:value={table}
  />
  <InputControl
    name="schema"
    type="text"
    label="Schema Name"
    bind:value={schema}
  />
  <InputControl
    name="database"
    type="text"
    label="Database Name"
    bind:value={database}
  />
  {#each columns as column}
    <Connectable {jsPlumbInstance}>
      <ColumnControlGroup bind:columnDefinition={column} />
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

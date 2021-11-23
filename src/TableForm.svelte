<script lang="ts">
  import { nanoid } from "nanoid/non-secure";
  import type { BrowserJsPlumbInstance } from "@jsplumb/browser-ui";
  import InputControl from "./InputControl.svelte";
  import Connectable from "./Connectable.svelte";
  import type { IColumnDefinition, ITableDefinition } from "./types";
  import { SvelteComponent } from "svelte/internal";
  import ColumnControlGroup from "./ColumnControlGroup.svelte";

  export let jsPlumbInstance: BrowserJsPlumbInstance;
  export let table: string = `table_${nanoid(8)}`;
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
    const name: string = `col_${nanoid(8)}`;
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
  <button on:click|preventDefault={handleAddColumn}>Add Column</button>
</form>

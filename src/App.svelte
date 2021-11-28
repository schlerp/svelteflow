<script lang="ts">
  import Canvas from "./svelteflow/Canvas.svelte";
  import Theme from "./svelteflow/Theme.svelte";
  import { nodeStore } from "./store";
  import { edgeStore } from "./store";
  import APIClient from "./services/client";
  import type {
    IColumnDefinition2,
    ITableDefinition,
  } from "./svelteflow/types";

  const apiUrl: string = "http://localhost:8321";
  const client = APIClient(apiUrl);

  client.table
    .readall()
    .then((resp) => resp.json())
    .then((json) => {
      nodeStore.update((currentValue) => {
        const translatedJson = Array.from(json as ITableDefinition[]).map(
          (t) => {
            const columns = t.columns.map((col: any) => {
              return {
                id: col.name,
                name: col.name,
                isPK: col.primary_key || false,
                isNullable: col.nullable || false,
                isUnique: col.unique || false,
              };
            });
            return { ...t, schema: t.schema || "", table: t.name, columns };
          }
        );
        return [...currentValue, ...translatedJson];
      });
    });

  nodeStore.subscribe((nodes) => {
    // nodes.forEach((node) => {
    //   client.table.create(node);
    // });
  });
</script>

<main>
  <Theme />
  <Canvas {nodeStore} {edgeStore} />
</main>

<style>
  main {
    height: 100%;
    width: 100%;
  }
  :global(body, html) {
    padding: 0px;
    height: 100%;
    width: 100%;
  }
</style>

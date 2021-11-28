import { writable } from "svelte/store";
import type {
  ITableDefinition,
  ITransformDefinition,
} from "./svelteflow/types";

export let nodeStore = writable<Array<ITableDefinition | ITransformDefinition>>(
  []
);

nodeStore.subscribe((value) => {
  console.debug("nodeStore Updated!", value);
});

export let edgeStore = writable([]);

edgeStore.subscribe((value) => {
  console.debug("edgeStore Updated!", value);
});

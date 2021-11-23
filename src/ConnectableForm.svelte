<script lang="ts">
  import type { IFormField } from "./types";
  import type { BrowserJsPlumbInstance } from "@jsplumb/browser-ui";
  import InputControl from "./InputControl.svelte";
  import Connectable from "./Connectable.svelte";
  console.debug("connectableForm");

  export let jsPlumbInstance: BrowserJsPlumbInstance;

  export let formFields: IFormField[] = [
    {
      type: "text",
      label: "Field 1",
      name: "f1",
      value: "field 1",
      disabled: false,
    },
    {
      type: "number",
      label: "Field 2",
      name: "f2",
      value: 11,
      disabled: false,
    },
    {
      type: "password",
      label: "Field 3",
      name: "f3",
      value: "secret",
      disabled: false,
    },
    {
      type: "text",
      label: "Field 4",
      name: "f4",
      value: "field 4",
      disabled: true,
    },
    {
      type: "checkbox",
      label: "Field 5",
      name: "f5",
      value: true,
      disabled: false,
    },
  ];

  $: console.debug(formFields);
</script>

<form>
  {#each formFields as field, idx (field.name)}
    {#if field.connectable === false}
      <InputControl
        name={formFields[idx].name}
        label={formFields[idx].label}
        type={formFields[idx].type}
        disabled={formFields[idx].disabled}
        bind:value={formFields[idx].value}
      />
    {:else}
      <Connectable {jsPlumbInstance}>
        <InputControl
          name={formFields[idx].name}
          label={formFields[idx].label}
          type={formFields[idx].type}
          disabled={formFields[idx].disabled}
          bind:value={formFields[idx].value}
        />
      </Connectable>
    {/if}
  {/each}
</form>

<style>
  form {
    /* background-color: grey; */
  }
</style>

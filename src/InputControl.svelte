<script lang="ts">
  import { nanoid } from "nanoid/non-secure";
  import type { IInputType } from "./types";

  export let name: string = nanoid();
  export let type: IInputType = "text";
  export let label: string = name;
  export let disabled: boolean = false;
  export let value: string | number | boolean;

  const groupId: string = `group_${name}`;
  const labelId: string = `label_${name}`;
  const controlId: string = `control_${name}`;

  console.debug(name, label, type, typeof value, disabled);
</script>

<div id={groupId}>
  <label id={labelId} for={controlId}>{label}</label>
  {#if type === "text" && typeof value === "string"}
    <input id={controlId} {name} type="text" bind:value {disabled} />
  {:else if type === "password" && typeof value === "string"}
    <input id={controlId} {name} type="password" bind:value {disabled} />
  {:else if type === "email" && typeof value === "string"}
    <input id={controlId} {name} type="email" bind:value {disabled} />
  {:else if type === "number" && typeof value === "number"}
    <input id={controlId} {name} type="number" bind:value {disabled} />
  {:else if type === "checkbox" && typeof value === "boolean"}
    <input
      id={controlId}
      {name}
      type="checkbox"
      bind:checked={value}
      {disabled}
    />
  {/if}
</div>

<style>
  div {
    border: 1px solid #aaa;
    border-radius: var(--spacing);
    position: relative;
    margin-top: calc(2 * var(--spacing));
  }
  input {
    width: calc(100% - calc(2 * var(--spacing)));
    margin: var(--spacing);
    border: none;
    outline: none;
  }
  label {
    color: #444;
    position: absolute;
    transform: translate(calc(2 * var(--spacing)), calc(-1.5 * var(--spacing)));
    padding-left: calc(var(--spacing) / 2);
    padding-right: calc(var(--spacing) / 2);
    background-color: white;
  }
</style>

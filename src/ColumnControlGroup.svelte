<script lang="ts">
  import { nanoid } from "nanoid/non-secure";
  import type { IColumnDefinition } from "./types";

  export let columnDefinition: IColumnDefinition;
  export let disabled: boolean = false;
  let id: string = nanoid();
</script>

<div class="wrapper">
  <div class="grow">
    <label for={`name_${id}`} class="textLabel">
      Column: {columnDefinition["name"]}
    </label>
    <input
      id={`name_${id}`}
      type="text"
      name="name"
      bind:value={columnDefinition["name"]}
      {disabled}
    />
  </div>
  <div class="noGrow">
    <input
      id={`isPk_${id}`}
      type="checkbox"
      name="isPk"
      bind:checked={columnDefinition["isPk"]}
    />
    <label for={`isPk_${id}`}>P</label>
    <span class="tooltip">Primary Key?</span>
  </div>
  <div class="noGrow">
    <input
      id={`isNullable_${id}`}
      type="checkbox"
      name="isNullable"
      bind:checked={columnDefinition["isNullable"]}
    />
    <label for={`isNullable_${id}`}>N</label>
    <span class="tooltip">Nullable?</span>
  </div>
  <div class="noGrow">
    <input
      id={`isUnique_${id}`}
      type="checkbox"
      name="isUnique"
      bind:checked={columnDefinition["isUnique"]}
    />
    <label for={`isUnique_${id}`}>U</label>
    <span class="tooltip">Unique?</span>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: row;
    width: calc(100% - var(--spacing));
    border: 1px solid #aaa;
    border-radius: var(--spacing);
    position: relative;
    margin-top: calc(2 * var(--spacing));
    padding-right: var(--spacing);
  }
  .tooltip {
    position: absolute;
    display: none;
    left: calc(100% + var(--spacing));
    white-space: nowrap;
    background-color: #444;
    color: #fafafa;
    z-index: 10;
    text-align: center;
    border-radius: var(--spacing);
    padding: var(--spacing);
    width: fit-content;
  }
  .grow {
    flex-grow: 1;
  }
  .noGrow {
    flex-grow: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: calc(var(--spacing) / 2);
    position: relative;
  }
  div.noGrow:hover .tooltip {
    display: inline;
  }
  input {
    width: 100%;
    margin: calc(var(--spacing) / 2);
    border: none;
    outline: none;
  }
  input[type="text"] {
    padding: var(--spacing);
  }
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"] + label {
    color: #ddd;
    border-radius: calc(var(--spacing) / 2);
    padding: calc(var(--spacing) / 2);
    box-shadow: #ccc 2px 2px 3px;
  }
  label.textLabel {
    color: #444;
    position: absolute;
    transform: translate(1em, -0.6em);
    padding-left: calc(var(--spacing) / 2);
    padding-right: calc(var(--spacing) / 2);
    background-color: white;
    overflow: hidden;
    max-width: 20ch;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  input:checked + label {
    color: #444;
    box-shadow: #ccc 1px 1px 2px;
  }
</style>

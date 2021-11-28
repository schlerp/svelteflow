<script lang="ts">
  export let handleClick: svelte.JSX.MouseEventHandler<HTMLButtonElement> =
    () => {};
</script>

<button on:click|preventDefault={handleClick}>
  <slot />
</button>

<style>
  button {
    background-color: var(--pal-info);
    color: var(--pal-text-light);
    border-radius: var(--spacing);
    padding: var(--spacing);
  }
</style>

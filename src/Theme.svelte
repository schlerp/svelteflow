<style>
  :root {
    /* ========= COLOUR PALETTE ========= */
    /* from: https://coolors.co/227c9d-17c3b2-ffcb77-fef9ef-fe6d73 */
    --cg-blue: #227c9dff;
    --light-sea-green: #17c3b2ff;
    --maximum-yellow-red: #ffcb77ff;
    --floral-white: #fef9efff;
    --light-coral: #fe6d73ff;

    --pal-info: var(--cg-blue);
    --pal-light: var(--floral-white);
    --pal-success: var(--light-sea-green);
    --pal-warning: var(--maximum-yellow-red);
    --pal-error: var(--light-coral);

    /* ========= SPACING ========= */
    --spacing: 8px;
    --spacing-small: 4px;
  }

  /* ========= CSS RESETS ========= */
  :global(button, input[type="submit"], input[type="reset"]) {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
</style>

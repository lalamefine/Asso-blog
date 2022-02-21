<script>
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from 'fontawesome-svelte';
  export let icon;
  export let type = '';
  library.add(icon);
</script>


<button type={type}>
  <FontAwesomeIcon icon={icon} />
</button>

<style>
  button{
    background: none;
    border:none;
    transition-duration: 500ms;
  }
  button:hover{
    cursor: pointer;
    background-color: var(--primary-color);
    color: var(--secondary-color);
    border-radius: 50px;
  }
</style>
<script lang="ts">
  export var icon = null;
  export var href = "#";
	import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from 'fontawesome-svelte';
	import { page } from '$app/stores';
  if(icon) library.add(icon)
</script>

<li class:active={$page.url.pathname === '/'}>
  <a href={href} on:click>
    {#if icon}
      <div class="icon">
        <FontAwesomeIcon icon={icon} />
      </div>
    {/if}
    <slot></slot>
  </a>
</li>

<style>
  .icon{
    margin: 0px 2px;
    font-size: 1rem;
  }
	li {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	li.active {
		/* text-decoration: underline; */
		color: var(--tertiary-color);
	}
	a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}
	a:hover {
		color: var(--primary-color);
		background: var(--secondary-color);
	}
</style>
<script>
	import { library } from '@fortawesome/fontawesome-svg-core';
	import { FontAwesomeIcon } from 'fontawesome-svelte';
	import { createEventDispatcher } from 'svelte';
	export let icon = null;
	export let discrete = false;
	export let style = '';
	export let type = '';
	const dispatch = createEventDispatcher();
	if (icon) library.add(icon);
</script>

<button {type} on:click={() => dispatch('click')} class:discrete {style}>
	{#if icon}
		<FontAwesomeIcon {icon}/>
	{/if}
	<slot />
</button>

<style>
	button {
		background-color: var(--primary-color);
		color: var(--secondary-color);
		border: none;
		transition-duration: 250ms;
		border-radius: 50px;
		padding: 0.2rem 0.5rem;
	}
	button:hover {
		cursor: pointer;
		background-color: var(--accent-color);
		color: white;
		transition-duration: 50ms;
		box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.2);
	}
	button:active {
		cursor: pointer;
		background-color: var(--accent-color);
		color: white;
		box-shadow: inset 0 2px 0 0 rgba(255, 255, 255, 0.5);
	}
	.discrete{
		color: #3333;
		background-color: transparent;
	}
	.discrete:hover{
		color: var(--accent-color);
		background-color: var(--primary-color);
	}
</style>

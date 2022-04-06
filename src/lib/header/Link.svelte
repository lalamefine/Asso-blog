<script lang="ts">
	export var icon = null;
	export var href = '#';
	import { library } from '@fortawesome/fontawesome-svg-core';
	import { FontAwesomeIcon } from 'fontawesome-svelte';
	import { page } from '$app/stores';
	if (icon) library.add(icon);
</script>

<li>
	<a {href} on:click class:active={$page.url.pathname == href}>
		{#if icon}
			<div class="icon">
				<FontAwesomeIcon {icon} />
			</div>
		{/if}
		<slot />
	</a>
</li>

<style>
	.icon {
		margin: 0px 2px;
		font-size: 1.5rem;
	}
	li {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0.5em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 1.1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
		border-top: 0 solid transparent;
		border-bottom: 0 solid var(--primary-color);
		transition-duration: 250ms;
	}

	a:hover,
	a.active {
		height: 80%;
		text-decoration: none;
		color: var(--accent-color);
		padding: 0 0.5em;
		border-top: 0.5em solid transparent;
		border-bottom: 0.5em solid var(--accent-color);
	}
</style>

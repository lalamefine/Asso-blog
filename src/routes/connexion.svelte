<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Connexion from '$lib/account/Connexion.svelte';
	import Inscription from '$lib/account/Inscription.svelte';
</script>

<svelte:head>
	<title>Connexion</title>
</svelte:head>

<section>
	<div class="padder">
		<Connexion />
	</div>
	<hr />
	<div class="padder">
		<Inscription />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	@media (min-width: 720px) {
		section {
			flex-direction: row;
		}
		hr {
			display: none;
		}
	}

	hr {
		width: 250px;
		height: 1px;
		background-color: rgba(0, 0, 0, 0.2);
		border: none;
	}

	.padder {
		padding: 20px;
	}
</style>

<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Connexion from '$lib/Account/Connexion.svelte';
	import Inscription from '$lib/Account/Inscription.svelte';

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<Connexion />
	<hr />
	<Inscription />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	hr{
		width: 250px;
		height: 1px;
		background-color: rgba(0, 0, 0, 0.2);
		border: none;
	}
</style>

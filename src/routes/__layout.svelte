<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<p style="color:white;">Développé par Louis Triboulin</p>
</footer>

<style>
	main {
		flex: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 3rem 1rem 1rem 1rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column-reverse;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>

<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Input from '$lib/Input.svelte';

	let password = '';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	TestInput: <Input id='test' label='Test' name='test' bind:value={password}/>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>

<script>
	import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
	import FAButton from '$lib/tools/FAButton.svelte';
	import Input from '$lib/tools/Input.svelte';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';

	let submitted = false;
	let error = '';

	let email = '';
	let password = '';
	let nom = '';
	let prenom = '';

	function handleSubmit(e) {
		e.preventDefault();
		submitted = true;
		error = '';
		fetch('/account/inscription', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password,
				nom,
				prenom
			})
		})
			.then((res) => {
				if (res.status === 200) {
					res.json().then((data) => {
						session.set({ user: data.item });
						goto('/');
					});
				} else {
					error = 'Une erreur est survenue';
				}
			})
			.catch((err) => {
				error = 'Une erreur est survenue';
			});
	}
</script>

<form class="wrapper" class:submitted on:submit|preventDefault={handleSubmit}>
	<div class="row">
		<h2>Inscription</h2>
		<FAButton type="submit" icon={faArrowRightLong} />
	</div>
	<br/>
	{#if error}
		<div class="row">
			<p class="error">{error}</p>
		</div>
	{/if}
	<Input placeholder="Nom" id="i-nom" name="nom" bind:value={nom} />
	<Input placeholder="Prénom" id="i-prenom" name="prenom" bind:value={prenom} />
	<Input placeholder="Email" id="i-email" name="email" bind:value={email} />
	<Input
		placeholder="Password"
		id="i-password"
		name="password"
		type="password"
		bind:value={password}
	/>
</form>

<style>
	.wrapper {
		transition-duration: 250ms;
		opacity: 0.7;
	}
	.wrapper:hover,
	.wrapper:focus-within {
		opacity: 1;
	}
</style>

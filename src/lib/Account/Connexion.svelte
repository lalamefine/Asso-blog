<script>
	import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons/faArrowRightLong';
	import FAButton from '$lib/tools/FAButton.svelte';
	import Input from '$lib/tools/Input.svelte';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	let submitted = false;
	let error = '';

	let email = '';
	let password = '';

	function handleSubmit(e) {
		e.preventDefault();
		submitted = true;
		error = '';
		fetch('/account/connexion', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		})
			.then((res) => {
				if (res.status === 200) {
					res.json().then((data) => {
						session.set({ user: data.item });
						goto('/');
					});
				} else if(res.status === 404) {
					error = 'Email ou mot de passe incorrect';
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
		<h2>Connexion</h2>
		<FAButton type="submit" icon={faArrowRightLong} />
	</div>
	{#if error}
		<div class="row">
			<p class="error">{error}</p>
		</div>
	{/if}
	<br/>
	<Input placeholder="Email" id="email" name="email" bind:value={email} />
	<Input
		placeholder="Password"
		id="password"
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

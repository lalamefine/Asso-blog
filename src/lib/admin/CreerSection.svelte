<script>
	import Input from '$lib/tools/Input.svelte';
	import FaButton from '$lib/tools/FAButton.svelte';

	var name = '';
	let submitted = false;
	let error = '';

	function handleSubmit(e) {
		e.preventDefault();
		submitted = true;
		error = '';
		if (name.length < 3) {
			error = '3 characters minimum';
		}else if(name.length > 25
		){
			error = '25 characters maximum';
		}else if(!submitted){
			error = ''
			fetch('/section/creer', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name
				})
			})
			.then((res) => {
				if (res.status === 200) {
					res.json().then((data) => window.location.href = '/s/' + name);
				} else error = 'Une erreur est survenue';
			})
			.catch((err) => {
				error = 'Une erreur est survenue';
			});
		}
	}
</script>

<section>
	<h4>Créer une section</h4>
	<div class="expandable">
		<p>
			Les sections correspondent aux liens dans la barre de navigation. <br />
			Chacune section contenant un ou plusieurs post.
		</p>
		<form method="POST" on:submit|preventDefault={handleSubmit}>
			<Input bind:value={name} name="nom" placeholder="Nom de la section à créer" />

			<FaButton type="submit">Créer</FaButton>
		</form>
		{#if error}
			<p class="error">{error}</p>
		{/if}	
	</div>
</section>

<style>
	form {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.error{
		color: red;
	}
	.expandable{
		max-height: 0;
		overflow: hidden;
		transition: 0.25s ease-in-out;
	}
	section:hover .expandable{
		max-height: 100vh;
		overflow: hidden;
	}
</style>

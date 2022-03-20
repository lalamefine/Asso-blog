<script lang="ts">
	import Input from '$lib/tools/Input.svelte';
	import FaButton from '$lib/tools/FAButton.svelte';
	import TextEditor from '$lib/tools/TextEditor.svelte';
	import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import { scale } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import FileUpload from '$lib/tools/FileUpload.svelte';

	export var post = {
		id: null,
		title:'',
		content:'',
		sectionName:'',
		authorId: null,
		published: false,
		pictures: [],
		shape: '%title% [content] %pictures(2,n)%',
	};	

	var sectionOptions = ['[Nouvelle section]'];
	onMount(()=>{
		fetch('/section/list')
		.then(res=>res.json())
		.then(res=>{
			sectionOptions = res.map(s=>s.name);
			sectionOptions.push('[Nouvelle section]');
		})
	});

	let error = '';
	let success = '';
	let newSectionName = '';
	let action = post.id ? 'update' : 'create';

	function handleSubmit(e) {
		e.preventDefault();
		error = '';
		if(post.title.length < 1) {
			error = 'Le titre est obligatoire';
		}else{
			if(post.sectionName == '[Nouvelle section]') {
				sectionOptions.push(newSectionName);
				post.sectionName = newSectionName;
			}
			post.authorId = $session['user'].id;
			console.log('submit: ', post);
			fetch(action == 'create'?'/post':'/post/'+post.id+'/__data.json', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(post)
			})
			.then((res) => {
				if (res.ok) {
					if(action=='create') {
						res.json().then((data) => goto('/post/' + data.id));
					}else{
						success = 'Enregistrement effectué';
						setTimeout(() => {
							success = '';
						}, 5000);
					}
				} else error = 'Une erreur est survenue';
			})
			.catch((err) => {
				error = 'Une erreur est survenue';
			});
		}
	}

	function handleDelete(e){
		e.preventDefault();
		error = '';
		fetch('/post/'+post.id+'/__data.json', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(function (res){
			if (res.ok) {
				alert('Suppression effectuée');
				 goto('/');
			} else error = 'Une erreur est survenue';
		})
	}

</script>
<br/>
{#if error}
	<p class="error" transition:scale="{{duration: 500}}">{error}</p>
{:else if success}
	<p class="success"  transition:scale="{{duration: 500}}">{success}</p>
{/if}	
<form method="POST" on:submit|preventDefault={handleSubmit}>
	<h1><Input bind:value={post.title} name="titre" placeholder="Titre" /></h1>
	<section>
			<div class="row">
				<div>Section : </div>
				<Input type='select' bind:value={post.sectionName} bind:selectOptions={sectionOptions} ></Input>
				{#if post.sectionName=='[Nouvelle section]'}
					<Input placeholder='Nom de la section à créer' bind:value={newSectionName} />
				{/if}
				<div class="pad-right">
					<input type="checkbox" bind:checked={post.published} id="visible">
					<label for="visible">Visibilité publique</label>
				</div>
				<div class="pad-right">
					<FaButton type="submit">Enregistrer</FaButton>
				</div>
				{#if action == 'update'}
					<FaButton on:click={handleDelete} icon={faTrashCan}></FaButton>
				{/if}
			</div>
			<TextEditor bind:html={post.content}/>
	</section>
	<FileUpload bind:pictures={post.pictures} />
</form>

<style>
	.pad-right{
		padding-right: 1em;
	}
	input[type="checkbox"]:hover{
		background: var(--accent-color);
	}
	input[type="checkbox"]:checked{
		background: var(--primary-color);
	}
	.row{
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
	}
  section{
    width: 70vw;
		padding: 0;
  }
	form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0 5px;
		border-left: 1px solid rgba(128, 128, 128, 0.288);
		border-right: 1px solid rgba(128, 128, 128, 0.288);
	}
	h2{
		text-align: center;
		font-weight: bold;
		font-size: 1.5rem;
		color: var(--accent-color);
	}
	.error{
		color: red;
	}
	.success{
		color: green;
	}
</style>

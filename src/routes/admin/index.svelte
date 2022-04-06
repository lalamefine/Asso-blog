<script lang="ts">
import { goto } from '$app/navigation';

	import { scale } from 'svelte/transition';
  export let sections;
  
  var error;
  var success;

	function handleDelete(e, post){
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
				goto('/admin');
			} else error = 'Une erreur est survenue';
		})
	}

</script>

<svelte:head>
  <title>Administration</title>
</svelte:head>
<h1>Gestion du contenu</h1>

{#if error}
	<p class="error" transition:scale="{{duration: 500}}">{error}</p>
{:else if success}
	<p class="success"  transition:scale="{{duration: 500}}">{success}</p>
{/if}	

{#if sections}
  {#each sections as section}
  <div class="section">
    <h3>{section.name}</h3>
    <table>
      <thead>
        <tr>
          <th>Article</th>
          <th>Auteur</th>
          <th>Date</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each section.posts as post}
          <tr>
            <td>{post.title} </td>
            <td>{post.author.nom} {post.author.prenom} </td>
            <td>{post.createdAt}</td>
            <td><a href="/post/{post.id}">Modifier</a></td>
            <td><a href="#loading" on:click="{(e) => handleDelete(e, post )}">Supprimer</a></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/each}
{:else}
  <div class="text-center"></div> Aucune section Trouvée
{/if}

<style>
  th{
    background-color: var(--primary-color);
    color: var(--secondary-color);
  }
  h1{
    text-align: center;
    margin-top: 2rem;
    color: var(--primary-color);
  }
  h3{
    text-align: center;
    margin: 0.5rem 0;
    color: var(--accent-color);
  }
  table {
    width: 100%;
  }
  .section {
    margin-top: 0.5em;
    width: 100%;
    max-width: 80vw;
    background-color: var(--secondary-color);
  }
  tbody tr:hover{
    background-color: var(--heading-color);
  }
</style>
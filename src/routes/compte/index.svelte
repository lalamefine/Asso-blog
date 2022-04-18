<script lang="ts">
import { goto } from "$app/navigation";

import Input from "$lib/tools/Input.svelte";


  export let users;

  let options = ['Administrateur','Rédacteur','Aucun'];
  function saveChanges(user){
    fetch('/account/'+user.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(r => r.json())
    .then(r => {
      if(r.error){
        alert(r.error);
      }
    });
  }

</script>

<svelte:head>
  <title>Administration</title>
</svelte:head>

<h1>Gestion des comptes</h1>

<div class="section">
  <table>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Email</th>
        <th>Privilèges</th>
      </tr>
    </thead>

    
    <tbody>
      {#each users as user}
        <tr>
          <td>{user.nom}</td>
          <td>{user.prenom}</td>
          <td>{user.email}</td>
          <td>
            <Input type='select' bind:value={user.privilege} bind:selectOptions={options} on:change={()=> saveChanges(user)}></Input>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>


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
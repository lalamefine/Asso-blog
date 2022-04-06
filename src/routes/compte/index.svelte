<script lang="ts">
  export let users;
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
          {#if user.userLevel >= 10}
            <td>Administrateur</td>
          {:else if user.userLevel >= 5}
            <td>Rédacteur</td>
          {:else}
            <td>-</td>
          {/if}
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
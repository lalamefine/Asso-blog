<script>
  import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
  import FAButton from '$lib/FAButton.svelte'
  import Input from '$lib/Input.svelte';
  
	let submitted = false;
	let error = '';

  let email = '';
  let password = '';

	function handleSubmit(e) {
    e.preventDefault();
    submitted = true;
    error = '';
    fetch('/api/account/connexion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => {
      if (res.status === 200) {
        window.location.href = '/';
      } else {
        error = 'Une erreur est survenue';
      }
    }).catch(err => {
      error = 'Une erreur est survenue';
    });
  }
</script>

<form class="wrapper" class:submitted on:submit|preventDefault={handleSubmit}>
  <div class="row">
    <h2>Connexion</h2>
    <FAButton type="submit" icon={faArrowRightLong} />
  </div>
  <Input placeholder="Email" id="email" name="email" bind:value={email} />
  <Input placeholder="Password" id="password" name="password" type="password" bind:value={password} />
  
</form>

<style>
  .wrapper {
    transition-duration: 250ms;
    opacity: 0.7;
  }
  .wrapper:hover, .wrapper:focus-within {
    opacity: 1;
  }
</style>
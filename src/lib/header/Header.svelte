<script lang="ts">
	import { library } from '@fortawesome/fontawesome-svg-core';
  import { faArrowRightFromBracket, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from 'fontawesome-svelte';

	library.add(faArrowRightFromBracket);
	library.add(faCirclePlus);

	import { page, session } from '$app/stores';
	let user = $session['user']??{};
  let connected = $session['user'] != null;
  let isAdmin = ( user['userLevel'] ?? 0 ) >=10;

	const disconnect = () => {
		document.cookie = 'token=; Max-Age=-99999999;'; 
		window.location.href = '/';
	};

</script>

<header>
	<nav>
		<ul class="bar">
			<li class:active={$page.url.pathname === '/'}>
				<a sveltekit:prefetch href="/">Accueil</a>
			</li>
			{#if isAdmin}
				<li>
					<a href="/nouvelleCategorie"><FontAwesomeIcon icon={faCirclePlus} /></a>
				</li>
			{/if}
		</ul>
		<ul>
			<a sveltekit:prefetch href="/">
				<img class="icon" src="/favicon.png" alt="SvelteKit" />
			</a>
		</ul>
		<ul class="bar">
			{#if connected}
				<li class:active={$page.url.pathname === '/compte'}>
					<a sveltekit:prefetch href="/compte">{$session['user']['nom']} {$session['user']['prenom']}</a>
				</li>
				<li>
					<a href="/" on:click={disconnect} ><FontAwesomeIcon icon={faArrowRightFromBracket} /></a>
				</li>
			{:else}
				<li class:active={$page.url.pathname === '/connexion'}>
					<a sveltekit:prefetch href="/connexion">Connexion</a>
				</li>
			{/if}
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: center;
	}

	img.icon{
		position: relative;
		height: 100%;
		object-fit: contain;
	}

	nav {
		margin: 5px;
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	ul {
		position: relative;
		padding: 0px 10px;
		margin: 0 5px 0 0;
		height: 2em;
	}
	ul.bar {
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
		border-radius: 5px;;
	}

	li {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	li.active {
		background: var(--tertiary-color);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}
</style>

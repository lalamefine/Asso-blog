<script lang="ts">
  import { faArrowRightFromBracket, faCirclePlus,faCircleUser } from '@fortawesome/free-solid-svg-icons';

	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
import Link from './Link.svelte';

	let user = $session['user'];
  let connected = $session['user'] != null;
  let isAdmin = $session['user'] ? (( $session['user'].userLevel ?? 0 ) >=10) : false;
	session.subscribe( function (u) { 
		user = u['user'];
		connected = u['user'] != null;
		isAdmin = u['user'] ? (( u['user'].userLevel ?? 0 ) >=10) : false;
	})

	const disconnect = () => {
		console.log('You have been disconnected');
		document.cookie = 'token=; Max-Age=-99999999;'; 
		session.set({ user: null });
		goto('/');
	};

</script>

<header>
	<nav>
		<ul class="bar">
			<Link href="/">
				<img class="icon" src="/favicon.png" alt="SvelteKit" />
			</Link>
			<Link href="/">Acceuil</Link>
			{#if isAdmin}
				<Link href="/nouvelleCategorie" icon={faCirclePlus}/>
			{/if}
			<li class="spacer"></li>
			{#if connected}
				<Link href="/compte" icon={faCircleUser}/>
				<Link href="/" on:click={disconnect} icon={faArrowRightFromBracket}/>
			{:else}
				<Link href="/connexion" icon={faCircleUser}/>
			{/if}
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		background: var(--primary-color);
	}
	img.icon{
		position: relative;
		height: calc(100% - 6px);
		padding: 3px 3px;
		object-fit: contain;
	}
	nav {
		display: flex;
		height: 2rem;
		width: 100vw;
	}
	@media (min-width: 768px) {
		nav {
			padding: 0 10vw;
		}
	}
	ul {
		display: flex;
		list-style: none;
		position: relative;
		padding: 0px 0px;
		margin: 0 0 0 0;
		height: 100%;
		width: 100%;
	}
	.spacer{
  	flex-grow: 1;
	}
</style>

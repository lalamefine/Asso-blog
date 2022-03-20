<script lang="ts">
	import {
		faArrowRightFromBracket,
		faArrowRightToBracket,
		faCirclePlus,
		faCircleUser,
		faGear
	} from '@fortawesome/free-solid-svg-icons';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import Link from './Link.svelte';
	import { onMount } from 'svelte';
	import { assets } from '$app/paths';

	let connected = $session['user'] != null;
	let isAdmin = $session['user'] ? ($session['user'].userLevel ?? 0) >= 10 : false;
	session.subscribe(function (u) {
		connected = u['user'] != null;
		isAdmin = u['user'] ? (u['user'].userLevel ?? 0) >= 10 : false;
	});

	const disconnect = () => {
		console.log('You have been disconnected');
		document.cookie = 'token=; Max-Age=-99999999;';
		session.set({ user: null });
		goto('/');
	};

	var sections = [];
	onMount(() => {
		fetch('/section/list')
			.then((r) => r.json())
			.then((s) => {
				sections = s;
			});
	});
</script>

<header>
	<nav>
		<ul class="bar">
			<Link href="/">
				<img class="icon" src='/images/favicon.png' alt="logo" />
			</Link>
			{#each sections as section}
				<Link href="/s/{section.name}">{section.name}</Link>
			{/each}
			{#if isAdmin}
				<Link href="/post/creer" icon={faCirclePlus} />
			{/if}
			<li class="spacer" />
			{#if isAdmin}
				<Link href="/admin" icon={faGear} />
			{/if}
			{#if connected}
				<Link href="/compte" icon={faCircleUser} />
				<Link href="#" on:click={disconnect} icon={faArrowRightFromBracket} />
			{:else}
				<Link href="/connexion" icon={faArrowRightToBracket} />
			{/if}
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		border-bottom: 3px solid white;
		background-color: var(--header-color);
		position: fixed;
		margin-bottom: 5px;
		width: 100vw;
	}
	img.icon {
		position: relative;
		height: calc(100% - 6px);
		padding: 3px 3px;
		object-fit: contain;
	}
	nav {
		display: flex;
		height: 2.5rem;
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
	.spacer {
		flex-grow: 1;
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<ul>
			<a sveltekit:prefetch href="/">
				<img class="icon" src="/favicon.png" alt="SvelteKit" />
			</a>
		</ul>
		<ul class="bar">
			<li class:active={$page.url.pathname === '/'}>
				<a sveltekit:prefetch href="/">Home</a>
			</li>
			<li class:active={$page.url.pathname === '/about'}>
				<a sveltekit:prefetch href="/about">About</a>
			</li>
			<li class:active={$page.url.pathname === '/account'}>
				<a sveltekit:prefetch href="/account">Compte</a>
			</li>
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
		margin: 0;
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

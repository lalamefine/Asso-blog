<script lang="ts">
	import FaButton from "$lib/tools/FAButton.svelte";
	import { faTimes } from "@fortawesome/free-solid-svg-icons";
	export let visible = false;
	export let title = '';
</script>

<div id="overlay" class:visible on:click|self={() => (visible = false)}>
	<div id="fenetre">
		<div class="header">
			<div class="title">{title}</div>
			<FaButton icon={faTimes} on:click={() => (visible = false)}/>
		</div>
		<div class="content"><slot>Overlay fenetre</slot></div>
	</div>
</div>

<style>
	.header {
		padding: 8px;
		padding-left: 20px;
		display: flex;
		justify-content: space-between;
    background-color: var(--primary-color);
	}
	.title {
		font-weight: bold;
	}
  .content {
    padding: 5px;
  }
	#overlay {
		position: absolute; /* Sit on top of the page content */
		display: none; /* Hidden by default */
		width: 100%; /* Full width (cover the whole page) */
		height: 100%; /* Full height (cover the whole page) */
		justify-content: center;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.25); /* Black background with opacity */
		z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
	}
	.visible {
		display: flex !important;
	}
	#fenetre {
		position: absolute;
		width: 50%;
		margin-top: 10vh;
		background-color: white;
		color: black;
		box-shadow: 0px 0px 10px #888888;
	}
</style>

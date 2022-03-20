<script lang="ts">
	export let name = '';
	export let value;
	export let id = name;
	export let selectOptions = [];
	export let placeholder = '';
	export let type = 'text';
	export let required = false;

	export let inputRef = null;

	function setType(node) {
		node.type = type;
	}
</script>

<div class={'flexgrow '+$$props.class}>
	{#if type == 'select'}
		<select {name} {id} {required} {placeholder} bind:value bind:this={inputRef} >
			{#each selectOptions as option}
				<option selected={value==option}>{option}</option>
			{/each}
		</select>
	{:else}
		<input use:setType {name} {id} {required} {placeholder} bind:value bind:this={inputRef} />

	{/if}
</div>

<style>
	.flexgrow{
		flex-grow: 1;
	}
	input, select {
		width: calc(100% - 10px);
		border-radius: 5px;
		background-color: transparent; /* rgba(255, 255, 255, 0.45); */
		padding: 2px 5px;
		outline: none;
		margin-bottom: 2px;
		/* transition-duration: 250ms; */
		border: none;
		border-bottom: 1px solid var(--primary-color);
		margin-top: 1px;
		margin-bottom: 1px;
	}

	input:focus, select:focus {
		border: none;
		margin: 0px;
		border-bottom: 2px solid var(--accent-color);
		border-top: 1px solid #0001;
	}
</style>

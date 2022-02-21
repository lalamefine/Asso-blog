<script>
	export let name;
	export let value;
	export let id = name;
	export let placeholder = '';
	export let type = 'text';
	export let required = false;

	export let inputRef = null;

	function setType(node) {
		node.type = type;
	}
</script>

<div class={$$props.class}>
    <input
      use:setType
      {name}
      {id}
      {required}
      placeholder={placeholder}
      bind:value
      bind:this={inputRef}
    />
</div>

<style>

input {
  border: 0px ;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.45);
  padding: 2px 5px;
	outline: none;
  margin-bottom: 4px;
  transition-duration: 250ms;
  border: 1px solid transparent;
}

input:focus{
  border: 1px solid var(--primary-color);
}
</style>
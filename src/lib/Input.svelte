<script>
	export let value = '';
	export let id;
	export let label;
	export let type = 'text';
	export let name;
	export let required = false;

	export let inputRef = null;

	function setType(node) {
		node.type = type;
	}
</script>

<div class={$$props.class}>
  <div class="wrapper">
    <input
      use:setType
      {name}
      {id}
      {required}
      bind:value
      bind:this={inputRef}
      class=""
    />
    <label for={id} class="label-name">
      <span class="content-name">
        {label}
      </span>
    </label>
  </div>
</div>

<style>

.wrapper {
  position: relative;
  height: 60px;
  overflow: hidden;
}

.wrapper input {
  width: 100%;
  height: 100%;
  color: #fff;
  padding-top: 20px;
  border: none;
  background-color: #fff;
}

.wrapper label {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-bottom: 1px solid white;
}

.wrapper label::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-bottom: 3px solid var(--primary-color);
  transform: translateX(-100%);
  transition: all 0.3s ease;
}

.content-name {
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding-bottom: 5px;
  transition: all 0.3s ease;
}

.wrapper input:focus {
  outline: none;
}
.wrapper input:focus + .label-name .content-name,
.wrapper input:valid + .label-name .content-name {
  transform: translateY(-150%);
  font-size: 14px;
  left: 0px;
  color: var(--primary-color);
}
.wrapper input:focus + .label-name::after,
.wrapper input:valid + .label-name::after {
  transform: translateX(0%);
}

</style>

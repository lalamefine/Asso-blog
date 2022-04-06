<script lang="ts">
  export let pic;
</script>
<!-- {#if pic.data}
  <img class="pic" src="{pic.data}" alt="{pic.name}"/>
{:else} -->
  <img class="pic" src="{pic.tumbnailData}" alt="{pic.name}" on:click/>
<!-- {/if} -->
<style>
  .pic {
    height: calc(100% - 0.7rem - 2px);
    margin: 0.35rem;
    border: 1px solid #0000;
    border-radius: 0.2rem;
  }
  .pic:hover {
    border: 1px solid var(--accent-color);
    cursor: pointer;
  }
</style>
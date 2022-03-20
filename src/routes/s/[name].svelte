<script lang="ts">
  import Post from "$lib/Post.svelte";
  export var section;
</script>

<div class="column">
  {#if section}
    {#each section.posts as post}
        <Post {post} />
    {/each}
  {/if}
</div>

<style>
  .column {
    margin: 1rem 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    align-content: center;
    width: 100%;
    height: 100%;
  }
</style>
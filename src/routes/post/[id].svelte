<script lang="ts">
  import ArticleEditor from "$lib/admin/ArticleEditor.svelte";

  export let post;
</script>

<div class="center">
    <ArticleEditor bind:post/>
</div>

<style>
  .center {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
</style>
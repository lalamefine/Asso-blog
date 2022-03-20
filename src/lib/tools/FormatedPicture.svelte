<script lang="ts">
  export let pic;
</script>

<img class="pic" src="{pic.data}" alt="{pic.name}" />

<style>
  .pic {
    height: calc(100%-1rem);
    padding: 0.5rem;
  }
</style>
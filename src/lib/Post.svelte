<script lang="ts">
  export var post;
  import FAButton from '$lib/tools/FAButton.svelte';
  import { faPencil } from '@fortawesome/free-solid-svg-icons';
	import { session } from '$app/stores';
  import { goto } from '$app/navigation';
  import FormatedPicture from './tools/FormatedPicture.svelte';
import Gallery from './Gallery.svelte';
	let canedit = $session['user'] ? ($session['user'].userLevel ?? 0) >= 10 : false;
	session.subscribe(function (u) {
		canedit = u['user'] ? (u['user'].userLevel ?? 0) >= 5 : false;
	});
  
</script>
<div class=wrapper>
  <div class="post">
    <h2>
      {post.title}
      {#if canedit}
        <span class='hideifoutside'>
          <FAButton icon={ faPencil } on:click={()=>goto('/post/'+post.id)} discrete />
        </span>
      {/if}
    </h2>
    {#if post.pictures.length >0}
      <Gallery pictures={post.pictures} />
    {/if}
    <section>
      <p>{@html post.content}</p>
    </section>

  </div>
</div>

<style>
  h2{
    color: var(--primary-color);
    padding-left: 2rem;
    padding-bottom: 3px;
    border-bottom: 1px solid #ddd;
  }
  section{
    width: 100%;
    margin-bottom: 1rem;
  }
  .post{
		width: 1024px;
  }
  @media screen and (max-width: 1050px){
    .post{
      width: 95%;
    }
  }
  .wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hideifoutside{
    opacity: 0;
  }
  .post:hover .hideifoutside{
    opacity: 1;
  }
</style>
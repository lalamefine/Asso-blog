<script lang="ts">
import { onDestroy, onMount } from "svelte";
import { null_to_empty } from "svelte/internal";

  import FormatedPicture from "./tools/FormatedPicture.svelte";
  export let pictures;

  var loop;
  onMount(function () {
    document.onmousemove = function (event) {
      var mouse = {x: event.clientX, y: event.clientY};
      var content = document.getElementById('content');
      var gallery = document.getElementById('gallery');
      var galleryRect = gallery.getBoundingClientRect();      
      var normalizedTranslation = (galleryRect.left + galleryRect.width/2 - mouse.x) / galleryRect.width;
      normalizedTranslation = Math.min(0.5, Math.max(-0.5, 1.2*normalizedTranslation));
      var translation = normalizedTranslation * (content.scrollWidth - galleryRect.width);
      // console.log('normalized :' + normalizedTranslation , 'converted' + translation);
      // if mouse inside gallery
      if (mouse.x > galleryRect.left && mouse.x < galleryRect.right && mouse.y > galleryRect.top && mouse.y < galleryRect.bottom) {
        
        if(gallery.clientWidth < content.scrollWidth) {
          content.style.transform = 'translateX(' + translation + 'px)';
        }
      }
    }
  });
  onDestroy(function () {
    clearInterval(loop);
  });

  
  let oppened = false;
  let selected = null;
  async function open(s){
    console.log('open'+s);
    selected = s;
    oppened = true;
    pictures[selected] = await fetch("/fullsizepicture/" + pictures[selected].id).then(async (res) => (await res.json()).pic);
    pictures = pictures;
    console.log(pictures);
  }
</script>

<div id="gallery">
  <div id="content" style="transform: translateX(0px);">
    {#each pictures as pic, i}
      <FormatedPicture {pic} on:click={()=>open(i)}/>
    {/each}
  </div>
</div>
{#if oppened}
  <div class="fullscreen" on:click={()=>oppened = false}>
    {#if pictures[selected].data}
      <img src="{pictures[selected].data}" alt="{pictures[selected].name}" style="min-height: 80vh;"/>
    {:else}
      <img src="{pictures[selected].tumbnailData}" alt="{pictures[selected].name}" />
    {/if}
  </div>
{/if}


<style>

  #gallery {
    margin-top: 5px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  #content {
    height: 20vh;
    display: flex;
  }
  .fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
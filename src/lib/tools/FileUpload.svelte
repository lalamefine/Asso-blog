<script lang="ts">
	export let pictures = [];
    let fileinput;
    import {faFileImage} from '@fortawesome/free-solid-svg-icons';
    import FaButton from './FAButton.svelte';
    import FormatedPicture from './FormatedPicture.svelte';
    import convert from 'image-file-resize';
	
    function onFileSelected(e) {
        const files = e.currentTarget.files;
        Object.keys(files).forEach(i => {
            const file = files[i];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async (e) => {
                var compressed = await resizeImage(e.target.result, file.type, 300, 300);
                pictures = [...pictures, {
                    name: file.name,
                    data: e.target.result,
                    tumbnailData: compressed,
                }]
            }
        })
    };

    
async function resizeImage(data, type, max_width, max_height) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Set the image once loaded into file reader
        var img = document.createElement("img");
        img.src = data;
        await new Promise(resolve => img.onload = resolve);
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var width = img.width;
        var height = img.height;
        console.log(width, height);

        if (width > max_width) {
            height *= max_width / width;
            width = max_width;
        }
        if (height > max_height) {
            width *= max_height / height;
            height = max_height;
        }
        
        canvas.width = width;
        canvas.height = height;
        console.log(width, height);
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        var r = canvas.toDataURL(type);
        return r;
    } else {
        console.error('The File APIs are not fully supported here.');
    }
}
	
</script>

<div id="app">
    <div class="container">
    {#each pictures as picture}
        <div class="picturewrapper picture">
            <FormatedPicture pic={picture}></FormatedPicture>
            <!-- <img class="picture" src="{picture}" alt="d" /> -->
        </div>
    {/each}
    <div class=picturewrapper>
        <FaButton type="button" discrete icon={faFileImage} on:click={()=>{fileinput.click();}} style="font-size:4rem; width: 130px; height: 130px;">+</FaButton>
        <input style="display:none" type="file" accept=".jpg, .jpeg, .png" multiple
            on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
        </div>
    </div>
</div>
<style>
	#app{
	    display:flex;
		align-items:center;
		justify-content:center;
		flex-flow:column;
    }
    .container{
        display:flex;
        flex-flow:row wrap;
        max-width: 70vw;
    }
    .picturewrapper{
		height:150px;
		width:150px;
		display:flex;
        align-items:center;
        justify-content:center;
        overflow: hidden;
        margin: 5px;
    }
    .picture{
        background-color: var(--secondary-color);
    }
</style>
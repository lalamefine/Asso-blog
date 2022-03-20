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
            // convert({ 
            //     file: file,  
            //     width: 60, 
            //     height: 40, 
            //     type: 'jpeg'
            //     }).then(resp => {
            //         console.log("ok");
            //         pictures.push({
            //             file: resp,
            //             name: file.name,
            //             type: file.type,
            //             lastModified: file.lastModified
            //         });
            //     }).catch(error => {
            //         console.log(error);
            // })
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                pictures = [...pictures, {
                    name: file.name,
                    data: e.target.result,
                }]
            }
        })
    };
	
</script>

<div id="app">
    <div class="container">
    {#each pictures as picture}
        <div class=picturewrapper>
            <FormatedPicture pic={picture}></FormatedPicture>
            <!-- <img class="picture" src="{picture}" alt="d" /> -->
        </div>
    {/each}
    <div class=picturewrapper>
        <FaButton type="button" discrete icon={faFileImage} on:click={()=>{fileinput.click();}} style="font-size:4rem; width: 130px; height: 130px;"></FaButton>
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
        background-color: rgb(173, 173, 173);
		display:flex;
        align-items:center;
        justify-content:center;
        overflow: hidden;
        margin: 5px;
    }
</style>
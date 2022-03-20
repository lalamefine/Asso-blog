<script lang="ts">
  import Editor from "cl-editor/src/Editor.svelte"

  export var html = ''
  let actions = [
    'b', 'i', 'u', 'h1', 'h2', 'p', 'blockquote', 
    'ol', 'ul', 'hr', 'left', 'right', 'center', 'justify', 'a', 'viewHtml'
  ]
  let height= '50vh'
</script>
<Editor {html} {actions} {height} on:change={(evt)=>html = evt.detail}/>
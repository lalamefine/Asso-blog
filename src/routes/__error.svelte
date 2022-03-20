<script context="module">
  /** @type {import('@sveltejs/kit').ErrorLoad} */
  export function load({ error, status }) {
    return {
      props: {
        title: 'Erreur '+status,
        message: error.message,
        stack: error.stack
      }
    };
  }
</script>

<script>
  export let title;
  export let message;
  export let stack;
</script>

<h1>{title}</h1>
<br/>
<h4>{message}</h4>
<br/>
<h5>Stack trace : </h5>
<section>
  <pre>{stack}</pre>
</section>

<style>
  section{
    font-size: 10px;;
  }
  h1{
    color: red;
  }
</style>

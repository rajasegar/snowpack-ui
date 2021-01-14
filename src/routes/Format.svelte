<script>
  import Terminal from '../Terminal.svelte';
  import Navbar from '../Navbar.svelte';

  let term;
</script>
<div class="layout-grid">
<Navbar/>
<main>
<h1>Format code </h1>
<p>Format your project code using Prettier</p>
<p>
  <button type="button" class="button button-primary"  on:click={() => term.execute('npm run format\r\n')}>Start Format</button>
  </p>
  <Terminal task="format" bind:this={term}/>
</main>

</div>

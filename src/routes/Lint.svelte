<script>
  import Terminal from '../Terminal.svelte';
  import Navbar from '../Navbar.svelte';

  let term;
</script>
<div class="layout-grid">
<Navbar/>
<main>
<h1>Lint Project</h1>
<p>Check for lint errors in your project using Prettier</p>
<p>
  <button type="button" class="button button-primary"  on:click={() => term.execute('npm run lint\r\n')}>Start Lint</button>
  </p>
  <Terminal task="lint" bind:this={term}/>
</main>

</div>

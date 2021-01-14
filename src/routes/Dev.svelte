<script>
  import Terminal from '../Terminal.svelte';
  import Navbar from '../Navbar.svelte';

  let term;
</script>
<div class="layout-grid">
<Navbar/>
<main>
<h1>Dev Page</h1>
<p>
  <button type="button" class="button-primary" on:click={() => term.execute('npm start\r\n')}>snowpack dev</button>
  <button type="button" on:click={() => term.execute('npm run build\r\n')}>snowpack build</button>
  </p>
  <Terminal task="serve" bind:this={term}/>
</main>

</div>

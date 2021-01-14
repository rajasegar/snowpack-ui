<script>
  import Terminal from '../Terminal.svelte';
  import Navbar from '../Navbar.svelte';

  let term;
</script>
<div class="layout-grid">
<Navbar/>
<main>
<h1>Development Server</h1>
<p>Start your dev server by running <strong>snowpack dev</strong></p>
<p>
  <button type="button" class="button-primary" on:click={() => term.execute('npm start\r\n')}>Start Server</button>
  </p>
  <Terminal task="serve" bind:this={term}/>
</main>

</div>

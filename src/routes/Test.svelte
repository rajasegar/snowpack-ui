<script>
  import Terminal from '../Terminal.svelte';
  import Navbar from '../Navbar.svelte';

  let term;
</script>
<div class="layout-grid">
<Navbar/>
<main>
<h1>Run Tests</h1>
<p>Run your project test suite using <a href="https://github.com/modernweb-dev/web/tree/master/packages/test-runner">web-test-runner</a>.
<p>
  <button type="button" class="button button-primary" on:click={() => term.execute('npm test\r\n')}>Start Tests</button>
  </p>
  <Terminal task="test" bind:this={term}/>
</main>

</div>

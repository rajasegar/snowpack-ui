<script>
  import Terminal from '../Terminal.svelte';
  import Navbar from '../Navbar.svelte';
  import Tooltip from '../Tooltip.svelte';
  import SpeedData from '../SpeedData.svelte';

  let term;

  let buildAssets = [];
  let isBuildComplete = false;

  function buildComplete(message) {
    if(message && message.data) {
      if(message.data.includes('Build Complete!')) {
        fetch('/assets').then(res => res.json())
          .then(data => {
            buildAssets = data;
            isBuildComplete = true;
        });
      }
    }
  }


</script>
<div class="layout-grid">
<Navbar/>
<main>
<h1>Build Project</h1>
<p>Build your project using <strong>snowpack build</strong>.</p>
<p>
  <button type="button" class="button button-primary" on:click={() => term.execute('npm run build\r\n')}>Build Project</button>
  </p>
  <Terminal task="build" bind:this={term} callback={buildComplete}/>
  <div id="build-assets">
    {#if isBuildComplete}

  <table class="assets-table">
    <thead>
      <th>Asset Name</th>
      <th>Size</th>
      <th>gzipped</th>
      <th>Download Time</th>
    </thead>
    <tbody>
      {#each buildAssets as i}
        <tr>
          <td>{i.name}</td>
          <td>{i.size}</td>
          <td>{i.gzipSize}</td>
          <td>
              <Tooltip  side="right" title="Show">
                <SpeedData items={i.speeds}/>
              </Tooltip>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
    {:else}
      <h3>Building assets, please wait...</h3>
    {/if}
  </div>
</main>

</div>

<style>
  h3 {
    margin: 1em;
    text-align:center;
  }

  .assets-table {
    padding: 1em;
    margin-top: 1em;
    border-collapse: collapse;
  }

  .assets-table td {
    padding: 0.25em 0.5em;
    border: 1px solid var(--primary);
  }
</style>

<script>
  import { onMount } from 'svelte';

  import Terminal from '../Terminal.svelte';
  import Navbar from '../Navbar.svelte';
  let term;

  let project = {
    projectPath: '',
    dependencies: {}
  };

  onMount(() => {

fetch('/project').then(res => res.json())
      .then(response => {
        project = response;
        
      });
  });
</script>

<div class="grid-wrapper">
  <Navbar/>
<main>
  <h1>Snowpack UI </h1>
  <p>{project.projectPath}</p>
  <h2>Dependencies:</h2>
  <ul>
    {#each Object.keys(project.dependencies) as d}
      <li>{d}</li>
    {/each}
  </ul>
  <p>
  <button type="button" on:click={() => term.execute('npm start\r\n')}>snowpack dev</button>
  <button type="button" on:click={() => term.execute('npm run build\r\n')}>snowpack build</button>
  </p>
  <Terminal task="serve" bind:this={term}/>

</main>
</div>

<style>
  .grid-wrapper {
    display: grid;
    grid-template-columns: 200px 1fr;
  }

  main {
    padding: 1em;
  }
</style>

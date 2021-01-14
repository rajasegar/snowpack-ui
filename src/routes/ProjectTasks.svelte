<script>
  import { onMount } from 'svelte';
  import Terminal from '../Terminal.svelte';
  import Navbar from '../Navbar.svelte';

  let term;

  let project = {
    scripts: {}
  };

  let currentTask;
  let currentScript = 'snowpack dev';

onMount(() => {
    fetch('/project').then(res => res.json())
      .then(response => {
        project = response;
      });
  });

  function runTask() {
    term.execute(`npm run ${currentTask}\r\n`);
  }

  function updateScript() {
    currentScript = project.scripts[currentTask];
  }
</script>
<div class="layout-grid">
<Navbar/>
<main>
<h1>Project Tasks</h1>
<p>
<select bind:value={currentTask} on:change={updateScript}>
  {#each Object.keys(project.scripts) as s}
    <option>{s}</option>
  {/each}
</select>
<span>  :   {currentScript}</span>
</p>
<p>
  <button type="button" class="button-primary" on:click={runTask}>Run Task</button>
  </p>
  <Terminal task="project-tasks" bind:this={term}/>
</main>

</div>


<style>
  select {
    width: 200px;
  }
</style>

<script>
  import { onMount } from 'svelte';

  import Navbar from '../Navbar.svelte';

  let project = {
    projectPath: '',
    dependencies: {}
  };

  onMount(() => {

    console.
fetch('/project').then(res => res.json())
      .then(response => {
        project = response;
        
      });
  });
</script>

<div class="layout-grid">
  <Navbar/>
<main>
  <p>Project path: {project.projectPath}</p>
  <h2>Dependencies:</h2>
  <ul>
    {#each Object.keys(project.dependencies) as d}
      <li>{d}</li>
    {/each}
  </ul>

</main>
</div>


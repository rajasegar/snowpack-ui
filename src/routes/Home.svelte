<script>
  import { onMount } from 'svelte';

  import Navbar from '../Navbar.svelte';

  let project = {
    projectPath: '',
    dependencies: {},
    devDependencies: {
      snowpack: '0.0.0'
    }
  };

  onMount(() => {

    var paramsString = location.search;
    var searchParams = new URLSearchParams(paramsString);
    fetch(`/project?projectPath=${searchParams.get('projectPath')}`).then(res => res.json())
      .then(response => {
        project = response;
      });
  });
</script>

<div class="layout-grid">
  <Navbar/>
<main>
  <p>Project path: {project.projectPath}</p>
  <p>Snowpack version: <strong>{project.devDependencies['snowpack']}</strong></p>
  <h2>Dependencies:</h2>
  <ul>
    {#each Object.keys(project.dependencies) as d}
      <li>{d}</li>
    {/each}
  </ul>
  <h2>Dev Dependencies:</h2>
  <ul>
    {#each Object.keys(project.devDependencies) as d}
      <li>{d}</li>
    {/each}
  </ul>

</main>
</div>


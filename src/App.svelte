<script>
  import { Router, Link, Route, navigate } from 'svelte-routing';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  import Home from './routes/Home.svelte';
  import Init from './routes/Init.svelte';
  import Dev from './routes/Dev.svelte';
  import Build from './routes/Build.svelte';
  import NewProject from './routes/NewProject.svelte';
  import Format from './routes/Format.svelte';
  import Lint from './routes/Lint.svelte';
  import Test from './routes/Test.svelte';
  import Install from './routes/Install.svelte';
  import ProjectTasks from './routes/ProjectTasks.svelte';

  export let url;

  function runDev() {
    console.log('snowpack dev');
  }
 
  function runBuild() {
    console.log('snowpack build');
    command = 'npm run';
    task = 'dev';
    fetch('/build').then(res => res.json())
      .then(response => {
        console.log(response);
      });
  }

  onMount(() => {
    fetch('/project').then(res => res.json())
      .then(response => {
        if(response.projectPath) {
        } else {
          navigate(`/new-project?cwd=${response.cwd}`, { replace: true });
        }
      });

  });

</script>

  <Router url="{url}">
    <div>
    <Route path="init" component="{Init}" />
    <Route path="dev" component="{Dev}" />
    <Route path="build" component="{Build}" />
    <Route path="lint" component="{Lint}" />
    <Route path="test" component="{Test}" />
    <Route path="format" component="{Format}" />
    <Route path="project-tasks" component="{ProjectTasks}" />
    <Route path="new-project" component="{NewProject}" />
    <Route path="install" component="{Install}" />
    <Route path="/"><Home /></Route>
  </div>
</Router>

<style>
</style>

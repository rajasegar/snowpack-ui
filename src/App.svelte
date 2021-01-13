<script>
  import Terminal from './Terminal.svelte';
  import { onMount } from 'svelte';

  let command;
  let task;
  let callback;
  onMount(() => {
  });

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

</script>

<div class="grid-wrapper">
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/init">Init</a></li>
      <li><a href="/dev">Dev</a></li>
      <li><a href="/build">Build</a></li>
    </ul>
  </nav>
<main>
  <h1>Snowpack UI </h1>
  <p>
  <button type="button" on:click={runDev}>snowpack dev</button>
  <button type="button" on:click={runBuild}>snowpack build</button>
  </p>
  <Terminal command={command} task={task} callback={callback}/>

</main>
</div>

<style>
  .grid-wrapper {
    display: grid;
    grid-template-columns: 200px 1fr
  }

  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

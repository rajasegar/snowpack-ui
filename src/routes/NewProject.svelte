<script>
  import Terminal from '../Terminal.svelte';
  import { navigate } from 'svelte-routing';

  let term;

  let name;
  let template;
  let packageManager;
  let showForm = true;

  const appTemplates = [
    {
      name: 'React',
      value: '@snowpack/app-template-react'
    },
    {
      name: 'React-TypeScript',
      value: '@snowpack/app-template-react-typescript'
    },
    {
      name: 'Preact',
      value: '@snowpack/app-template-preact'
    },
    {
      name: 'Preact',
      value: '@snowpack/app-template-preact-typescript'
    },
    {
      name: 'Svelte',
      value: '@snowpack/app-template-svelte'
    },
    {
      name: 'Svelte-TypeScript',
      value: '@snowpack/app-template-svelte-typescript'
    },
    {
      name: 'Vue',
      value: '@snowpack/app-template-vue'
    },
    {
      name: 'Vue-TypeScript',
      value: '@snowpack/app-template-vue-typescript'
    },
    {
      name: 'Blank',
      value: '@snowpack/app-template-blank'
    },
    {
      name: 'Blank-TypeScript',
      value: '@snowpack/app-template-blank-typescript'
    },
    {
      name: '11ty',
      value: '@snowpack/app-template-11ty'
    },
    {
      name: 'lit-element',
      value: '@snowpack/app-template-lit-element'
    },
    {
      name: 'lit-element-TypeScript',
      value: '@snowpack/app-template-lit-element-typescript'
    },
  ];

  function createProject() {
    let command;
    if(packageManager === 'npm') {
      command = `create-snowpack-app ${name} --template ${template}\r\n`; 
    } else {
      command = `create-snowpack-app ${name} --template ${template} --use-${packageManager}\r\n`;
    }

    term.execute(command);
  }

  function projectCreated(message) {
    if(message && message.data) {
    if(message.data.includes('Success!')) {
      showForm = false;
    }
  }
  }

  function gotoProject() {
    navigate(`/?project=${name}`);
  }
</script>

<div class="new-page">
<h1>Create New Snowpack Project</h1>
<div class="grid-wrapper">
  <div class="left-col">
    {#if showForm }
<form>
  <p>
  <label>Project Name:</label>
  <input type="text" bind:value={name}/>
  </p>
  <p>
  <label>Template:</label>
  <select bind:value={template}>
    {#each appTemplates as t}
      <option value={t.value}>{t.name}</option>
    {/each}
  </select>
  </p>
  <p>
  <label>Package Manager:</label>
  <select bind:value={packageManager}>
    <option value="npm">npm</option>
    <option value="yarn">yarn</option>
    <option value="pnpm" selected>pnpm</option>
  </select>
  </p>
  <p>
  <button type="button" class="button-primary" on:click={createProject}>Create Project</button>
  </p>
</form>
    {:else}

  <button type="button" class="button-primary" on:click={gotoProject}>Take me to Project page</button>
    {/if}
  </div>
  <div class="right-col">
    <Terminal task="new-project" bind:this={term} callback={projectCreated}/>
  </div>
</div>
</div>

<style>
   .new-page {
    background: var(--light-blue);
    padding: 1em;
    height: 100vh;
   }
  .grid-wrapper {
    display: grid;
    grid-template-columns: 300px 1fr;
  }

  .left-col {
    padding: 1em;
  }

  .right-col {
    padding: 1em;
  }
</style>

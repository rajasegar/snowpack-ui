<script>
  import Terminal from '../Terminal.svelte';
  import { navigate } from 'svelte-routing';
  import appTemplates from '../appTemplates';

  let term;

  let name;
  let template;
  let customTemplate;
  let packageManager;
  let showForm = true;
  let showCustomTemplate = false;



  function createProject() {
    let command;
    const _template = template === 'other' ? customTemplate : template;
    if(packageManager === 'npm') {
      command = `create-snowpack-app ${name} --template ${_template}\r\n`; 
    } else {
      command = `create-snowpack-app ${name} --template ${_template} --use-${packageManager}\r\n`;
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
    var paramsString = location.search;
    var searchParams = new URLSearchParams(paramsString);
    navigate(`/?projectPath=${searchParams.get('cwd')}/${name}`);
  }

  function updateTemplate() {

    if(template === 'other') {
      showCustomTemplate = true;
    } else {
      showCustomTemplate = false;
    }
  }
</script>

<main class="new-page">
<h1>Create New Snowpack Project</h1>
    {#if showForm }
<form>
  <div class="form-layout">
  <div>
  <label for="txtProjectName">Project Name:</label>
  <input id="txtProjectName" type="text" bind:value={name} autofocus/>
  </div>
  <div>
  <label for="lstTemplates">Template:</label>
  <select id="lstTemplates" bind:value={template} on:change={updateTemplate}>
    {#each appTemplates as t}
      <option value={t.value}>{t.name}</option>
    {/each}
  </select>
  </div>
    {#if showCustomTemplate}
  <div>
  <label for="txtTemplateName">Template Name:</label>
  <input id="txtTemplateName" type="text" bind:value={customTemplate} autofocus/>
  </div>
    {/if}
  <div>
  <label for="lstPackMan">Package Manager:</label>
  <select id="lstPackMan" bind:value={packageManager}>
    <option value="npm">npm</option>
    <option value="yarn">yarn</option>
    <option value="pnpm" selected>pnpm</option>
  </select>
  </div>
  </div>
  <button type="button" class="button-primary btn-new-project" on:click={createProject}>Create Project</button>
</form>
    {:else}

  <button type="button" class="button-primary btn-new-project" on:click={gotoProject}>Take me to Project page</button>
    {/if}
    <Terminal task="new-project" bind:this={term} callback={projectCreated}/>
</main>

<style>
   .new-page {
    height: 100vh;
   }
  .form-layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding-left: 1em;
  }

  h1 {
    text-align:center;
    margin:.5em 0;
  }

  .btn-new-project {
    padding: 0.5em 2em;
    font-size: 1.5em;
    display: block;
    margin: 1em auto;
  }

</style>

<script>
  import Terminal from '../Terminal.svelte';
  import Navbar from '../Navbar.svelte';

  let term;
  let name;
  let dev;

  function installPackage() {
    const _dev = dev ? '--save-dev' : '';
    const command = `npm install ${name} ${_dev}\r\n`;
    term.execute(command);
  }
</script>
<div class="layout-grid">
<Navbar/>
<main>
<h1>Install dependencies</h1>
<p>Install project dependencies from here</p>
<p>
<label for="txtName">Package Name:</label>
<input type="text" id="txtName" bind:value={name}/>
<label for="chkDev">
<input id="chkDev" type="checkbox" bind:checked={dev}/> Development
</label>
<p>
  <button type="button" class="button button-primary"  on:click={installPackage}>Install Package</button>
  </p>
  <Terminal task="install" bind:this={term}/>
</main>

</div>

<style>

  label {
    display: inline;
  }

  input[type="text"] {
    display: inline-block;
    width: 200px;
  }
  input[type="checkbox"] {
    display: inline-block;
    width: auto;
  }
</style>

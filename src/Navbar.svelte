<script>
  import { link } from 'svelte-routing';
</script>
<nav class="navbar">
  <h2>Snowpack-UI</h2>
    <hr/>
    <ul>
      <li><a use:link  href="/"><ion-icon name="home"></ion-icon>Home</a></li>
      <!--<li><a use:link href="/init">Init</a></li>-->
      <li><a use:link href="/dev"><ion-icon name="build-outline"></ion-icon>Dev</a></li>
      <li><a use:link href="/build"><ion-icon name="cube-outline"></ion-icon>Build</a></li>
      <li><a use:link href="/test"><ion-icon name="thermometer-outline"></ion-icon>Test</a></li>
      <li><a use:link href="/format"><ion-icon name="brush-outline"></ion-icon>Format</a></li>
      <li><a use:link href="/lint"><ion-icon name="bug-outline"></ion-icon>Lint</a></li>
      <li><a use:link href="/install"><ion-icon name="add-circle-outline"></ion-icon>Install</a></li>
    </ul>
    <hr/>
    <ul>
      <li><a use:link href="/project-tasks"><ion-icon name="file-tray-stacked-outline"></ion-icon>Project Tasks</a></li>
    </ul>
  </nav>


<style>
  h2 {
    text-align:center;
    margin: 0.5em 0;
  }

  .navbar {
    background: var(--primary);
    color: #fff;
  }

  hr {
    background: #fff;
    border: 1px solid #fff;
    margin: 0.5em;
  }

  li {
    list-style: none;
  }

  a {
    color: #fff;
    padding: 0.5em;
    display: block;
    text-decoration: none;
  }

  a:hover {
    color: var(--primary);
    background: #fff;
  }

  ion-icon {
    padding-right: .5em;
    vertical-align: text-bottom;
  }
</style>

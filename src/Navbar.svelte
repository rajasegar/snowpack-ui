<script>
  import { link } from 'svelte-routing';
</script>
<nav class="navbar">
    <ul>
      <li><a use:link  href="/">Home</a></li>
      <li><a use:link href="/init">Init</a></li>
      <li><a use:link href="/dev">Dev</a></li>
      <li><a use:link href="/build">Build</a></li>
    </ul>
  </nav>


<style>
  .navbar {
    background: #2e5e82;
    color: #fff;
    padding: 0.5em;
  }

  li {
    list-style: none;
  }

  a {
    color: #fff;
    padding: 0.25em;
    margin:1em;
  }
</style>

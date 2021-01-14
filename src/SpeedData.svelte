<script>
  export let items = {};

  function speedData() {
    const keys = Object.keys(items);
    return keys.map(k => {
      return {
        name: items[k].title,
        time: items[k].totalDownloadTime,
        mbps: items[k].mbps
      }
    });
  }

</script>
<h3>Download Time</h3>
{#each speedData() as i}
  <p>{i.name}: {i.time} secs ( {i.mbps} mbps )</p>
{/each}

<script>
  export let side;
  export let title;
</script>
<div class="tooltip">
  {title}
  <span class="tooltiptext">
    <slot></slot>
  </span>
</div>

<style>
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 400px;
  background-color: var(--primary);
  color: #fff;
  text-align: left;
  border-radius: 6px;
  padding: 1em;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>

<script>
  import Schedule from './Schedule.svelte';
  export let presentations;
</script>

<style>
#schedule {
  position: relative;
  display: grid;
  top: 240px;
  width: 900px;
  left: 50%;
  transform: translate(-50%, 0);

  grid-row-gap: 10px;
  grid-column-gap: 10px;
  height: 100%;
  min-height: 100%;
  /* top, right, bottom, left*/
  /* clip: rect(240px,600px,900px,0px); */
  /* clip: rect(900px,calc(100% - 0px),calc(100% - 1px), 0px); */

  /* background-image: url(https://conference.blender.org/static/images/bcon19_cityscape_notext.099808de8710.jpg);
  background-repeat: no-repeat;
  background-attachment: fixed; */
}

@media (orientation: portrait) {
  #schedule {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1200px) {
    #schedule {
      grid-template-columns: 300px 300px 300px;
    }
  }

  @media (max-width: 800px) {
    #schedule {
      width: 800px;
      grid-template-columns: 260px 260px 260px;
    }
  }

  @media (max-width: 799px) {
    #schedule {
      width: 600px;
      /* width: 100%; */
      /* grid-template-columns: 1fr 1fr 1fr; */
      grid-template-columns: 200px 200px 200px;
      left: 0px;
      transform: none;
    }
  }
}

@media (orientation: landscape) {
  #schedule {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1200px) {
    #schedule {
      grid-template-columns: 300px 300px 300px;
    }
  }

  @media (min-width: 800px) {
    #schedule {
      width: 800px;
      grid-template-columns: 260px 260px 260px;
    }
  }

  @media (mx-width: 799px) {
    #schedule {
      /* width: 800px; */
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}

</style>


<div id="schedule">
  {#each presentations as sitem}
    <Schedule {...sitem} />
  {/each}
</div>

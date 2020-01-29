<script>
export let presentations;
export let name;
export let role;
export let organisation;
export let description;
export let imageUrl;
export let purl;
</script>

<style>

.speaker {
  position: relative;
  top: 150px;
  display: grid;
  width: 80%;
  max-width: 1000px;
  margin: 0px auto 25px;
  grid-template-columns: 300px 1fr;
  column-gap: 20px;
  align-items: start;

  height: 100%;
  min-height: 100%;

  background-color: rgba(0,0,0,0.5);
  color: white;

}

.profileimage {
  width: 100%;
  height: 100%;
}

.timg {
  object-fit: contain; /*contain; cover */
  align-self: start;
  width: 100%;
  clip-path: circle(45% at 50% 50%);
}

.texting {
  display: grid;
  grid-template-rows: 30px 20px 20px 20px 1fr 1fr;
  grid-row-gap: 10px;
}

.name {
  font-size: 2rem;
}

.role {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.organ {
  display: flex;
  align-items: flex-end;
  font-weight: bold;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.desc {
  padding: 2% 0px;
}

.purlc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.purl {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.presetitle {
  font-weight: bold;
  margin: 0.5em 0px;
}

.prelist {
  margin-bottom: 2em;
}

@media (max-width: 1200px) {
  .speaker {
    width: 95%;
    grid-template-columns: 250px 1fr;
  }
}

@media (max-width: 800px) {
  .speaker {
    width: 95%;
    grid-template-columns: 250px 1fr;
  }

  .name {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .desc {
    display: none;
    padding: 2% 0px;
  }
}

@media (max-width: 500px) {
  .speaker {
    top: 200px;
    grid-template-columns: none;
    grid-template-rows: 200px 1fr;
    width: 98%;
  }
  .name {
    font-size: 1.3rem;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .profileimage {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .timg {
    object-fit: contain; /*contain; cover */
    align-self: start;
    /* width: none; */
    width: 200px;
    clip-path: circle(45% at 50% 50%);
  }

  .role {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .organ {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .purlc {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}

</style>


<div class="speaker">
  <div class="profileimage" >
    {#if imageUrl}
    <img class="timg"  src="https://conference.blender.org/{imageUrl}" alt="{name}">
    {/if}
  </div>
  <div class="texting">
    <div class="name">{name}</div>
    <div class="role">{role}</div>
    <div class="organ">{organisation}</div>
    <div class="purlc">{#if purl}<a class="purl" href="{purl}">{purl}</a>{/if}</div>
    <div class="desc">{description}</div>

    <div class="prelist">
      {#if presentations.length > 0}
        <div class="presetitle">Presentations:</div>
        {#each presentations as pre}
          <a href="/presentation/{pre.id}"><div>{pre.name}</div></a>
        {/each}
      {/if}
    </div>
  </div>
</div>

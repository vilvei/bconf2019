<script>
import { parse, format } from 'date-fns/esm';
export let id;
export let name;
export let role;
export let organisation;
export let imageUrl;
export let purl;

export function gotoSpeaker() {
  window.location = '/speaker/'+ id;
}
</script>

<style>

.speaker {
  position: relative;
  top: 150px;
  display: grid;
  width: 95%;
  max-width: 1000px;
  margin: 0px auto 25px;
  grid-template-columns: 175px 1fr;
  grid-template-rows: none;
  column-gap: 20px;
  align-items: start;
  border-radius: 5px;

  background-color: rgba(0,0,0,0.5);
  color: white;
}

.profileimage {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  clip-path: circle(60px at 50% 50%);
}

.timg {
  object-fit: cover; /*contain; cover */
  /* align-self: start; */

  width: 70%;
}

.texting {
  display: grid;
  grid-template-rows: 30px 20px 20px 20px;
  grid-row-gap: 5px;

}

.pre-header {
  display: flex;
  justify-content: space-evenly;
  background-color: #e6e6e6;
}

.name {
  font-size: 1.4rem;
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

/* .desc {
  padding: 2% 0px;
} */

.purlc {
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.purl {
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1340px) {
  .speaker {
    width: 96%;
    grid-template-columns: 175px 1fr;
  }
}

@media (max-width: 1000px) {
  .speaker {
    width: 90%;
    grid-template-columns: 150px 1fr;
  }
  .name {
    font-size: 1rem;
    font-weight: bold;
    line-height: 0.9;
  }
  .profileimage {
    clip-path: circle(50px at 50% 50%);
  }
}


@media (max-width: 800px) {
  .speaker {
    grid-template-columns: none;
    grid-template-rows: 200px 1fr;
    width: 95%;
  }

  .profileimage {
    clip-path: circle(70px at 50% 50%);
  }

  .timg {
    width: 200px;
  }

  .name {
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .desc {
    display: none;
    padding: 2% 0px;
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
    max-width: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}

@media (max-width: 500px) {
  .speaker {
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
    max-width: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
</style>

<div class="speaker">
  <div class="profileimage" on:pointerdown|preventDefault|stopPropagation={gotoSpeaker}>
    <img class="timg" src="https://conference.blender.org/{imageUrl}" alt="{name}">
  </div>
  <div class="texting">
    <div class="name" on:pointerdown|preventDefault|stopPropagation={gotoSpeaker}>{name}</div>
    <div class="role" on:pointerdown|preventDefault|stopPropagation={gotoSpeaker}>{role}</div>
    <div class="organ" on:pointerdown|preventDefault|stopPropagation={gotoSpeaker}>{organisation}</div>
    <div class="purlc">{#if purl}<a class="purl" href="{purl}">{purl}</a>{/if}</div>
  </div>
</div>

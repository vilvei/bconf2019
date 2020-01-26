<script>
import { favourites } from '../store-favourites.js';
export let empty;
export let id;
export let starttime;
export let category;
export let location;
export let name;
export let speaker;
export let duration;
let favourite_preses;
const namelimit = 54;

favourites.useLocalStorage();
const unsubscribe = favourites.subscribe(value => {
	favourite_preses = value;
});

export function pointed() {
  if (empty) { return; }
  window.location = '/presentation/'+ id;
}

export function toggle() {
  const ind = favourite_preses.indexOf(id);
  if (ind < 0) {
    const ot = favourite_preses.slice();
    ot.push(id);
    favourites.set(ot);
  }
  else {
    favourite_preses.splice(ind, 1);
    favourites.set(favourite_preses.slice());
  }
}

</script>

<style>
.scard_30, .scard_60, .scard_90 {
  display: grid;
  width: 100%;

  grid-template-rows: 20px 50px 20px 20px;

  border: 1px solid grey;
  border-radius: 5px;
	/* background-color: rgba(256,256,256,0.6); */
	background-color: rgba(0,0,0,0.5);
  color: white;
}

.scard_30 {
  height: 120px;
}

.scard_60 {
  grid-row: auto / span 2;
  height: 240px;
}

.scard_90 {
  grid-row: auto / span 3;
  height: 360px;
}

.scard_empty {
  width: 100%;
  height: 120px;
}

.firstrow {
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: white;
  background-color: #707b70;
  border-radius: 4px 4px 0px 0px;
  border-bottom: 1px solid grey;
}

.favourite {
  background-color: #83ea83;
  color: black;
}

.name {
  /* white-space: nowrap; */
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.speaker {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category, .name, .speaker, .duration {
  margin: 0px 5px;
}

</style>

<div class="{empty ? 'scard_empty' : (duration < 60 ? 'scard_30' : (duration > 60 ? 'scard_90' : 'scard_60'))}"
	on:pointerup|preventDefault={pointed}>
  <div class="{empty ? '' : 'firstrow'} {favourite_preses.includes(id) ? 'favourite' : ''}" on:pointerup|stopPropagation={toggle}>
    <span class="location">{location}</span>
    <span class="starttime">{starttime}</span>
    <span class="category">{category}</span>
  </div>
  <div class="name">{name.length > namelimit ? name.substring(0, namelimit) +'...' : name}</div>
  <div class="speaker">{speaker}</div>
  <div class="duration"> {empty ? '' : duration +'min'}</div>
</div>

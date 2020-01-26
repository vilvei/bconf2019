<script>
import { parse, format } from 'date-fns/esm';
import { favourites } from '../store-favourites.js';
export let id;
export let single;
export let datetime;
export let category;
export let location;
export let name;
export let speaker;
export let duration;
export let description;
export let speakerId;
if (typeof datetime === 'string') {
  datetime = parse(datetime, "yyyy-MM-dd'T'HH:mm:ss.SSSXX", new Date);
}
let favourite_preses;


favourites.useLocalStorage();
const unsubscribe = favourites.subscribe(value => {
	favourite_preses = value;
});

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

.presentation {
  position: relative;
  display: grid;
  max-width: 700px;
  width: 80%;
  margin: 0px auto 25px;
  grid-template-rows: 40px 40px 50px 1fr;
  border-radius: 5px;

  background-color: rgba(0,0,0,0.5);
  color: white;
}

.single {
  top: 150px;
}

.pre-header {
  display: flex;
  justify-content: space-evenly;
  /* background-color: #e6e6e6; */
  background-color: #707b70;

  border-radius: 5px 5px 0px 0px;
}

.favourite {
  background-color: #83ea83;
  color: black;
}

.name {
  padding: 0px 2%;
  font-weight: bold;
  text-decoration: underline;
}

.pretitle {
  padding: 0px 2%;
  font-weight: bold;
}

.bottom {
  display: flex;
  align-items: flex-end;
}

.item {
  padding: 0px 2% 1%;
}

@media (max-width: 800px) {
  .presentation {
    width: 88%;
  }
}

@media (max-width: 500px) {
  .presentation {
    width: 95%;
  }
}

a:link {
  color: inherit;
  text-decoration: none;
}

/* visited link */
a:visited {
  color: inherit;
  text-decoration: none;
}

/* mouse over link */
a:hover {
  color: inherit;
  text-decoration: none;
}

/* selected link */
a:active {
  color: inherit;
  text-decoration: none;
}

</style>


<div class="presentation {single ? 'single' : ''}">
  <div class="pre-header mc {favourite_preses.includes(id) ? 'favourite' : ''}" on:pointerup|stopPropagation={toggle}>
    <div>{location}</div>
    <div>{format(datetime, 'dd.MM.yyyy')}</div>
    <div>{format(datetime, 'HH.mm')}</div>
    <div>{duration} min</div>
    <div>{category || '-'}</div>
  </div>

  {#if single}
    <div class="pretitle bottom">{name}</div>
  {:else}
    <a href="/presentation/{id}"><div class="pretitle bottom">{name}</div></a>
  {/if}
  <div class="name"><a href="/speaker/{speakerId}">{speaker}</a></div>
  {#if single}
    <div class="item">{description}</div>
  {:else}
    <a href="/presentation/{id}"><div class="item">{description}</div></a>
  {/if}
</div>

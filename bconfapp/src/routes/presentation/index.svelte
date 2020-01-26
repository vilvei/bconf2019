<script context="module">
	export async function preload() {
		return { presentations: await getPresentations(this) };
	}
</script>

<script>
	import { parse, format, isBefore, isAfter } from 'date-fns/esm';
	import Presentation from '../../components/Presentation.svelte';
	import { getPresentations } from '../../presentations';
	export let presentations;
	export let selectedFilter;
	export let filtered;

	export function select(prop) {
	  if (prop === selectedFilter) {
			return;
		}
	  selectedFilter = prop;

		if (selectedFilter === 'date') {
			filtered = presentations.sort((a, b) => {
					if (isBefore(a.datetime, b.datetime)) { return -1; }
					if (isAfter(a.datetime, b.datetime)) { return 1; }
					return 0;
				});
		}
		else {
			filtered = presentations.sort((a, b) => {
				if (a[selectedFilter] < b[selectedFilter]) { return -1; }
				if (a[selectedFilter] > b[selectedFilter]) { return 1; }
				return 0;
			});
		}
	}
	select('date');
</script>

<style>
#schedule {
	position: relative;
	top: 170px;
	height: 100%;
	min-height: 100%;
	width: 80%;
	margin: 0px auto 25px;
}

.toolwrap {
  position: fixed;
  top: 105px;
  height: 35px;
  width: 100%;
  border-bottom: 1px solid rgba(255,62,0,0.1);
  background-color: #e6e6e6;
  z-index: 5;

	/* background-color: rgba(0,0,0,0.5); */
	background-color: #313331;
	color: white;
}

#tool {
  width: 100%;
	height: 100%;
  display: flex;
  justify-content: space-evenly;
}

.toolitem {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

	height: 25px;
  padding: 5px;
  font-size: 1.2rem;
  opacity: 1;
}

.tool-selected {
  color: black;
  background-color: white;
}

</style>

<svelte:head>
	<title>BConf 2019 Presentations</title>
</svelte:head>

<!-- sort filters
	date, location, speaker, category
-->

<div class="toolwrap">
	<div id="tool">
		<div class="toolitem {selectedFilter === 'date' ? 'tool-selected' : ''}" on:pointerdown|preventDefault={() => select('date')}>date</div>
		<div class="toolitem {selectedFilter === 'location' ? 'tool-selected' : ''}" on:pointerdown|preventDefault={() => select('location')}>location</div>
		<div class="toolitem {selectedFilter === 'speaker' ? 'tool-selected' : ''}" on:pointerdown|preventDefault={() => select('speaker')}>speaker</div>
		<div class="toolitem {selectedFilter === 'category' ? 'tool-selected' : ''}" on:pointerdown|preventDefault={() => select('category')}>category</div>
	</div>
</div>
<div id="schedule">
  {#each filtered as sitem}
    <Presentation {...sitem} />
  {/each}
</div>

<script context="module">
	export async function preload() {
		return {speakers: await getSpeakers(this) }
	}
</script>

<script>
	import { parse, format } from 'date-fns/esm';
	import Speakershort from '../../components/Speakershort.svelte';
	import { getSpeakers } from '../../speakers.js';
	export let speakers;
</script>

<style>
	#speakers {
		position: relative;
		top: 60px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		/* grid-template-rows: 400px 1fr; */
	}

	@media (max-width: 1200px) {
		#speakers {
			display: grid;
			grid-template-columns: 1fr 1fr;
			/* grid-template-rows: 400px 1fr; */
		}
	}

	@media (max-width: 800px) {
	  /* #speakers {
			display: grid;
	    grid-template-columns: 1fr 1fr;
	    grid-template-rows: 400px 1fr;
	  } */
	}

	@media (max-width: 500px) {
		#speakers {
			display: grid;
			grid-template-columns: none;
			grid-template-rows: 400px 1fr;
		}
	}

</style>

<svelte:head>
	<title>BConf 2019 Speakers</title>
</svelte:head>

<div id="speakers">
  {#each speakers as sitem}
		{#if sitem.imageUrl}
    	<Speakershort {...sitem} />
		{/if}
  {/each}
</div>

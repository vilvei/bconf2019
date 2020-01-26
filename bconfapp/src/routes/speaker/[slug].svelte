<script context="module">
	export async function preload(page, session) {
    const { slug } = page.params;
		const speakers = await getSpeakers(this);
		const presentations = await getPresentations(this);
		return {
			speaker: speakers.find(spe => spe.id === slug),
			presentations: presentations.filter(pre => pre.speakerId === slug)
		};
	}
</script>

<script>
  import Speaker from '../../components/Speaker.svelte';
	import { getSpeakers } from '../../speakers.js';
	import { getPresentations } from '../../presentations.js';
	export let speaker;
	export let presentations;
</script>

<Speaker {...speaker} {presentations} />

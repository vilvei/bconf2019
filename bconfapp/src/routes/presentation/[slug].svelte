<script context="module">
	export async function preload(page, session) {
    const { slug } = page.params;
		const preses = await getPresentations(this);
    return { presentation: Object.assign({single: true}, preses.find(pre => pre.id === slug)) }
	}
</script>

<script>
  import Presentation from '../../components/Presentation.svelte';
	import { getPresentations } from '../../presentations';
	export let presentation;
</script>

<Presentation {...presentation} />

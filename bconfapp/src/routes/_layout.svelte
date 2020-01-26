<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	body {
		height: 100%;
		min-height: 100%;
	}

	main {
		position: relative;
		/* max-width: 56em; */
		width: 100%;
		height: 100%;
		min-height: 100%;
		/* background-color: white; */
		padding: 0em;
		margin: 0 auto;
		box-sizing: border-box;

	}
	/* body {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	} */

</style>

<Nav {segment}/>

<!-- <main> -->
	<slot></slot>
<!-- </main> -->

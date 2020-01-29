
<style>
.about {
	position: relative;
	top: 150px;
	width: 80%;
	max-width: 700px;
	margin: 0px auto;
	padding: 10px 20px;
	background-color: rgba(0,0,0,0.5);
  color: white;
}

ul {
	margin-top: 0px;
}

@media (max-width: 500px) {
	.about {
		top: 200px;
		width: 95%;
		padding: 10px;
	}
}
</style>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="about">
	<h1>About</h1>

	<p>
		This is a redesign of <a href="https://conference.blender.org/2019/schedule/">Blender Conference</a> event page with data from 2019.
	</p>

	<h3>Main goals:</h3>
	<ul>
		<li>Mobile friendly</li>
		<li>Time-zone friendly</li>
		<li>Remember favourite events (no login required)</li>
		<li>Offline usage, when device data is not usable</li>
	</ul>

	<h3>Technique:</h3>
	<ul>
		<li>Svelte + Sapper =~> PWA SPA Webb app
			<ul>
				<li><a href="https://svelte.dev/">Svelte</a></li>
				<li><a href="https://sapper.svelte.dev/">Sapper</a></li>
				<li><a href="https://developers.google.com/web/progressive-web-apps">PWA</a></li>
			</ul>
		</li>
		<li><a href="https://date-fns.org/">date-fns</a> for easy datetime handling</li>
		<li>Web app is exported to static files.</li>
		<li>Same Creative Commons license as Blender official web page.</li>
	</ul>

	<h3><a href="https://github.com/vilvei/bconf2019.git">Github</a></h3>
	Ville Lukka, 2020.

</div>

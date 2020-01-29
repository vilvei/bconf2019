<style>
.options {
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
	.options {
		top: 200px;
		width: 95%;
		padding: 10px;
	}
}
</style>

<svelte:head>
	<title>BConf 2019</title>
</svelte:head>

<div class="options">
	<h1>Options</h1>

	<h3>TODO</h3>
	<ul>
		<li>This is a <a href="https://developers.google.com/web/progressive-web-apps">PWA</a>, that delivers app-like experience. This includes capability to "install" the app => app icon to desktop/mobile launcher.</li>
		<ul><li>Add button to install</li></ul>
		<li>Favourite events can be marked. Upcoming events could be <a href="https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API">notified via system</a>.</li>
	</ul>

</div>

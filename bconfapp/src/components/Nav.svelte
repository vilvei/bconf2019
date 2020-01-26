<script>
	// import { format } from 'date-fns/esm';
	// const updateTime = () => {
	// 	time = format(new Date(), 'HH.mm');
	// }

	// export let time
	export let segment;

	// updateTime();
	// setInterval(updateTime, 30000);
</script>

<style>
	nav {
		position: fixed;
		/* border-bottom: 1px solid rgba(255,62,0,0.1); */
		font-weight: 300;
		/* padding: 0 1em; */
		/* background-color: white; */
		color: white;
		width: 100%;
		/* width: 80%; */
		/* height: 200px; */
		z-index: 6;

		background-image: url(https://conference.blender.org/static/images/bcon19_cityscape_notext.099808de8710.jpg);
		background-repeat: repeat;
		background-attachment: fixed;
		background-size: cover; /*contain;*/


	}

	.bg {
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
	}

	.titletline {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0.5em 0px 0px 1em;

		/* width: 80%; */
	}

	.title {
		font-size: 3rem;
		padding: 0px;
		margin: 0px;
		line-height: 1;
	}

	.clock {
		font-size: 1.5rem;
	}

	ul {
		margin: 0;
		/* padding: 0; */
		padding: 0 1em;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 5px;
		background-color: grey;
		display: block;
		bottom: 10px;
	}

	a {
		text-decoration: none;
		padding: 0.8em 0.5em;
		display: block;
	}
</style>

<nav>
	<div class="bg">
	<div class="titletline">
		<div class="title">Blender Conference 2019</div>
		<!-- <div class="clock mc">{time}</div> -->
	</div>
	<ul>
		<li><a class:selected='{segment === undefined}' href='.'>Schedule</a></li>
		<li><a class:selected='{segment === "speaker"}' href='speaker'>Speakers</a></li>
		<li><a class:selected='{segment === "presentation"}' href='presentation'>Presentations</a></li>
		<li><a class:selected='{segment === "options"}' href='options'>Options</a></li>
		<li><a class:selected='{segment === "about"}' href='about'>About</a></li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<!-- <li><a rel=prefetch class:selected='{segment === "blog"}' href='blog'>blog</a></li> -->
	</ul>
	</div>
</nav>

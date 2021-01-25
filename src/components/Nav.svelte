<script>
	export let segment;
	import { slide } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';
	import LangSwitch from './lang_switch.svelte';

	function spin(node, { delay = 0, duration = 400 }) {
		return {
			delay,
			duration,
			css: t => {
				const eased = backInOut(t);
				return `
					position:absolute;
					transform: scale(${eased}) rotateY(${(eased-1)*90}deg);
					`
			}
		};
	}

</script>

<style lang="scss">
header{
		pointer-events:none;
		*{
			pointer-events:auto;
		}
		user-select: none;
		z-index:2;
		position: fixed;
		top: 0;
		width: 100%;
		padding: 2em;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}
	footer{
		pointer-events:none;
		*{
			pointer-events:auto;
		}
		user-select: none;
		z-index:2;
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 2em;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
.flipper{

	width: 2em;
	height: 2em;
	transform-style: preserve-3d;
	position: relative;
	transform-origin: center;
	transition: transform 0.2s;

	&.flipped{
		transform: rotateY(180deg);
	}
	.front{
		transform-origin: center;
		width:100%;height:100%;
		position: absolute;
		backface-visibility: hidden;

		background-image: url("../assets/logo.svg");
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}
	.back{
		&:hover{
			transform: rotateY(180deg) scale(1.2);
		}
		transition: transform 0.2s;
		transform-origin: center;
		width:100%;height:100%;
		position: absolute;
		transform: rotateY(180deg);
		background-image: url("../assets/arrow.svg");
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		backface-visibility: hidden;
	}
}

a{
	text-decoration: none;
}


</style>
<!--
<nav>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
		<li><a aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a></li>
		<li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li>
	</ul>
</nav>
-->

<header>
		<div class="flipper" class:flipped={segment != undefined}>
			<div class="front">
			</div>
			<a class="back" href="/">
			</a>
		</div>

	<div>
	{#if segment === undefined}
		<a rel=prefetch href="about/" transition:slide={{duration:600}}>Info</a>
	{/if}
	</div>
</header>

<footer>
	<div>
	{#if segment === undefined}
		<a rel=prefetch href="archive/" transition:slide={{duration:600}}>Archive</a>
	{/if}
	</div>

			<LangSwitch/>
</footer>

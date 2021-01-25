<script context="module">
	export function preload() {
		return this.fetch(`about.json`).then(r => r.json()).then(about => {
			return { about };
		});
	}
</script>

<script>
	export let about;
	import { getContext } from 'svelte';
	import meta from './_meta.json';

	let vocabulary = getContext("vocabulary");

	import { lang } from '../stores/lang.js';
	import { onMount } from 'svelte';

	import { slide,fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	function textSlide(node, { delay = 0, duration = 400 }) {
		return {
			delay,
			duration,
			css: t => {
				const eased = cubicInOut(t);
				return `
					opacity:${eased};
					transform: translateY(${(eased-1)*-100}%) rotateX(${(eased-1)*90}deg);
					`
			}
		};
	}
	let canvas,ctx;
	onMount(()=>{

	});



	const Util = {};
	Util.map = function(a, b, c, d, e) {
	  a = this.clamp(a, b, c);
	  return (a - b) / (c - b) * (e - d) + d;
	};
	Util.clamp = function(value, min, max) {
	  return Math.max(min, Math.min(max, value));
	};
	Util.lerp = function(value1, value2, amount) {
	  return value1 + (value2 - value1) * amount;
	};


	let pointer = {
			x:0,
			y:0
	}

	function init(){
		ctx = canvas.getContext("2d");
		setSize();
		window.addEventListener('resize', setSize);
		window.addEventListener('pointermove',(event)=>{
			var rect = canvas.getBoundingClientRect();
			pointer.x = Util.clamp(event.clientX - rect.left,0,canvas.width);
      pointer.y = Util.clamp(event.clientY - rect.top,0,canvas.height);


		});
		render();
	}

	function setSize(){
		let pr = window.devicePixelRatio;
		canvas.width = canvas.clientWidth * pr;
		canvas.height = canvas.clientHeight * pr;
	}

	function render(){
		// background
		ctx.fillStyle = "#FFFAEF";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = "black";
		ctx.fillRect(pointer.x,pointer.y,10,10);

		requestAnimationFrame(render);
	}

</script>
<svelte:head>
	<title>About</title>
</svelte:head>

<style lang="scss">
	main{
		position: absolute;
		top:0;
		left:0;
		width: 100%;
		height: 100vh;
		overflow-y: scroll;
		overflow-x:hidden;
	}
	.txt-wrap{
		overflow: hidden;
	}
	#interactive{
		z-index: -1;
		position: absolute;
		right: 0;
		top:0;
		height: 100%;
		max-height: 80vmin;
		max-width: 1200px;
		width: 100%;
		background-image: url("../assets/house.jpg");
		background-size: cover;
		background-position: center;
	}
	.content{
		margin: auto;
		max-width: 60ch;
		padding: 40vh clamp(2em, 10vw, 10em);
	}
	h1{
		font-weight: 600;
		font-size: 3em;
	}
	h3{
		font-size: 0.8em;
		text-transform: uppercase;
		font-weight: 800;
	}
	.sep{
		& > *:not(:last-child)::after{
			content:"·";
			margin: 0 0.2em;
		}
	}
</style>

<main>

<div class="content">
<div class="txt-wrap">
	<h1 in:textSlide={{duration:400,delay:400}} out:textSlide={{duration:400}} >{about[$lang.current].meta.title}</h1>
</div>
<div in:fade={{delay:800}} out:fade={{delay:100}}>
{@html about[$lang.current].content}
</div>

<h3>{vocabulary.email[$lang.current]}</h3>
<p>{meta.email}</p>
<h3>{vocabulary.external[$lang.current]}</h3>

<div class="sep">
{#each meta.external as link}
	<span>
		<a href={link.src}>{link.title}</a>
	</span>
{/each}
</div>

</div>
<canvas bind:this={canvas} in:fade={{delay:800}} out:fade id="interactive"></canvas>

</main>

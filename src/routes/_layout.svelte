
<script>
	import { setContext } from 'svelte'

	import vocabulary from './_vocabulary.json';
	setContext('vocabulary', vocabulary)

	import { onMount } from 'svelte';
	import Nav from '../components/Nav.svelte';
	import { lang } from '../stores/lang.js';

	export let segment;

	let is_ready = false;

	onMount(() => {
			is_ready = true;


			let user_lang = localStorage.getItem("current_lang") || (navigator.language || navigator.userLanguage).slice(0, 2);
			if(!$lang.supported.includes(user_lang)){
				user_lang = "en";
			}
			$lang.current = user_lang;
			localStorage.setItem("current_lang",$lang.current);


	});


	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	function textSlide(node, { delay = 0, duration = 400 }) {
		return {
			delay,
			duration,
			css: t => {
				const eased = cubicInOut(t);
				return `
					transform: translateY(${(eased-1)*-100}%);
					`
			}
		};
	}

</script>

<style lang="scss">

.loader{
	position: absolute;
	box-sizing: border-box;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 2em;
	z-index: 10;
	text-transform: uppercase;
	background-color:white;
	color:#4440FF;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;


	h1,h2{
		margin: 0;
		font-size: 0.8;
	}
	h1{
		font-weight: 800;
		margin-bottom: 0.2em;
	}
}
.txt-wrap{
	overflow: hidden;
}

</style>
{#if !is_ready}
<div transition:fade={{delay:800}} class="loader">
<div class="txt-wrap"><h1 transition:textSlide>Thibaud Goiffon</h1></div>
<div class="txt-wrap"><h2 transition:textSlide={{delay:400}}>Graphic Designer</h2></div>
</div>
{/if}

<Nav {segment}/>

<slot></slot>

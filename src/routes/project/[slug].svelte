<script context="module">
	export async function preload({ params }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`project/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { project: data };
		} else {
			this.error(res.status, data.message);
		}
	}


</script>

<script>
	import { fade } from 'svelte/transition';
	import { lang } from '../../stores/lang.js';
	import ImageView from '@/src/components/Image.svelte';
	export let project;

	let split = [];
	let text_source = project.title[$lang.current];
	let string_array = text_source.split(/(\s+)/);

	let i = 0;
	let word_cut = string_array.map((word,index)=>{
		let char = word.split("").map(char=>{
			return {char:char,index:i++}
		});
		return {word:word,index:index,chars:char};
	});

	import { cubicInOut } from 'svelte/easing';

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
.txt-wrap{
	overflow: hidden;
}

	main{
		position: absolute;
		top:0;
		left:0;
		width: 100%;
		height: 100vh;
		overflow-y: scroll;
		overflow-x:hidden;
	}

	.wrapper{
		color:#4440FF;
		text-align: center;
		box-sizing: border-box;
		max-width: 1200px;

		width: 100%;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 4em;
	}
	h1{
		font-size: 4em;
		font-weight: 800;
	}
	.navigation{
		margin-top: 2em;
		width: 100%;
		display: flex;
		border-top:2px solid black;
		font-size: 1.2em;
		text-align: center;
		a{
			text-decoration: none;
			flex:1;
			padding: 2em;
			border-right:2px solid black;
		}
		& a:first-child{
		}
		& a:last-child{
			border-right: none;
		}
	}
	.split{
		display: inline-block;
	}
	.word{
		display: inline-block;
		overflow: hidden;
	}
	.char{
		display: inline-block;
		position: relative;
		&>*{
			margin: 0;
			white-space:pre;
		}
	}

	.title{
		margin-top: 4em;
		margin-bottom: 1em;
	}

	.padding-text{
		margin: 2em 1em 3em 1em;
		max-width: 60ch;
	}

</style>

<svelte:head>
	<title>{project.title[$lang.current]}</title>
</svelte:head>


<main>

<div class="wrapper">

<div class="title split">
	{#each word_cut as word}
		<div class="word">
			{#each word.chars as char}
				<span class="char" transition:textSlide={{duration:400, delay:40*char.index}}>
					<h1>{char.char}</h1>
				</span>
			{/each}
		</div>
	{/each}
</div>

<div class="content" transition:fade={{delay:400}}>

<h2 class="padding-text">{project.intro[$lang.current]}</h2>
{#each project.template as item}
	{#if item.type == "p"}
		<p class="padding-text">{item.content[$lang.current]}</p>
		{:else if item.type == "img"}
		<ImageView src="{item.src}" height={item.height} width={item.width}/>
	{/if}
{/each}


</div>




</div>
<!--
<footer class="navigation" transition:fade={{delay:400}}>
	{#if project.previous}
		<a href="project/{project.previous}">previous</a>
	{/if}
	{#if project.next}
		<a href="project/{project.next}">next</a>
	{/if}
</footer>
-->
</main>

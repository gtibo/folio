<script context="module">
	export function preload() {
		return this.fetch(`project.json`).then(r => r.json()).then(projects => {
			return { projects };
		});
	}
</script>

<script>
	export let projects;
	import { lang } from '../../stores/lang.js';

</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent projects</h1>

<ul>
	{#each projects as post}
		<li><a rel="prefetch" href="project/{post.slug}">{post.title[$lang.current]}</a></li>
	{/each}
</ul>

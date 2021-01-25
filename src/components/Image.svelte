<script>
	export let src,width,height;
	let target;
	import { onMount } from 'svelte';
	let mounted = false;
	let loaded = false;
	onMount(() => {
		mounted = true;
		watchObserver()
	})

	function watchObserver(){
		var options = {
		  rootMargin: '0px',
		  threshold: 0.1
		}

		var observer = new IntersectionObserver((entries, observer)=>{
			entries.forEach(entry=>{
				if(entry.isIntersecting){
					target.src = src;
					target.onload = function(){
						loaded = true;
					}
					observer.unobserve(target);
				}
			});
		}, options);
		target.src = "";
		loaded = false;
		observer.observe(target);
	}


	$:{
		if(src && mounted){
			watchObserver();
		}
	}

	let color_watch = ["#8577EF","#00864B","#FEAAE4"],
			load_color = color_watch[Math.floor(Math.random()*color_watch.length)];
</script>

<style>
.img-wrap{
	max-width: 100%;
	width: 100%;
}
img{
	opacity: 0;
	display:block;
  width: 100%;
  max-width:100%;
  height: auto;
	animation-fill-mode: forwards;
}
@keyframes appear {
	from{
		opacity: 0;
	}
	to{
		opacity: 1;
	}
}
:global(.visible){
	animation: appear 0.2s;
}

</style>
<div class="img-wrap" style="background-color:{load_color}">
	<img alt="Project screenshot" width={width} height={height} class:visible={loaded} bind:this={target}>
</div>

<script>
  import { lang } from '../stores/lang.js';
</script>

<style lang="scss">
.lang{
  pointer-events:auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;

	font-size: 0.8em;
	font-weight: 300;
	text-transform: uppercase;
	.current{
		font-weight: 800;
	}
}

</style>

<div class="lang">
{#each $lang.supported as l,i}
<span class:current={$lang.current == l} on:click={()=>{
  $lang.current = l;
	localStorage.setItem("current_lang",$lang.current);
}}>{l}</span>
{/each}
</div>

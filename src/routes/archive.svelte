<script context="module">
	export function preload() {
		return this.fetch(`project.json`).then(r => r.json()).then(projects => {
			return { projects };
		});
	}
</script>

<script>
export let projects;
import { lang } from '../stores/lang.js';
import { fade } from 'svelte/transition';

</script>

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


.title{
  font-weight: 600;
  font-size: 4em;
  font-weight: 800;
}

.list{
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.2em 0.6em;
  box-sizing: border-box;
  .item{
    display: flex;
    justify-content: space-between;
    & > * {
      flex:1;
    }
    & > *:first-child{
      text-align: left;
    }
    & > *:last-child{
      text-align: right;
    }
  }
}

</style>

<main transition:fade>

<div class="wrapper">
<h1 class="title">Archive</h1>

<div class="list">
{#each projects as project}
  <a rel="prefetch" href="project/{project.slug}" class="item">
    <div>{project.title[$lang.current]}</div>
    <div>{project.date}</div>
    <div>{project.type[$lang.current]}</div>

  </a>
{/each}
</div>

</div>

</main>

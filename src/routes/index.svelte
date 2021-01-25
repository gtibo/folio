<script context="module">
	export function preload() {
		return this.fetch(`project.json`).then(r => r.json()).then(projects => {
			projects.forEach((p, i) => {
			  p.index = i + 1
			})
			projects.unshift(projects.pop());

			return { projects };
		});
	}
</script>

<script>


import { slide,fade } from 'svelte/transition';
import { lang } from '../stores/lang.js';
export let projects;
let displayed_item;

function saveSlide(){
	sessionStorage.setItem("current_slide", projects[1].index-1);
}

import * as THREE from 'three';

import {
  EffectComposer
} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {
  RenderPass
} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {
  Waves
} from './_waves.js';
import {
  ShaderPass
} from 'three/examples/jsm/postprocessing/ShaderPass.js';
import {
  onMount
} from 'svelte';
let three_container;

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

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

var group = new THREE.Group();


let width, height, plane_width, plane_height, plane_aspect;
let carousel_ready = false;

onMount(() => {
  width = window.innerWidth;
  height = window.innerHeight;

  plane_width = width * 0.5,
    plane_height = height * 0.8;
  plane_aspect = plane_width / plane_height;


  const manager = new THREE.LoadingManager();
  var loader = new THREE.TextureLoader(manager);

  projects.forEach((p, i) => {
    p.texture = loader.load(p.vignette, (texture) => {
      let i = texture.image;
      p.texture_aspect = i.width / i.height;
    });
  });

  manager.onLoad = function() {
		carousel_ready = true;
    init();
  };


});

let scene,
  camera,
  renderer,
  composer, mesh, wavesPass;


function checkTexture() {
  projects.slice(0, 3).forEach((item, index) => {
    let aspect = item.texture_aspect / plane_aspect;
    item.texture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
    item.texture.repeat.x = aspect > 1 ? 1 / aspect : 1;

    item.texture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
    item.texture.repeat.y = aspect > 1 ? 1 : aspect;
    displayed_item[index].mesh.material.map = item.texture;
  });

}


let pointer = {
	active:false,
	position:{x:0,y:0},
	down_position:{x:0,y:0},
	old_position:{x:0,y:0}
}


function init() {

	let scroll_offset = (!sessionStorage.getItem("current_slide"))?0:sessionStorage.getItem("current_slide");


	for (let i = 0; i < scroll_offset; i++) {
		projects.push(projects.shift());
	}
	projects = projects;
	displayed_item = projects.slice(0, 3);

	window.addEventListener('pointermove', (event) => {
		pointer.position.x = event.clientX;
		pointer.position.y = event.clientY;
		pointer.velocity = pointer.old_position.y - pointer.position.y;

		pointer.old_position.x = pointer.position.x;
		pointer.old_position.y = pointer.position.y;
	});

	window.addEventListener('pointerdown', (event) => {
		pointer.active = true;
		pointer.position.x = pointer.old_position.x = pointer.down_position.x = event.clientX;
		pointer.position.y = pointer.old_position.y = pointer.down_position.y = event.clientY;


	});

	window.addEventListener('pointerup', (event) => {
		pointer.active = false;
		let dist_start_end = pointer.down_position.y-pointer.position.y;

		if(Math.abs(dist_start_end) > window.innerHeight * 0.1){
			let f = Math.round(Util.map(Math.abs(pointer.velocity),0,window.innerHeight*0.5,1,3));
			spring.target += dist_start_end>0?f:-f;
		}
	});



  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
  camera.position.z = 1;
	//camera.rotateZ(Math.PI * 0.02);
  scene.add(group);


  var geometry = new THREE.PlaneGeometry(plane_width, plane_height);

  // Add offset items meshs

  displayed_item.forEach((item, index) => {
    item.material = new THREE.MeshBasicMaterial({});
    item.mesh = new THREE.Mesh(geometry, item.material);
    item.mesh.position.set(width / 2 - plane_width / 2 - width * 0.1, -height * index, 0);
    //item.mesh.rotateZ(-Math.PI*0.02);
    let aspect = item.texture_aspect / plane_aspect;


    item.texture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
    item.texture.repeat.x = aspect > 1 ? 1 / aspect : 1;

    item.texture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
    item.texture.repeat.y = aspect > 1 ? 1 : aspect;

    item.material.map = item.texture;

    item.material.map.magFilter = THREE.LinearFilter;
    item.material.map.minFilter = THREE.LinearFilter;



    group.add(item.mesh);
  });

  renderer = new THREE.WebGLRenderer({ alpha: true , antialias:false});
  renderer.setSize(width, height);


  three_container.appendChild(renderer.domElement);
  // Deformation effect
  composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  wavesPass = new ShaderPass(Waves);
  composer.addPass(wavesPass);


	window.addEventListener('resize', ()=>{
		width = window.innerWidth;
	  height = window.innerHeight;

		camera.left = width / -2;
		camera.right = width / 2;
		camera.top = height / 2;
		camera.bottom = height / -2;

		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
		composer.setSize( window.innerWidth, window.innerHeight );


		plane_width = width * 0.5;
			plane_height = height * 0.8;
		plane_aspect = plane_width / plane_height;


		geometry.dispose();
		geometry = new THREE.PlaneGeometry(plane_width, plane_height);

		displayed_item.forEach((item, index) => {
			item.mesh.geometry.dispose();
			group.remove(item.mesh);
			item.mesh = new THREE.Mesh(geometry, item.material);
			item.mesh.position.set(width / 2 - plane_width / 2 - width * 0.1, -height * index, 0);
			group.add(item.mesh);
		});

		checkTexture();
	});

  animate();
}

let spring = {
  target: 1,
  value: 1,
  velocity: 0
};


var now,
  dt = 0,
  last = 0,
  step = 1 / 60;

function goUp(amount) {
  spring.target -= 1 || amount;
}

function goDown(amount) {
  spring.target += 1 || amount;
}

function update(step) {

	if(pointer.active){
		spring.value = Util.map(pointer.down_position.y-pointer.position.y,-window.innerHeight,window.innerHeight,0.5,1.5);
	}else{
	spring.velocity += (spring.target - spring.value);
  spring.velocity = Util.lerp(spring.velocity, 0, 0.2);
  spring.value += spring.velocity * step;
}


  if (spring.value < 0.5) {
    spring.value = 1.5;
    spring.target = (spring.target != 0) ? spring.target + 1 : 1;
    projects.unshift(projects.pop());
    projects = projects;
    checkTexture();
  } else if (spring.value > 1.5) {
    spring.value = 0.5;
    spring.target = (spring.target != 0) ? spring.target - 1 : 1;
    projects.push(projects.shift());
    projects = projects;
    checkTexture();
  }

  group.position.y = spring.value * height;
}


function animate() {
  now = timestamp();
  dt = dt + Math.min(1, (now - last) / 1000);
  while (dt > step) {
    dt = dt - step;
    update(step);
    wavesPass.uniforms["time"].value = timestamp() * 0.001;
    wavesPass.uniforms["force"].value = Util.map(Math.abs(spring.velocity), 0, 10, 0.01, 0.1);
  }
  composer.render(scene, camera);
  last = now;
  requestAnimationFrame(animate);
}

let can_be_pressed = true;

function handleKeyUp(event) {
  if (event.key == "ArrowUp" || event.key == "ArrowDown") {
    can_be_pressed = true;
  }
}

function handleKeyDown(event) {
  if (!can_be_pressed) return false;
  switch (event.key) {
    case "ArrowUp":
      goUp()
      can_be_pressed = false;
      break;
    case "ArrowDown":
      goDown()
      can_be_pressed = false;
      break;
    default:
  }
}
let last_scroll = new Date();

function handleScroll(event) {
  let current_scroll = new Date();
  if (Math.abs(event.deltaY) > 0 && current_scroll - last_scroll > 500) {
    last_scroll = new Date();
    (event.deltaY > 0) ? goDown(): goUp();
  }
}
</script>

<style lang="scss">
#three_background {
	touch-action: none;
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	z-index: -1;
	transition: opacity 0.4s;
	opacity: 1;
	&.hidden{
		opacity: 0;
	}
}

#text-display {
	touch-action: none;
	user-select: none;
	box-sizing: border-box;
	position: absolute;
	padding: 0 clamp(1em, 6vw, 10em);
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.pagination {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 1.2em;
		.current {
			font-weight: 600;
		}
	}
	a {
		text-decoration: none;
	}
	.information {
		transition: transform,color,padding 0.2s;
		&:hover {
			padding-left: 1em;
			& > * {
				transform: skew(-10deg);
			}
		}
		h1,h2 {
			margin: 0;
		}
		h1 {
			white-space: pre-line;
			font-weight: 600;
			font-size: 3em;
			margin-bottom: 0.1em;
		}

		.date {
			font-size: 0.8em;
		}
	}
}
</style>

<svelte:head>
	<title>Folio</title>
</svelte:head>
<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} on:wheel={handleScroll}/>

<div id="text-display">
	<a on:click={saveSlide} in:slide={{delay:1000}} out:slide={{delay:200}} href="project/{projects[1].slug}" class="information">
    <div class="title">
      <h1>{projects[1].title[$lang.current]}</h1>
    </div>
    <div class="type">
      <h2>{projects[1].type[$lang.current]} <span class="date">{projects[1].date}</span></h2>
    </div>
</a>
  <div in:slide={{delay:1000}} out:slide={{delay:200}} class="pagination">
    <div class="current">
      {projects[1].index}
    </div>
    <div class="point">
      ·
    </div>
    <div class="count">
      {projects.length}
    </div>
  </div>

</div>
<div class:hidden={!carousel_ready} out:fade id="three_background" bind:this={three_container}>

</div>

/**
 * Full-screen textured quad shader
 */

var Waves = {

	uniforms: {

		"tDiffuse": { value: null },
		"time": { value: 0 },
		"force": { value: 0.1 },

		"opacity": { value: 1.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

		"	vUv = uv;",
		"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform float opacity;",
		"uniform float time;",
		"uniform float force;",

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"void main() {",
		"vec2 coord = vUv;",
		"coord.x += sin(time + coord.y * 4.0) * force;",
		"coord.y += cos(time - sin(coord.y * coord.x) * 10.0) * 0.01;",
		"	vec4 texel = texture2D( tDiffuse, coord );",
		"	gl_FragColor = opacity * texel;",

		"}"

	].join( "\n" )

};

export { Waves };

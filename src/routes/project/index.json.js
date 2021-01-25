import projects from '@/json_source/projects.json';

const contents = JSON.stringify(projects.map((project,index) => {

	let vignette = project.media.find((media)=>{
		return media.src.match(project.vignette)
	});

	return {
		title: project.title,
		type: project.type,
		date: project.date,
		vignette: vignette.src,
		media_path: project.media_path,
		slug: project.slug
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}

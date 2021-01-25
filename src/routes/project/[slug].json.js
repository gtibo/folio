import projects from '@/json_source/projects.json';

const lookup = new Map();
projects.forEach((project,index) => {

	project.previous = (index>0)? projects[index-1].slug:false;
	project.next = (index < projects.length-1)? projects[index+1].slug:false;

	project.template.forEach((item, i) => {
		if(item.type == "img"){
			let image_data = project.media.find((media)=>{
				return media.src.match(item.src)
			});
			if(image_data){
				item.width = image_data.width;
				item.height = image_data.height;
				item.src = image_data.src;
			}
		}
	});


	lookup.set(project.slug, JSON.stringify(project));
});

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

import experiments from '@/json_source/experiments.json';

const contents = JSON.stringify(experiments.map(experiment => {
	return experiment;
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}

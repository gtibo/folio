import all from './_data/*.md'

let presentation = {};

all.forEach(v=>{
  let lang = v.filename.replace(/\.md$/, '');
  presentation[lang] = {
    meta: v.metadata,
    content:v.html
  };
});

const contents = JSON.stringify(presentation);

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(contents);
}

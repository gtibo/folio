const fs = require('fs'),
  fm = require('front-matter'),
  path = require('path');
const sharp = require('sharp');
let pearl_folder = path.join(__dirname, "pearl");
var MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();
  var sizeOf = require('image-size');

// Scan pearl folder and loop through every categories
let categories_folder = scanFolder(pearl_folder);
console.log(`Found ${categories_folder.length} categorie${categories_folder.length > 1 ?'s':''}`);
categories_folder.forEach((category) => {


  let media_dir = path.join(__dirname, `static/${category.name}-media`);

  if (!process.argv.includes("skip-media")) {
    // Create media folder for this category
    console.log("Create media folder for", category.name);
    if (fs.existsSync(media_dir)) {
      fs.rmdirSync(media_dir, {
        recursive: true
      });
    }
    fs.mkdir(media_dir, checkDirCreation);
  }


  console.log("Scan", category.name);
  // Scan every folder in category
  let item_folder = scanFolder(category.path);

  let item_meta = item_folder.map(item => {
    let meta = {};
    meta.slug = item.name;
    if (hasElement(item.path, "meta.md")) {
      // Read meta md
      const data = fs.readFileSync(path.join(item.path, "meta.md"), {
        encoding: 'utf8',
        flag: 'r'
      });

      var content = fm(data)

      meta = {
        ...meta,
        ...content.attributes
      }
      if (content.body) meta.body = md.render(content.body);
    }

    if (hasElement(item.path, "meta.json")) {

      let data = fs.readFileSync(path.join(item.path, "meta.json"), {
        encoding: 'utf8',
        flag: 'r'
      });

      meta = {...meta,...JSON.parse(data)};

    }

    if (hasElement(item.path, "media")) {
      // Clone every media to static part in own folder :)
      let item_dir = path.join(media_dir, item.name);
      let item_media_input = path.join(item.path, "media");
      meta.media_path = item_dir.split("/static/").pop();

      if (!process.argv.includes("skip-media")) fs.mkdir(item_dir, checkDirCreation);

      meta.media = fs.readdirSync(item_media_input).map((file_name, index) => {

        let image_data = {};

        let output_name = `${path.parse(file_name).name}.jpg`;
        let output_dir = `${item_dir}/${output_name}`;
        if (!process.argv.includes("skip-media")) {
          sharp(path.join(item_media_input, file_name))
            .toFile(`${item_dir}/${output_name}`, (err, info) => {
              if (err) throw err;
            });
        }

        var dimensions = sizeOf(path.join(item_media_input, file_name));


        image_data.width = dimensions.width;
        image_data.height = dimensions.height;
        image_data.src = output_dir.split("/static/").pop();
        return image_data
      })

    }

    return meta;

  });

  fs.writeFileSync(`json_source/${category.name}.json`, JSON.stringify(item_meta));

})


// Return every folder path and name inside a folder :)
function scanFolder(entry_path) {
  return fs.readdirSync(entry_path).map(file_name => {
    let file_path = path.join(entry_path, file_name),
      file_state = fs.statSync(file_path).isDirectory();
    if (file_state) return {
      name: file_name,
      path: file_path
    };
  });
}
// Check if folder exist inside with specific name
function hasElement(entry_path, name) {
  return fs.readdirSync(entry_path).some(file_name => {

    let file_path = path.join(entry_path, file_name),
      file_state = fs.statSync(file_path).isDirectory();

    if (file_name === name) return true;
    return false;

  })
}



function checkDirCreation(err) {
  if (err) {
    return console.error(err);
  }
}

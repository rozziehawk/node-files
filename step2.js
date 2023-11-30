const fs = require('fs');
const process = require('process');
const axios = require('axios');


const argv = process.argv;

//for (let i = 0; i < argv.length; i += 1) {
//  console.log(i, argv[i]);
//}

function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, 'utf8', function(err) {
      if (err) {
        console.error(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}


function cat(file_path, out)
{
    fs.readFile(file_path, 'utf8', function(err, data) {
    if (err) {
      // handle possible error
      console.error("Error reading ",file_path, "\n\t", err.message);
      // kill the process and tell the shell ft errored
      process.exit(1);
    }
    // otherwise success
    //console.log(`file contents: ${data}`);
    handleOutput(data, out)
    //console.log(data);
  });
}

async function webCat(url, out)
{
  try {
      let response = await axios.get(url);
      //console.log(response.data);
      handleOutput(response.data, out);
  } catch (err) {
      console.error(`Error fetching ${url}: ${err}`);
      process.exit(1);
  }

}

let path;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}


if (path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
  cat(path, out);
}

const fs = require('fs');

const argv = process.argv;

//for (let i = 0; i < argv.length; i += 1) {
//  console.log(i, argv[i]);
//}

const filePath = argv[2]; // first command line argument, first two argv's are path to node and path to this js file.

function cat(file_path)
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
    console.log(data);
  });
}

cat (filePath);
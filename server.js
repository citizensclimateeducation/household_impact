const express = require('express');
const app = express();

const dist_folder = express.static(__dirname + '/dist');

// fs.copyFile(`${express.static(__dirname)}/src/index.html`, `${dist_folder}/index.html`, (err) => {
//     if (err) throw err;
//     console.log('source.txt was copied to destination.txt');
// });

app.use(dist_folder);
app.listen(process.env.PORT || 8080);
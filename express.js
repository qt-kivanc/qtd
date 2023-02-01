const path = require('path');
const express = require('express');
const app = express(),
            DIST_DIR = __dirname + '/dist',
            HTML_FILE = path.join(DIST_DIR, 'index.html');
const portNumber = 4040;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE)
})

app.listen(portNumber, () => {
  console.log('------------------------------------------------------------');
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${DIST_DIR}/`);
});

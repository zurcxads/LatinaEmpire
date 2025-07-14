const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Simple Studio server that can be accessed via Replit
const express = require('express');
const path = require('path');

const app = express();
const port = 3333;

// Serve static files and Studio configuration
app.use(express.static(path.join(__dirname, 'node_modules/sanity/dist')));

// Basic route for Studio
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Latina Empire Studio</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <div id="sanity">
          <h1>Latina Empire Studio</h1>
          <p>Studio setup in progress...</p>
          <p>Use the Sanity web interface instead:</p>
          <a href="https://sanity.io/manage/personal/project/3yaebsnk" target="_blank">
            Open Sanity Studio →
          </a>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Studio server running on port ${port}`);
});
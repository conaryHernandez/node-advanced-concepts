const cluster = require('cluster');
const express = require('express');

const app = express();

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();

  cluster.fork();
  cluster.fork();
} else {
  function doWork(duration) {
    const start = Date.now();

    while (Date.now() - start < duration) {}
  }

  app.get('/', (req, res) => {
    doWork(5000);
    res.send('hi there');
  });

  app.get('/fast', (req, res) => {
    res.send('this was fast');
  });

  app.listen(5000);
}

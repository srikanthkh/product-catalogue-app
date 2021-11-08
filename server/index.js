const { App } = require('./app');

const port = 8000;

(async () => {
  const app = await App();
  app.listen(port, () => {
    console.log(`Products API listening at http://localhost:${port}`);
  });
})();

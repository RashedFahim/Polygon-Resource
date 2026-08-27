import app from './index.js';

const parsedPort = Number.parseInt(process.env.PORT || '5000', 10);
const port = Number.isInteger(parsedPort) ? parsedPort : 5000;

app.listen(port, () => {
  console.log(`Contact API listening on port ${port}`);
});

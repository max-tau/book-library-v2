const app = require("./src/app");

const APP_PORT = process.env.PORT || 3100;

app.listen(3100, () => {
  console.log(`App is listening on port ${APP_PORT}`);
});

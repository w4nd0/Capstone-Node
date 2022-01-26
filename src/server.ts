import app from './app';

const PORT = process.env.PORT;

import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

app.listen(PORT, () => {
    console.log(`App running in port ${PORT}`);
});
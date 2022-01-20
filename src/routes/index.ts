import { Router } from "express";
import productRouter from "./product.routes";
import userRouter from "./user.routes";

const routes = Router();

routes.use("/products", productRouter);
routes.use("/users", userRouter);

export default routes;

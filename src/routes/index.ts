import { Router } from "express";
import productRouter from "./product.routes";
import sessionRouter from "./session.routes";
import orderRouter from "./order.routes";
import userRouter from "./user.routes";

const routes = Router();

routes.use("/products", productRouter);
routes.use("/orders", orderRouter);
routes.use("/users", userRouter);
routes.use("/login", sessionRouter);

export default routes;

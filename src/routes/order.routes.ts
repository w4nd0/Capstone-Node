import { Router } from "express";
import { create } from "../controllers/Orders/createOrder";
import { destroy } from "../controllers/Orders/deleteOrder";
import { list } from "../controllers/Orders/listOrder";
import { retrieve } from "../controllers/Orders/retrieveOrder";
import { update } from "../controllers/Orders/updateOrder";

import admAuth from "../middlewares/authentication/admAuth";
import userAuth from "../middlewares/authentication/userAuth";
import { schemaValidate } from "../middlewares/validate/schemaValidate";
import { orderCreateSchema } from "../models/schemas/Order/orderCreate";
import { orderUpdateSchema } from "../models/schemas/Order/orderUpdate";

const orderRouter = Router();
orderRouter.use(userAuth);
orderRouter.get("/:id", retrieve);
orderRouter.post("", schemaValidate(orderCreateSchema), create);
orderRouter.delete("/:id", destroy);

orderRouter.use(admAuth);
orderRouter.get("", list);
orderRouter.patch("/:id", schemaValidate(orderUpdateSchema), update);

export default orderRouter;

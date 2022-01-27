import { Router } from "express";
import { create } from "../controllers/Orders/create";
import { destroy } from "../controllers/Orders/delete";
import { list } from "../controllers/Orders/list";
import { retrieve } from "../controllers/Orders/retrieve";
import { update } from "../controllers/Orders/update";
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
orderRouter.get("", list);

orderRouter.use(admAuth);
orderRouter.patch("/:id", schemaValidate(orderUpdateSchema), update);

export default orderRouter;

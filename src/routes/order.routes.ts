import { Router } from "express";
import { create } from "../controllers/Orders/createOrder";
import { destroy } from "../controllers/Orders/deleteOrder";
import { list } from "../controllers/Orders/listOrder";
import { retrieve } from "../controllers/Orders/retrieveOrder";
import { update } from "../controllers/Orders/updateOrder";

import { admAuth } from "../middlewares/authentication/admAuth";

const orderRouter = Router();

orderRouter.get("/:id", retrieve);
orderRouter.post("", create);
orderRouter.delete("/:id", destroy);

orderRouter.use(admAuth);
orderRouter.get("", list);
orderRouter.patch("/:id", update);

export default orderRouter;

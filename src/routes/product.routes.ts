import { Router } from "express";
import { create } from "../controllers/Products/createProduct";
import { destroy } from "../controllers/Products/deleteProduct";
import { list } from "../controllers/Products/listProduct";
import { retrive } from "../controllers/Products/retriveProduct";
import { update } from "../controllers/Products/updateProduct";

import admAuth from "../middlewares/authentication/admAuth";

const productRouter = Router();

productRouter.get("", list);
productRouter.get("/:id", retrive);

productRouter.use(admAuth);

productRouter.post("", create);
productRouter.patch("/:id", update);
productRouter.delete("/:id", destroy);

export default productRouter;

import { Router } from "express";
import { create } from "../controllers/Products/create";
import { destroy } from "../controllers/Products/delete";
import { list } from "../controllers/Products/list";
import { retrieve } from "../controllers/Products/retrieve";
import { update } from "../controllers/Products/update";

import { admAuth } from "../middlewares/authentication/admAuth";
import { schemaValidate } from "../middlewares/validate/schemaValidate";
import { productCreateSchema } from "../models/schemas/Product/productCreate";
import { productUpdateSchema } from "../models/schemas/Product/productUpdate";

const productRouter = Router();

productRouter.get("", list);
productRouter.get("/:id", retrieve);

productRouter.use(admAuth);

productRouter.post("", schemaValidate(productCreateSchema), create);
productRouter.patch("/:id", schemaValidate(productUpdateSchema), update);
productRouter.delete("/:id", destroy);

export default productRouter;

import { Router } from "express";
import CreateProductController from "../controllers/Products/createProduct";
import DeleteProductController from "../controllers/Products/deleteProduct";
import ListProductsController from "../controllers/Products/listProduct";
import RetriveProductController from "../controllers/Products/retriveProduct";
import UpdateProductController from "../controllers/Products/updateProduct";

import { admAuth } from "../middlewares/authentication/admAuth";
import userAuth from "../middlewares/authentication/userAuth";

const productRouter = Router();

productRouter.use(userAuth);

productRouter.get("", new ListProductsController().handle);
productRouter.get("/:id", new RetriveProductController().handle);

productRouter.post("", admAuth, new CreateProductController().handle);
productRouter.patch("/:id", admAuth, new UpdateProductController().handle);
productRouter.delete("/:id", admAuth, new DeleteProductController().handle);

export default productRouter;

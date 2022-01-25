import { Router } from "express";
import { create } from "../controllers/Addresses/create";
import { destroy } from "../controllers/Addresses/destroy";
import { list } from "../controllers/Addresses/list";
import { retrieve } from "../controllers/Addresses/retrieve";
import { update } from "../controllers/Addresses/update";
import userAuth from "../middlewares/authentication/userAuth";
import { schemaValidate } from "../middlewares/validate/schemaValidate";
import { addressCreateSchema } from "../models/schemas/Address/addressCreate";
import { addressUpdateSchema } from "../models/schemas/Address/addressUpdate";

const addressRouter = Router();
addressRouter.use(userAuth)

addressRouter.post("/", schemaValidate(addressCreateSchema), create);
addressRouter.get("/:id", retrieve);
addressRouter.get("/", list);
addressRouter.patch("/:id", schemaValidate(addressUpdateSchema), update);
addressRouter.delete("/:id", destroy);

export default addressRouter;

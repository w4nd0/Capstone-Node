import { Router } from "express";
import { login } from "../controllers/Session/login";
import { schemaValidate } from "../middlewares/validate/schemaValidate";
import { loginSchema } from "../models/schemas/Session/login";

const sessionRouter = Router();

sessionRouter.post("/", schemaValidate(loginSchema), login);

export default sessionRouter;

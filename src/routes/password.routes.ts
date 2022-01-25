import { Router } from "express";
import { sendPasswordResetToken } from "../controllers/Password/sendPasswordResetToken";
import { updatePassword } from "../controllers/Password/updatePassword";
import { schemaValidate } from "../middlewares/validate/schemaValidate";
import { changePasswordSchema } from "../models/schemas/Password/changePasswordSchema";
import { recoveryPasswordSchema } from "../models/schemas/Password/recoveryPasswordSchema";

const passwordRouter = Router();

passwordRouter.post("/recovery", schemaValidate(recoveryPasswordSchema), sendPasswordResetToken);
passwordRouter.post("/change_password", schemaValidate(changePasswordSchema), updatePassword);

export default passwordRouter;
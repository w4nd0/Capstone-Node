import { Router } from "express";
import { sendPasswordResetToken } from "../controllers/Password/sendPasswordResetToken";
import { updatePassword } from "../controllers/Password/updatePassword";

const passwordRouter = Router();

passwordRouter.post("/recovery", sendPasswordResetToken);
passwordRouter.post("/change_password", updatePassword);

export default passwordRouter;
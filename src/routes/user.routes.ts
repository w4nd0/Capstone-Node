import { Router } from "express";
import { create } from "../controllers/Users/create";
import { disable } from "../controllers/Users/disable";
import { list } from "../controllers/Users/list";
import { retrieve } from "../controllers/Users/retrieve";
import { update } from "../controllers/Users/update";
import { updateAdm } from "../controllers/Users/updateAdm";
import admAuth from "../middlewares/authentication/admAuth";
import userAuth from "../middlewares/authentication/userAuth";
import { schemaValidate } from "../middlewares/validate/schemaValidate";
import { admUpdateSchema } from "../models/schemas/User/admUpdate";
import { userCreateSchema } from "../models/schemas/User/userCreate";
import { userUpdateSchema } from "../models/schemas/User/userUpdate";

const userRouter = Router();

userRouter.post('/', schemaValidate(userCreateSchema), create);
userRouter.post('/disable', userAuth, disable);
userRouter.get('/profile', userAuth, retrieve);
userRouter.get('/', admAuth, list);
userRouter.patch('/profile', schemaValidate(userUpdateSchema), userAuth, update);
userRouter.patch('/update_adm', schemaValidate(admUpdateSchema), admAuth, updateAdm);

export default userRouter;
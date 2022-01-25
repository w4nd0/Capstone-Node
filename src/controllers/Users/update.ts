import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import UpdateUserService from "../../services/User/UpdateUser.service";

export const update = async (request: Request, response: Response) => {
    const updateUserService = new UpdateUserService();
    const user = await updateUserService.execute({
        id: request.user.id,
        userData: request.body,
    });
  
    return response.json(instanceToInstance(user));
};
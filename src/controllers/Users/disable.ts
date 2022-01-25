import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import DisableUserService from "../../services/User/DisableUser.service";

export const disable = async (request: Request, response: Response) => {
    const disableUserService = new DisableUserService();
    const disabledUser = await disableUserService.execute({
        id: request.user.id,
    });

    return response.json(instanceToInstance(disabledUser));
}
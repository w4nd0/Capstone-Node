import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import UpdateAdmService from "../../services/User/UpdateAdm.service";

export const updateAdm = async (request: Request, response: Response) => {
    const { email, isAdm } = request.body;

    const updateAdmService = new UpdateAdmService();
    const user = await updateAdmService.execute({
        email,
        isAdm,
    });
  
    return response.json(instanceToInstance(user));
};
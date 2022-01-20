import { Request, Response } from "express";
import RetrieveUserService from "../../services/User/RetriveUser.service";

export const retrieve = async (request: Request, response: Response) => {
    const retrieveUserService = new RetrieveUserService();
    const user = await retrieveUserService.execute({
        id: request.user.id
    });
  
    return response.json(user);
};
import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import ListUserService from "../../services/User/ListUser.service";

export const list = async (request: Request, response: Response) => {
    const listUserService = new ListUserService();
    const users = await listUserService.execute();
  
    return response.json(instanceToInstance(users));
};
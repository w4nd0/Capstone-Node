import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import CreateUserService from "../../services/User/CreateUser.service";

export const create = async (request: Request, response: Response) => {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
        name,
        email,
        password
    });
  
    return response.status(201).json(instanceToInstance(user));
};
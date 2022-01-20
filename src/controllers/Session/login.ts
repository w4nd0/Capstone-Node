import { Request, Response } from "express";
import AuthService from "../../services/Session/Auth.service";
import ActivateUserService from "../../services/User/ActivateUser.service";

export const login = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const activateUserService = new ActivateUserService();
    await activateUserService.execute({
        email,
        password,
    });

    const authUser = new AuthService();
    const tokenResponse = await authUser.execute({
        email,
        password,
    });

    return response.json(tokenResponse);
}
import { Response, Request } from "express";
import PasswordResetTokenService from "../../services/Password/PasswordRecovery.service";
import SendTokenEmailService from "../../services/Password/SendTokenEmail.service";

export const sendPasswordResetToken = async (request: Request, response: Response) => {
    const { email } = request.body;

    const passwordResetTokenService = new PasswordResetTokenService();
    const token = await passwordResetTokenService.execute({
        email,
    });

    const sendTokenEmailService = new SendTokenEmailService();
    await sendTokenEmailService.execute({
        token: token.token,
        email,
    });
    
    return response.json({ message: "Token sendded to your email." })
};

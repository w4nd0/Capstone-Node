import * as yup from "yup";

export const recoveryPasswordSchema = yup.object().shape({
    email: yup.string().email().required()
});
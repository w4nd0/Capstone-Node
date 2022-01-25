import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
    token: yup.string().required(),
    password: yup.string().min(8).required(),
    confirmation: yup.string().min(8).required()
});
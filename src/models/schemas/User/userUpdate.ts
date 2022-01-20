import * as yup from "yup";

export const userUpdateSchema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string().min(8),
});
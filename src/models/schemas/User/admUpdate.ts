import * as yup from "yup";

export const admUpdateSchema = yup.object().shape({
    email: yup.string().email().required(),
    isAdm: yup.boolean().required()
});
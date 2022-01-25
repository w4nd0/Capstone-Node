import * as yup from "yup";

export const productCreateSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required().positive(),
});

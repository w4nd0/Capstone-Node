import * as yup from "yup";

export const productCreateSchema = yup.object().shape({
  city: yup.string().required(),
  street: yup.string().required(),
  number: yup.number().required().positive(),
});
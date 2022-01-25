import * as yup from "yup";

export const productUpdateSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  price: yup.number().positive(),
});

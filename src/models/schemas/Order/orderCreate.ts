import * as yup from "yup";

export const orderCreateSchema = yup.object().shape({
  order: yup
    .object()
    .shape({
      city: yup.string().required(),
      street: yup.string().required(),
      number: yup.number().required().positive(),
    })
    .required(),
  products_ids: yup.array().of(yup.string()).required(),
});

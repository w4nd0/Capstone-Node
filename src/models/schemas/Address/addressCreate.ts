import * as yup from "yup";

export const addressCreateSchema = yup.object().shape({
  city: yup.string().required(),
  street: yup.string().required(),
  number: yup.number().required().positive(),
});
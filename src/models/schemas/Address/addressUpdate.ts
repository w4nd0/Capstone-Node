import * as yup from "yup";

export const addressUpdateSchema = yup.object().shape({
  city: yup.string(),
  street: yup.string(),
  number: yup.number().positive(),
});
import * as yup from "yup";

export const orderUpdateSchema = yup.object().shape({
  id: yup.string(),
  status: yup.string(),
});

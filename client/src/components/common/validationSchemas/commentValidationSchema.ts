import * as Yup from 'yup';

export const commentValidationSchema = Yup.object({
  comment: Yup.string()
    .required('Debe agregar un comentario')
    .min(5, 'El titulo debe tener al menos 5 caracteres')
    .max(255, 'El titulo debe tener maximo 255 caracteres'),
});

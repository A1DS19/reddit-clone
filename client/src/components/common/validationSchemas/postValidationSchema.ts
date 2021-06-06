import * as Yup from 'yup';

export const createPostValidationSchema = Yup.object({
  title: Yup.string()
    .required('Debe agregar un titulo')
    .min(5, 'El titulo debe tener al menos 5 caracteres')
    .max(255, 'El titulo debe tener maximo 255 caracteres'),
  body: Yup.string()
    .required('Debe agregar el contenido del post')
    .min(5, 'El contenido debe tener al menos 5 caracteres')
    .max(5000, 'El contenido debe tener maximo 5000 caracteres'),
});

import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .required('El email es requerido')
    .email('El email no tiene el formato correcto')
    .lowercase(),
  username: Yup.string()
    .required('El nombre de usuario es requerido')
    .min(5, 'Minimo 5 caracteres')
    .max(20, 'Maximo 20 caracteres'),
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(5, 'Minimo 5 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contrasenas deben ser iguales')
    .required('Repetir la contraseña es requerido'),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required('El email es requerido')
    .email('El email no tiene el formato correcto')
    .lowercase(),
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(5, 'Minimo 5 caracteres'),
});

export const requestPasswordReset = Yup.object({
  email: Yup.string()
    .required('El email es requerido')
    .email('El email no tiene el formato correcto')
    .lowercase(),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(5, 'Minimo 5 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contrasenas deben ser iguales')
    .required('Repetir la contraseña es requerido'),
});

import * as yup from 'yup'

export const RegisterPageSchemas=yup.object().shape({
    username: yup.string().required("Kullanıcı adı boş bırakılamaz."),
    password: yup.string().required("Şifre boş bırakılamaz.")
})
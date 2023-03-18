import * as Yup from "yup";

const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/;
const phoneRegExp = /\(?([0-9]{3})\)?([ -]?)([0-9]{3})\2([0-9]{4})/;

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required").label('Email address'),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required").matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9").label("Password"),
  });

  export const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required").label('Email address'),
  });

  export const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required").label('First Name'),
    lastName: Yup.string().required("Required").label('Last Name'),
    phone: Yup.string().matches(phoneRegExp, "Phone must be (000)-000-0000").label(`Phone number`),
    email: Yup.string().email("Invalid email address").required("Required").label('Email address'),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required").matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9").label("Password"),
  });

  export const EditeSchema = Yup.object().shape({
    firstName: Yup.string().required("Required").label('First Name'),
    lastName: Yup.string().required("Required").label('Last Name'),
    phone: Yup.string().matches(phoneRegExp, "Phone must be (000)-000-0000").label(`Phone number`),
  });


  export const ProfileShema = Yup.object().shape({
    firstName: Yup.string().required("Required").label('First Name'),
    lastName: Yup.string().required("Required").label('Last Name'),
    phone: Yup.string().matches(phoneRegExp, "Phone must be (000)-000-0000").label(`Phone number`),
   
  });

  export const PasswordChangeShema = Yup.object().shape({
    oldPassword:Yup.string().min(6, "Password must be at least 6 characters")
    .required("Required").matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9").label("Old password"),
    newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required").matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9").label("New password"),
    passwordConfirmation: Yup.string().min(6, "Password must be at least 6 characters")
    .required("Required").matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9").label("Confirmation password"),
  });

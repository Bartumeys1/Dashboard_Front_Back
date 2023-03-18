import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardHeader,
  TextField,
  Typography,
  CardContent,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Formik, Field } from "formik";
import { PasswordChangeShema } from "../../auth/validation";
import { useActions } from "../../../hooks/useActions";

const theme = createTheme();

const ChangePassword: React.FC<any> = ({ userEmail }) => {
  const [seePass, isShowPassword] = useState(false);

  const { ChangePassword } = useActions();
  const initialValuesPassword = {
    oldPassword: "",
    newPassword: "",
    passwordConfirmation: "",
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    isShowPassword(event.target.checked);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userPasswordModel = {
      email: userEmail,
      oldPassword: data.get("oldPassword"),
      newPassword: data.get("newPassword"),
      confirmPassword: data.get("passwordConfirmation"),
    };
    console.log("Profile password => ", userPasswordModel);
    ChangePassword(userPasswordModel);

  };

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CssBaseline />

        <Typography
          component="div"
          variant="body1"
          style={{
            width: "100%",
            position: "relative",
          }}
        ></Typography>

        <CardHeader subheader="Update password" title="Password" />
        <Formik
          initialValues={initialValuesPassword}
          onSubmit={() => {}}
          validationSchema={PasswordChangeShema}
        >
          {({ errors, touched, isSubmitting, isValid , dirty }) => (
            <Box
              onSubmit={handleSubmit}
              style={{ width: "100%", height: "370px" }}
              component="form"
              noValidate
              sx={{ mt: 0 }}
            >
              <CardContent>
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  type={seePass ? "" : "password"}
                  fullWidth
                  id="oldPassword"
                  label="Old password"
                  name="oldPassword"
                  autoComplete="oldPassword"
                />
                {errors.oldPassword && touched.oldPassword ? (
                  <div style={{ color: "red" }}>{errors.oldPassword}</div>
                ) : null}
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  type={seePass ? "" : "password"}
                  id="newPassword"
                  label="New password"
                  name="newPassword"
                  autoComplete="newPassword"
                />
                {errors.newPassword && touched.newPassword ? (
                  <div style={{ color: "red" }}>{errors.newPassword}</div>
                ) : null}
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  type={seePass ? "" : "password"}
                  id="passwordConfirmation"
                  label="Confirme password"
                  name="passwordConfirmation"
                  autoComplete="passwordConfirmation"
                />
                {errors.passwordConfirmation && touched.passwordConfirmation ? (
                  <div style={{ color: "red" }}>
                    {errors.passwordConfirmation}
                  </div>
                ) : null}
              </CardContent>

              
              <FormControlLabel
                control={<Checkbox onChange={handleChange} />}
                label="Show password"
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 2,
                }}
              >
                <Button
                  disabled={!(isValid && dirty)}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 0, mb: 0 }}
                >
                  {isSubmitting ? "Loading" : "Update password"}
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
      </Card>
    </ThemeProvider>
  );
};

export default ChangePassword;

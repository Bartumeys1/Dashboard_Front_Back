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
  Grid,
} from "@mui/material";
import { ProfileShema } from "../auth/validation";
import { Formik, Field } from "formik";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ChangePassword from "./password";
import { useActions } from "../../hooks/useActions";

const theme = createTheme();

const Profile: React.FC = () => {

  const { user } = useTypedSelector((state) => state.UserReducer);
  const { ChangeUserProfile } = useActions();
  const initialValues = {
    firstName: `${user.Name}`,
    lastName: `${user.Surname}`,
    email: `${user.Email}`,
    phone: `${user.PhoneNumber}`,
  };

  console.log(`init=> `,initialValues);
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userProfil = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      phone: data.get("phone"),
      email: user.Email,
    };

    ChangeUserProfile(userProfil);
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

          <CardHeader subheader="Information about you." title="Profile" />
          <Formik
            initialValues={initialValues}
            onSubmit={() => {}}
            validationSchema={ProfileShema}
          >
            {({ errors, touched, isSubmitting, isValid  , dirty}) => (
              <Box
                onSubmit={handleSubmit}
                style={{ width: "100%", height: "326px" }}
                component="form"
                noValidate
                sx={{ mt: 0 }}
              >
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First name"
                        name="firstName"
                        autoComplete="firstName"
                      />
                      {errors.firstName && touched.firstName ? (
                        <div style={{ color: "red" }}>{errors.firstName}</div>
                      ) : null}
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last name"
                        name="lastName"
                        autoComplete="lastName"
                      />
                      {errors.lastName && touched.lastName ? (
                        <div style={{ color: "red" }}>{errors.lastName}</div>
                      ) : null}
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <Field
                        as={TextField}
                        margin="normal"
                        disabled
                        required
                        fullWidth
                        id="email"
                        label="Email address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <Field
                        as={TextField}
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        autoComplete="phone"
                      />
                      {errors.phone && touched.phone ? (
                        <div style={{ color: "red" }}>{errors.phone}</div>
                      ) : null}
                    </Grid>
                  </Grid>
                </CardContent>
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
                    sx={{ mt: 1, mb: 0 }}
                  >
                    {isSubmitting ? "Loading" : "Save details"}
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        </Card>
        
        <ChangePassword userEmail={user.Email}/>
      </ThemeProvider>
  );
};

export default Profile;

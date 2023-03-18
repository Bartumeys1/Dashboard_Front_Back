import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { EditeSchema } from "../../auth/validation";
import { Formik, Field } from "formik";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";


const theme = createTheme();

const EditUser: React.FC = () => {
  const {GetAllUsers , UpdateUser} = useActions();
  const {currentUser} = useTypedSelector((state)=>state.UserReducer);
  const initialValues = { firstName: `${currentUser.name}`, lastName: `${currentUser.surname}`, phone: `${currentUser.phoneNumber}` };

   useEffect(()=>{
    GetAllUsers();
  },[]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const user = {
      email: currentUser.email,
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      phone: data.get("phone"),
    };

    UpdateUser(user);
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="div"
            variant="body1"
            style={{
              width: "100%",
              position: "relative",
            }}
          >
            <NavLink to="/dashboard/users">
              <Button startIcon={<ArrowBackIcon fontSize="small" />}>
                Users
              </Button>
            </NavLink>
          </Typography>

          <Typography component="h1" variant="h5">
            Edit user
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={() => {}}
            validationSchema={EditeSchema}
          >
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
              <Box
                onSubmit={handleSubmit}
                style={{ width: "100%", height: "326px" }}
                component="form"
                noValidate
                sx={{ mt: 1 }}
              >
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

                <Button
                  disabled={!(isValid&& dirty)}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isSubmitting ? "Loading" : "Save"}
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EditUser;

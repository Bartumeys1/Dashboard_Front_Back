import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Select from "@mui/material/Select";
import { RegistrationSchema } from "../../auth/validation";
import { Formik, Field } from "formik";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useActions } from "../../../hooks/useActions";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

const theme = createTheme();
const roles = ["Administrators", "Users"];

const Register: React.FC = () => {

  const {RegistrationUser} = useActions();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const user = {
      name: data.get("firstName"),
      surname: data.get("lastName"),
      email: data.get("email"),
      phoneNumber: data.get("phone"),
      password: data.get("password"),
      confirmPassword: data.get("password"),
      role: data.get("roles"),
    };
   
    RegistrationUser(user);
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
            Registration user
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={() => {}}
            validationSchema={RegistrationSchema}
          >
            {({ errors, touched, isSubmitting, isValid , dirty}) => (
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
                  label="Phone number"
                  name="phone"
                  autoComplete="phone"
                />
                {errors.phone && touched.phone ? (
                  <div style={{ color: "red" }}>{errors.phone}</div>
                ) : null}
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email address"
                  name="email"
                  autoComplete="email"
                />
                {errors.email && touched.email ? (
                  <div style={{ color: "red" }}>{errors.email}</div>
                ) : null}
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {errors.password && touched.password ? (
                  <div style={{ color: "red" }}>{errors.password}</div>
                ) : null}

                <FormControl sx={{ width: "100%", mt: 2 }}>
                  <InputLabel id="roles-select-label">Roles</InputLabel>
                  <Select
                    labelId="roles-select-label"
                    id="roles-select"
                    label="Roles"
                    name="roles"
                    fullWidth
                    defaultValue={roles[1]}
                    onChange={() => {}}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  disabled={!(isValid&& dirty)}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isSubmitting ? "Loading" : "Registrate"}
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;

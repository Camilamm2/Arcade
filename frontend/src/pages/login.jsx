import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { axiosApi } from "../api/axios";
import "../styles/Login.css";

const validationSchema = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
});

const Login = () => {
  const navigate = useNavigate();

  return (
    <Box className="login-container">
      <Card className="login-card">
        <CardContent>
          <Typography variant="h5" className="login-title" gutterBottom>
            Iniciar Sesión
          </Typography>

          <Formik
            initialValues={{ name: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const response = await axiosApi.post("/api/usuarios/crear", {
                  name: values.name,
                });

                navigate(`/user/${response.data.id}`, {
                  state: { id: response.data.id },
                });
              } catch (error) {
                console.error("Error:", error);
              }
            }}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Field
                  as={TextField}
                  label="Nombre"
                  name="name"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  className="login-input"
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="login-button"
                >
                  Ingresar
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

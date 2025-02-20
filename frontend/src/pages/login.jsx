import { useNavigate } from "react-router-dom"; // Importa el hook
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

const validationSchema = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
});

const Login = () => {
  const navigate = useNavigate(); // Hook para la redirección

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, rgb(102, 14, 126) 0%, rgb(37, 37, 157) 100%)",
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          padding: 4,
          boxShadow: 6,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }}
          >
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    backgroundColor: "rgba(120, 15, 172, 0.81)",
                    "&:hover": { backgroundColor: "rgb(102, 14, 126)" },
                  }}
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

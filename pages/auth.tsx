// React imports----------------------------
import { useState, useEffect } from "react";

// Third Libraries imports------------------
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";

// Next imports-----------------------------
import type { NextPage } from "next";
import { useRouter } from "next/router";

// Redux imports-----------------------------
import type { RootState } from "../Store";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../Features/Users";
import { setLoading } from "../Features/App";

// Mui imports------------------------------
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// styles import----------------------------
import styles from "../styles/Auth.module.css";

// components imports
import AppLoading from "../Components/AppLoading/AppLoading";

// utils import-----------------------------
import { Colors } from "../utils/Colors";
import { ToastTypes } from "../utils/Types";

// custom components------------------------
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.BgPrimary};
`;

const LoginBox = styled.div`
  width: 35%;
  max-width: 550px;
  min-width: 350px;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${Colors.BgSecondary};
`;

const Auth: NextPage = () => {
  // hooks------------------------------------
  const dispatch = useDispatch();
  const router = useRouter();

  // ---------------------------------------------------- states -----------------------------------------------------
  // global states----------------------------
  const users = useSelector((state: RootState) => state.user.users);
  const loading = useSelector((state: RootState) => state.app.loading);

  // controller states------------------------
  const [toast, setToast] = useState<ToastTypes>({
    type: "",
    visible: false,
    message: "",
  });
  const [authTab, setAuthTab] = useState<Number>(0);
  const [showPassword, setShowPassword]: any = useState(false);

  // form validation schemas-------------------
  const loginValidationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const signupValidationSchema = yup.object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  // form methods-------------------------
  const loginFormController = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const signupFormController = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // ---------------------------------------------------- methodes -----------------------------------------------------

  // effects ---------------------------------
  useEffect(() => {
    // check user LoggedIn
    if (!localStorage.getItem("user")) {
      router.push("/auth");
    }
  }, []);

  return (
    <Container>
      {loading && <AppLoading />}
      {/* ----- Toast Container ----- */}
      <Snackbar
        open={toast.visible}
        style={{ zIndex: "9999" }}
        autoHideDuration={7000}
        onClose={() => setToast({ ...toast, visible: false })}
      >
        <Alert
          onClose={() => setToast({ ...toast, visible: false })}
          severity={toast.type}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>

      <LoginBox>
        {/* ----- Form Title ----- */}
        <Typography color={Colors.Primary} variant="h4">
          Merhaba
        </Typography>

        {/* ----- Form SubTitle ----- */}
        <Typography variant="subtitle1" className={styles.card_subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>

        {/* ----- Form Tabs ----- */}
        <Box className={styles.card_tabs}>
          <Button
            onClick={() => setAuthTab(0)}
            className={authTab === 0 ? styles.auth_tab_selected : ""}
          >
            Login
          </Button>
          <Button
            onClick={() => setAuthTab(1)}
            className={authTab === 1 ? styles.auth_tab_selected : ""}
          >
            Signup
          </Button>
        </Box>

        {authTab === 0 ? (
          <form
            onSubmit={loginFormController.handleSubmit}
            className={styles.auth_form_wrapper}
          >
            {/* ----- Login Email ----- */}
            <TextField
              label="Email Address"
              variant="outlined"
              type={"email"}
              id="email"
              name="email"
              autoComplete="new-password"
              value={loginFormController.values.email}
              onChange={loginFormController.handleChange}
              error={
                loginFormController.touched.email &&
                Boolean(loginFormController.errors.email)
              }
              helperText={
                loginFormController.touched.email &&
                loginFormController.errors.email
              }
            />

            {/* ----- Login Password ----- */}
            <FormControl>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="new-password"
                value={loginFormController.values.password}
                onChange={loginFormController.handleChange}
                error={
                  loginFormController.touched.password &&
                  Boolean(loginFormController.errors.password)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {loginFormController.touched.password && (
                <FormHelperText error>
                  {loginFormController.errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {/* ----- Login Forgot Password ----- */}
            <Box className={styles.auth_forgot_password}>
              <Link color={Colors.Primary} href="#">
                Forgot Password
              </Link>
            </Box>

            {/* ----- Login Action Button ----- */}
            <Button
              className={styles.auth_form_submit}
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </form>
        ) : (
          <form
            onSubmit={signupFormController.handleSubmit}
            className={styles.auth_form_wrapper}
          >
            {/* ----- Signup FirstName ----- */}
            <TextField
              label="First Name"
              variant="outlined"
              type={"text"}
              name="first_name"
              value={signupFormController.values.first_name}
              onChange={signupFormController.handleChange}
              error={
                signupFormController.touched.first_name &&
                Boolean(signupFormController.errors.first_name)
              }
              helperText={
                signupFormController.touched.first_name &&
                signupFormController.errors.first_name
              }
            />

            {/* ----- Signup LastName ----- */}
            <TextField
              label="Last Name"
              variant="outlined"
              type={"text"}
              name="last_name"
              value={signupFormController.values.last_name}
              onChange={signupFormController.handleChange}
              error={
                signupFormController.touched.last_name &&
                Boolean(signupFormController.errors.last_name)
              }
              helperText={
                signupFormController.touched.last_name &&
                signupFormController.errors.last_name
              }
            />

            {/* ----- Signup Email ----- */}
            <TextField
              label="Email Address"
              variant="outlined"
              type={"email"}
              name="email"
              value={signupFormController.values.email}
              autoComplete="new-password"
              onChange={signupFormController.handleChange}
              error={
                signupFormController.touched.email &&
                Boolean(signupFormController.errors.email)
              }
              helperText={
                signupFormController.touched.email &&
                signupFormController.errors.email
              }
            />

            {/* ----- Signup Password ----- */}
            <FormControl>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                name="password"
                value={signupFormController.values.password}
                autoComplete="new-password"
                onChange={signupFormController.handleChange}
                error={
                  signupFormController.touched.password &&
                  Boolean(signupFormController.errors.password)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {signupFormController.touched.password && (
                <FormHelperText error>
                  {signupFormController.errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {/* ----- Signup Action Button ----- */}
            <Button
              className={styles.auth_form_submit}
              variant="contained"
              type="submit"
            >
              Signup
            </Button>
          </form>
        )}
      </LoginBox>
    </Container>
  );
};
export default Auth;

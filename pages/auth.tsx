// React imports----------------------------
import { useState, useEffect } from "react";

// Third Libraries imports------------------
import styled from "styled-components";

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
import {
  ToastTypes,
  LoginDataTypes,
  SignupDataTypes,
  LoginValidListTypes,
  SignupValidListTypes,
} from "../utils/Types";

// hooks imports----------------------------
import useLocalStorage from "../Hooks/useLocalstorage";

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

  const [inUsers, setInUsers] = useLocalStorage("users", users);

  // controller states------------------------
  const [toast, setToast] = useState<ToastTypes>({
    type: "",
    visible: false,
    message: "",
  });
  const [authTab, setAuthTab] = useState<Number>(0);
  const [showPassword, setShowPassword]: any = useState(false);
  const [errorStyles, setErrorStyles]: any = useState(true);

  // form data states-------------------------
  const [loginData, setLoginData] = useState<LoginDataTypes>({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState<SignupDataTypes>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // form validation states-------------------
  const [loginValidList, setLoginValidList] = useState<LoginValidListTypes>({
    email: false,
    password: false,
  });
  const [signupValidList, setSignupValidList] = useState<SignupValidListTypes>({
    first_name: false,
    last_name: false,
    email: false,
    password: false,
  });

  // ---------------------------------------------------- methodes -----------------------------------------------------
  // forms validator handler------------------
  const validator = () => {
    setErrorStyles(false);
    const emailRegex = /\S+@\S+\.\S+/;
    switch (authTab) {
      case 0:
        if (emailRegex.test(loginData.email) === false) {
          loginValidList.email = true;
        } else {
          loginValidList.email = false;
        }
        if (loginData.password.length === 0) {
          loginValidList.password = true;
        } else {
          loginValidList.password = false;
        }
        break;
      case 1:
        if (signupData.first_name.length === 0) {
          signupValidList.first_name = true;
        } else {
          signupValidList.first_name = false;
        }
        if (signupData.last_name.length === 0) {
          signupValidList.last_name = true;
        } else {
          signupValidList.last_name = false;
        }
        if (emailRegex.test(signupData.email) === false) {
          signupValidList.email = true;
        } else {
          signupValidList.email = false;
        }
        if (signupData.password.length === 0) {
          signupValidList.password = true;
        } else {
          signupValidList.password = false;
        }
        break;
      default:
        break;
    }
  };

  // forms submit handler---------------------
  const HandleLogin = () => {
    let prevent: Boolean = false;
    let isExist: Boolean = false;
    validator();
    // check fileds validation
    Object.values(loginValidList).map((logData) => {
      if (logData) {
        prevent = true;
        console.log("0");
      }
    });
    // check user exist
    if (!prevent) {
      users.map((user: any) => {
        // user exist
        if (
          user.email === loginData.email &&
          user.password === loginData.password
        ) {
          isExist = true;
          console.log("1");
        } else if (
          user.email === loginData.email &&
          user.password !== loginData.password
        ) {
          // incorrect password
          isExist = false;
          setToast({
            type: "error",
            visible: true,
            message: "Incorrect Password",
          });
          console.log("2");
        } else if (user.email !== loginData.email && !isExist) {
          // user not found
          isExist = false;
          setToast({
            type: "error",
            visible: true,
            message: "User Not Found",
          });
          console.log("3");
        }
      });
    }
    if (!prevent && isExist) {
      setToast({
        type: "success",
        visible: true,
        message: "You have successfully logged in!",
      });
      console.log("4");
      dispatch(setLoading(true));
      localStorage.setItem("user", JSON.stringify(loginData));
      setTimeout(() => {
        router.push("/dashboard");
        dispatch(setLoading(false));
      }, 3000);
    }
  };

  const HandleSignup = () => {
    let prevent: Boolean = false;
    let isExist: Boolean = false;
    validator();
    // check fileds validati
    Object.values(signupValidList).map((signData) => {
      if (signData) {
        prevent = true;
      }
    });
    // check user exist
    if (!prevent) {
      users.map((user: any) => {
        if (user.email === signupData.email) {
          setToast({
            type: "error",
            visible: true,
            message: "This email was registered by someone else",
          });
          isExist = true;
        }
      });
    }
    if (!prevent && !isExist) {
      let newUsers = [...users];
      newUsers.push(signupData);
      dispatch(setUsers(newUsers));
      setAuthTab(0);
      setToast({
        type: "success",
        visible: true,
        message: "Your information has been successfully registered.",
      });
    }
  };

  // effects ---------------------------------
  useEffect(() => {
    if (inUsers.length > 0) {
      dispatch(setUsers(inUsers));
    }
    // check user LoggedIn
    if (!localStorage.getItem("user")) {
      router.push("/auth");
    }
  }, []);

  useEffect(() => {
    if (!errorStyles) {
      setErrorStyles(true);
    }
  }, [errorStyles]);

  useEffect(() => {
    switch (authTab) {
      case 0:
        setSignupData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });
        setSignupValidList({
          first_name: false,
          last_name: false,
          email: false,
          password: false,
        });
        break;
      case 1:
        setLoginData({
          email: "",
          password: "",
        });
        setLoginValidList({
          email: false,
          password: false,
        });
      default:
        break;
    }
  }, [authTab]);

  useEffect(() => {
    if (users.length > 0) {
      setInUsers(users);
    }
  }, [users]);

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
          <Box className={styles.auth_form_wrapper}>
            {/* ----- Login Email ----- */}
            <TextField
              label="Email Address"
              variant="outlined"
              type={"email"}
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              error={errorStyles && loginValidList.email}
              helperText={
                loginValidList.email ? "Please Enter Your Email Address" : ""
              }
            />

            {/* ----- Login Password ----- */}
            <FormControl>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={loginData.password}
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                error={errorStyles && loginValidList.password}
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
              {loginValidList.password && (
                <FormHelperText error>
                  Please Enter your password
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
              onClick={HandleLogin}
              className={styles.auth_form_submit}
              variant="contained"
            >
              Login
            </Button>
          </Box>
        ) : (
          <Box className={styles.auth_form_wrapper}>
            {/* ----- Signup FirstName ----- */}
            <TextField
              label="First Name"
              variant="outlined"
              type={"text"}
              value={signupData.first_name}
              onChange={(e) =>
                setSignupData({ ...signupData, first_name: e.target.value })
              }
              error={errorStyles && signupValidList.first_name}
              helperText={
                signupValidList.first_name ? "Please Enter Your FirstName" : ""
              }
            />

            {/* ----- Signup LastName ----- */}
            <TextField
              label="Last Name"
              variant="outlined"
              type={"text"}
              value={signupData.last_name}
              onChange={(e) =>
                setSignupData({ ...signupData, last_name: e.target.value })
              }
              error={errorStyles && signupValidList.last_name}
              helperText={
                signupValidList.last_name ? "Please Enter Your LastName" : ""
              }
            />

            {/* ----- Signup Email ----- */}
            <TextField
              label="Email Address"
              variant="outlined"
              type={"email"}
              value={signupData.email}
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              error={errorStyles && signupValidList.email}
              helperText={
                signupValidList.email ? "Please Enter Your Email Address" : ""
              }
            />

            {/* ----- Signup Password ----- */}
            <FormControl>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
                error={errorStyles && signupValidList.password}
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
              {signupValidList.password && (
                <FormHelperText error>
                  Please Enter your password
                </FormHelperText>
              )}
            </FormControl>

            {/* ----- Signup Action Button ----- */}
            <Button
              onClick={HandleSignup}
              className={styles.auth_form_submit}
              variant="contained"
            >
              Signup
            </Button>
          </Box>
        )}
      </LoginBox>
    </Container>
  );
};
export default Auth;

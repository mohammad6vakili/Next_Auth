// React imports----------------------------
import { useState } from "react";

// styles import----------------------------
import styles from "../../styles/Auth.module.css";

// Next imports-----------------------------
import type { NextPage } from "next";

// Hooks imports--------------------------
import useAuth from "../../hooks/use_auth";

// Mui imports------------------------------
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

// utils import-----------------------------
import { Colors } from "../../utils/colors";

// component imports------------------------
import { Container } from "../../components/container";
import { AuthBox } from "../../components/auth_box";
import AuthFormTabs from "../../components/auth_form_tabs";
import { useSelector } from "react-redux";

const Login: NextPage = () => {
  const loading = useSelector((state: RootState) => state.app.loading);

  // hooks ---------------------------------------------
  const { loginFormController }: any = useAuth();

  // states --------------------------------------------
  const [showPassword, setShowPassword]: any = useState(false);

  return (
    <Container>
      <AuthBox>
        {/* ----- Form Title ----- */}
        <Typography color={Colors.Primary} variant="h4">
          Merhaba
        </Typography>

        {/* ----- Form SubTitle ----- */}
        <Typography variant="subtitle1" className={styles.card_subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>

        {/* ----- Form Tabs ----- */}
        <AuthFormTabs />
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
      </AuthBox>
    </Container>
  );
};
export default Login;

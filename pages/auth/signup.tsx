// React imports----------------------------
import { useState } from "react";

// Next imports-----------------------------
import type { NextPage } from "next";

// Hooks imports----------------------------
import useAuth from "../../Hooks/useAuth";

// Mui imports------------------------------
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// styles import----------------------------
import styles from "../../styles/Auth.module.css";

// utils import-----------------------------
import { Colors } from "../../utils/Colors";

// component imports------------------------
import { Container } from "../../Components/Container/Container";
import { AuthBox } from "../../Components/AuthBox/AuthBox";
import AuthFormTabs from "../../Components/AuthFormTabs/Index";

const Signup: NextPage = () => {
  // hooks ---------------------------------------
  const { signupFormController }: any = useAuth();

  // states ---------------------------------------
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
      </AuthBox>
    </Container>
  );
};
export default Signup;

// styles imports ---------------------------
import styles from "../styles/Dashboard.module.css";

// Hooks imports --------------------------
import useAuth from "../hooks/use_auth";

// Next imports -----------------------------
import { NextPage } from "next";

// Redux imports ----------------------------
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

// Mui imports ------------------------------
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// component imports ------------------------
import { Container } from "../components/container";
import { AuthBox } from "../components/auth_box";

const Panel: NextPage = () => {
  // hooks ---------------------------------------------
  const { handleLogout }: any = useAuth();

  // global states -------------------------------------
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Container>
      <AuthBox>
        <Typography className="panel-user-email" variant="h6">
          Hello {user?.email}
        </Typography>
        <Button
          id="panel-logout-button"
          className={styles.logout_button}
          variant="contained"
          onClick={handleLogout}
          color="error"
        >
          LOGOUT
        </Button>
      </AuthBox>
    </Container>
  );
};
export default Panel;

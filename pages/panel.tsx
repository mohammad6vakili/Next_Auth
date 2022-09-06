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

const Panel: NextPage = () => {
  // hooks ---------------------------------------------
  const { handleLogout }: any = useAuth();

  // global states -------------------------------------
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Container>
      <div>
        <Typography variant="h6">Hello {user?.email}</Typography>
        <Button
          className={styles.logout_button}
          variant="contained"
          onClick={handleLogout}
          color="error"
        >
          LOGOUT
        </Button>
      </div>
    </Container>
  );
};
export default Panel;

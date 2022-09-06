// styles imports ---------------------------
import styles from "../styles/Dashboard.module.css";

// Hooks imports --------------------------
import useAuth from "../Hooks/useAuth";

// Next imports -----------------------------
import { NextPage } from "next";

// Redux imports ----------------------------
import { useSelector } from "react-redux";
import { RootState } from "../App/Store";

// Mui imports ------------------------------
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// component imports ------------------------
import { Container } from "../Components/Container/Container";

const Dashboard: NextPage = () => {
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
export default Dashboard;

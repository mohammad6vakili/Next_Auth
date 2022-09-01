// React imports ----------------------------
import { useState, useEffect } from "react";

// Next imports -----------------------------
import { NextPage } from "next";
import { useRouter } from "next/router";

// Third Libraries imports ------------------
import styled from "styled-components";

// Mui imports ------------------------------
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// utils imports ----------------------------
import { Colors } from "../utils/Colors";

// styles imports ---------------------------
import styles from "../styles/Dashboard.module.css";

// custom components ------------------------
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.BgPrimary};
`;

const WellcomeCard = styled.div`
  width: 35%;
  min-width: 350px;
  height: 200px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Dashboard: NextPage = () => {
  // hooks ---------------------------------------------
  const router = useRouter();

  // ---------------------------------------------------- states -----------------------------------------------------
  // states --------------------------------------------
  const [user, setUser]: any = useState();

  // ---------------------------------------------------- methods ----------------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth");
  };

  // effects -------------------------------------------
  useEffect(() => {
    // check user LoggedIn
    if (!localStorage.getItem("user")) {
      router.push("/auth");
    }
    // get user data
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    }
  }, []);

  return (
    <Container>
      <WellcomeCard>
        <Typography variant="h6">Hello {user?.email}</Typography>
        <Button
          className={styles.logout_button}
          variant="contained"
          onClick={handleLogout}
          color="error"
        >
          LOGOUT
        </Button>
      </WellcomeCard>
    </Container>
  );
};
export default Dashboard;

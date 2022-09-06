import React from "react";
import styles from "../../styles/Auth.module.css";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function AuthFormTabs() {
  const router = useRouter();
  return (
    <Box className={styles.card_tabs}>
      <Button
        id="login-tab-btn"
        onClick={() => router.push("/auth/login")}
        className={
          router.pathname === "/auth/login" ? styles.auth_tab_selected : ""
        }
      >
        Login
      </Button>
      <Button
        id="signup-tab-btn"
        onClick={() => router.push("/auth/signup")}
        className={
          router.pathname === "/auth/signup" ? styles.auth_tab_selected : ""
        }
      >
        Signup
      </Button>
    </Box>
  );
}

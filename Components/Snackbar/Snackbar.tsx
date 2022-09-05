import React, { useState } from "react";
import { ToastTypes } from "../../utils/Types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Snackbar() {
  const [toast, setToast] = useState<ToastTypes>({
    type: "",
    visible: false,
    message: "",
  });
  return (
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
  );
}

// React imports ----------------------------
import { useEffect, useState } from "react";

// Next imports -----------------------------
import { useRouter } from "next/router";

// Redux imports ----------------------------
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setUser, setUsers } from "../features/users";
import { setLoading } from "../features/app";

// Third Party Libraries imports ------------
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

export default function useAuth() {
  // hooks ---------------------------------------------
  const router = useRouter();
  const dispatch = useDispatch();

  // global states -------------------------------------
  const users = useSelector((state: RootState) => state.user.users);
  const user = useSelector((state: RootState) => state.user.user);

  // ---------------------------------------------------- Login ------------------------------------------------------
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

  const loginFormController = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      let errorMessage: string = "";
      let isExist: Boolean = false;
      if (users.length === 0) {
        // there's no user
        errorMessage = "User Not Found";
      } else {
        users.map((user: any) => {
          // user exist
          if (
            user.email === values.email &&
            user.password === values.password
          ) {
            isExist = true;
          } else if (
            user.email === values.email &&
            user.password !== values.password
          ) {
            // incorrect password
            isExist = false;
            errorMessage = "Incorrect Password";
          } else if (user.email !== values.email && !isExist) {
            // user not found
            isExist = false;
            errorMessage = "User Not Found";
          }
        });
      }
      if (isExist) {
        dispatch(setLoading(true));
        setTimeout(() => {
          dispatch(setLoading(false));
          dispatch(setUser(values));
          toast.success("Login Successfully");
          router.push("/panel");
        }, 3000);
      } else {
        toast.error(errorMessage);
      }
    },
  });

  // ---------------------------------------------------- Signup -----------------------------------------------------
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

  const signupFormController = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      let message: string = "";
      let alreadyExist: Boolean = false;
      let newUsers: any = [...users];
      if (!alreadyExist) {
        users.map((user: any) => {
          if (user.email === values.email) {
            alreadyExist = true;
            message = "Someone has already registered with this email.";
          }
        });
      }
      if (!alreadyExist) {
        dispatch(setLoading(true));
        setTimeout(() => {
          dispatch(setLoading(false));
          newUsers.push(values);
          dispatch(setUsers(newUsers));
          toast.success("Your information has been successfully registered.");
        }, 3000);
      } else {
        toast.error(message);
      }
    },
  });

  // ---------------------------------------------------- Logout ------------------------------------------------------
  const handleLogout = () => {
    router.push("/auth/login");
    toast.error("You are logged out");
    dispatch(setUser(null));
  };

  // ------------------------------------------------------ User ------------------------------------------------------
  const checkUserIsLogged = () => {
    dispatch(setLoading(false));
    if (user) {
      router.push("/panel");
    } else {
      if (router.pathname !== "/auth/signup") router.push("/auth/login");
    }
  };

  // --------------------------------------------------- Effects -----------------------------------------------------

  useEffect(() => {
    checkUserIsLogged();
  }, []);

  useEffect(() => {
    loginFormController.resetForm();
    signupFormController.resetForm();
  }, [router.pathname]);

  // exports ---------------------------------------------
  const values: any = {
    loginFormController,
    signupFormController,
    handleLogout,
    checkUserIsLogged,
  };

  return values;
}

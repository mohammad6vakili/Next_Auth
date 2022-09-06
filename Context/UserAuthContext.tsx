// React imports ----------------------------
import React, { useEffect, createContext } from "react";

// Next imports -----------------------------
import { useRouter } from "next/router";

// Redux imports ----------------------------
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../App/Store";
import { setUser, setUsers } from "../Features/Users";

// Third Party Libraries imports ------------
import { useFormik } from "formik";
import * as yup from "yup";

// Types ------------------------------------
type UserAuthContextProviderProps = {
  children: React.ReactNode;
};

// create context ---------------------------
export const UserAuthContext = createContext(null);

export const UserAuthContextProvider = ({
  children,
}: UserAuthContextProviderProps) => {
  // global states -------------------------------------
  const users = useSelector((state: RootState) => state.user.users);

  // hooks ---------------------------------------------
  const router = useRouter();
  const dispatch = useDispatch();

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
      let canLogin: Boolean = true;
      users.map((user: any) => {
        if (user.email !== values.email) {
          alert("User Not Found!");
          canLogin = false;
        } else if (
          user.email === values.email &&
          user.password !== values.password
        ) {
          alert("Incorrect Password");
          canLogin = false;
        }
      });
      if (canLogin) {
        alert("Login successfully...Wellcome");
        dispatch(setUser(values));
        router.push("/panel");
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
      let alreadyExist: Boolean = false;
      let newUsers: any = [...users];
      if (!alreadyExist) {
        users.map((user: any) => {
          if (user.email === values.email) {
            alreadyExist = true;
            alert("Already Exist!");
          }
        });
      }
      if (!alreadyExist) {
        newUsers.push(values);
        dispatch(setUsers(newUsers));
        alert("success");
      }
    },
  });

  // ---------------------------------------------------- Users ------------------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  // --------------------------------------------------- Effects -----------------------------------------------------
  useEffect(() => {
    loginFormController.resetForm();
    signupFormController.resetForm();
  }, [router.pathname]);

  // exports ---------------------------------------------
  const value: any = {
    loginFormController,
    signupFormController,
    handleLogout,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

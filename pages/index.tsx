// React imports
import { useEffect } from "react";

// Next imports
import { useRouter } from "next/router";
import { NextPage } from "next";

const Index: NextPage = () => {
  const router = useRouter();
  // effects -------------------------
  useEffect(() => {
    // check user auth
    if (localStorage.getItem("user") && localStorage.getItem("user") !== "{}") {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
  }, []);
  return <div>Redirecting...</div>;
};
export default Index;

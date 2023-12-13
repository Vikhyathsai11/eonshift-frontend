"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useSigninCheck } from "reactfire";

import LoadingPage from "~/shared/custom/loading-page";

import { auth } from "~/lib/firebase";

const Login = () => {
  const router = useRouter();
  const { data: signInData, status } = useSigninCheck();
  const [signInStatus, setSignInStatus] = useState("default");

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (status === "success" && signInData?.signedIn) {
      router.push("/dashboard");
    }
  }, [signInData, status, router]);

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        "ashfaqnisar00@gmail.com",
        "secretPassword",
      );
      console.log(userCredential.user);
      router.push("/dashboard");
      setSignInStatus("logged-in");
    } catch (error) {
      console.error(error);
    }
  };

  if (status === "loading") {
    return <LoadingPage title={"Loading..."} />;
  }

  if (status === "success" && signInData?.signedIn) {
    return (
      <LoadingPage
        title={"Loading..."}
        description={
          signInStatus === "logged-in"
            ? "Logging In..."
            : "Already Logged In, Redirecting..."
        }
      />
    );
  }
  return (
    <div className="p-2">
      <h2>Login</h2>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 rounded-md text-white bg-gradient-to-r font-bold from-[#2e026d] to-[#15162c]"
          onClick={handleSignIn}
        >
          Login
        </button>
        <button
          className="px-4 py-2 rounded-md text-white bg-gradient-to-r font-bold from-[#2e026d] to-[#15162c]"
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;

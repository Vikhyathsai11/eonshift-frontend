"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useSigninCheck } from "reactfire";

import Message from "~/shared/message";

import { auth } from "~/lib/firebase";

const Login = () => {
  const router = useRouter();
  const { data: signInData, status } = useSigninCheck();

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (status === "success" && signInData?.signedIn) {
      router.push("/dashboard");
    }
  }, [signInData, status, router]);

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        "ashfaqnisar00@gmail.com",
        "secretPassword",
      );
      console.log(userCredential.user);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      // Handle errors here, such as showing an error message to the user
    }
  };

  if (status === "loading") {
    return <Message title={"Loading..."} />;
  }

  if (signInData?.signedIn) {
    return (
      <Message
        title={"Loading..."}
        description={"Already Logged In, Redirecting..."}
      />
    );
  }

  return (
    <div className="p-2">
      <h2>Login</h2>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 rounded-md text-white bg-gradient-to-r font-bold from-[#2e026d] to-[#15162c]"
          onClick={signIn}
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

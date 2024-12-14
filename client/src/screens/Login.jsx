import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "../config/firebase.js";
import { useUserContext } from "../context/UserContext.jsx";
function Login() {
  const {user}=useUserContext();
  // const signInWithGoogle = async () => {
  //   try {
  //     await signInWithPopup(auth, provider);
  //   } catch (error) {
  //     console.error("Error signing in with Google:", error);
  //   }
  // };
  return (
  <div>
    <h1>Login</h1>
  </div>
  );
}

export default Login;

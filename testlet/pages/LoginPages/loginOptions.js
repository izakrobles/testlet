import { React, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import { auth } from "../../firebase/clientApp";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const google = new GoogleAuthProvider();
const pasUser = getAuth();
const handleGoogle = async () => {
  try {
    await signInWithRedirect(auth, google);
  } catch (error) {
    console.error(error);
  }
};

function LoginOptions() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        Router.push("/account");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>Login Options</h1>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <div>
        <h3 onClick={handleGoogle}>Login with Google</h3>
        <p>&nbsp;</p>
        <Link href="/login">Login With Email and Password</Link>
      </div>

      <h1>{user != null && user.displayName}</h1>
    </>
  );
}

export default LoginOptions;

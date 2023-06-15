import { React, useState, useRef } from "react";
import { auth } from "../firebase/clientApp";
import { GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Loading from "./components/loading";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userState, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const pwShowHideRefLogin = useRef(null);
  const pwShowHideRefSignup = useRef(null);
  const google = new GoogleAuthProvider();
  google.addScope("https://www.googleapis.com/auth/userinfo.profile");

  if (userState) {
    window.location.href = "/";
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleGoogle = () => {
    signInWithRedirect(auth, google);
  };

  /* Toggles between showing password text and hiding password in input field */
  const handleShowHideClick = (eyeIcon) => {
    const pwFields = document.querySelectorAll(".password-field");
    pwFields.forEach((password) => {
      if (password.type === "password") {
        password.type = "text";
        eyeIcon.current.classList.remove("bx-hide");
        eyeIcon.current.classList.add("bx-show");
      } else {
        password.type = "password";
        eyeIcon.current.classList.remove("bx-show");
        eyeIcon.current.classList.add("bx-hide");
      }
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginForm = document.querySelector("#login-form");
    if (!loginForm) {
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        window.location.href;
        loginForm.querySelector(".error").innerHTML = "";
      })
      .catch((err) => {
        loginForm.querySelector(".error").innerHTML = err.message;
      });
  };

  /* returns to the login page */
  const handleReturnToLogin = (e) => {
    e.preventDefault();
    window.location.href = "/login";
  };

  /* opens up the register form */
  const handleRegisterLink = (e) => {
    e.preventDefault();
    const container = document.querySelector(".container");
    if (container) {
      container.classList.toggle("show-signup");
    }
  };

  /* opens up the forgot password form */
  const handleForgotPwdLink = (e) => {
    e.preventDefault();
    const container = document.querySelector(".container");
    if (container) {
      container.classList.toggle("show-forgotpwd");
    }
  };

  /* Collect all input fields in register form and attempts to register the user */
  const handleRegister = async (e) => {
    e.preventDefault();
    const signupForm = document.querySelector("#signup-form");
    if (!signupForm) {
      return;
    }

    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-pwd"].value;
    const name = signupForm["signup-name"].value;
    const confirmPassword = signupForm["confirm-pwd"].value;

    if (password !== confirmPassword) {
      signupForm.querySelector(".error").innerHTML =
        "Entered passwords are not the same";
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        console.log(cred);
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        signupForm.querySelector(".error").innerHTML = "";
      })
      .catch((err) => {
        signupForm.querySelector(".error").innerHTML = err.message;
      });
  };

  return (
    <>
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>

      <body class="my-login">
        <section id="forms-section" class="container forms">
          <div class="form login">
            <div class="form-content">
              <header class="form-header">Login</header>
              <form id="login-form" action="#">
                <div class="field input-field">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="field input-field">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    class="password-field"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    class="bx bx-hide eye-icon"
                    ref={pwShowHideRefLogin}
                    onClick={() => handleShowHideClick(pwShowHideRefLogin)}
                  />
                </div>
                <div class="form-link">
                  <a href="#" onClick={handleForgotPwdLink}>
                    Forgot Password?
                  </a>
                </div>
                <div class="field button-field">
                  <button onClick={handleLogin}>Login</button>
                </div>
                <p class="error pink-text center-align" />
                <div class="form-link">
                  <span> Don't have an account? </span>
                  <a href="#" onClick={handleRegisterLink}>
                    Register Here
                  </a>
                </div>
              </form>
            </div>
            <div class="form-line" />
            <div class="media-options">
              <a href="#" class="field google">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK5q0FP74VV9wbfwP378_7kj7iDomHuKrxkXsxDdUT28V9dlVMNUe-EMzaLwaFhneeuZI&usqp=CAU"
                  alt=""
                  class="google-icon"
                />
                <span onClick={handleGoogle}>Login with Google</span>
              </a>
            </div>
          </div>

          <div class="form signup">
            <div class="form-content">
              <header class="form-header">Signup</header>
              <form id="signup-form" action="#">
                <div class="field input-field">
                  <input
                    type="text"
                    placeholder="Name"
                    id="signup-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div class="field input-field">
                  <input
                    type="email"
                    placeholder="Email"
                    id="signup-email"
                    class="input"
                    required
                  />
                </div>
                <div class="field input-field">
                  <input
                    type="password"
                    placeholder="Password"
                    id="signup-pwd"
                    class="password-field"
                    required
                  />
                  <i
                    class="bx bx-hide eye-icon"
                    ref={pwShowHideRefSignup}
                    onClick={() => handleShowHideClick(pwShowHideRefSignup)}
                  />
                </div>
                <div class="field input-field">
                  <input
                    type="password"
                    placeholder="Password"
                    id="confirm-pwd"
                    class="password-field"
                    required
                  />
                </div>

                <div class="field button-field">
                  <button onClick={handleRegister}>Sign up</button>
                </div>
                <p class="error pink-text center-align" />
                <div class="form-link">
                  <span> Already have an account? </span>
                  <a href="#" onClick={handleRegisterLink}>
                    Login Here
                  </a>
                </div>
              </form>
            </div>
            <div class="form-line" />
            <div class="media-options">
              <a href="#" class="field google">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK5q0FP74VV9wbfwP378_7kj7iDomHuKrxkXsxDdUT28V9dlVMNUe-EMzaLwaFhneeuZI&usqp=CAU"
                  alt=""
                  class="google-icon"
                />
                <span onClick={handleGoogle}>Login with Google</span>
              </a>
            </div>
          </div>

          <div class="form forgotpwd">
            <div class="form-content">
              <header class="form-header">Password Recovery</header>
              <form id="recover-form" action="#">
                <div>
                  <h1 class="recovery-text">
                    You forgot your password? We don't know it either. Make a
                    new account with a different email or Sign in with Google.{" "}
                  </h1>
                </div>
                <div class="field button-field">
                  <button onClick={handleReturnToLogin}>Return to Login</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </body>
    </>
  );
}

export default Login;

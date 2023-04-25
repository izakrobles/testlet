import { React, useState, useRef } from "react";
import { auth } from "../firebase/clientApp";
import { GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import Loading from "./components/loading";

const google = new GoogleAuthProvider();
google.addScope("https://www.googleapis.com/auth/userinfo.profile");
const handleGoogle = () => {
  signInWithRedirect(auth, google);
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userState, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const pwShowHideRef = useRef(null);

  if (userState) {
    window.location.href = "/";
  }

  const handleShowHideClick = () => {
    const pwFields = document.querySelectorAll(".password");
    pwFields.forEach((password) => {
      if (password.type === "password") {
        password.type = "text";
        pwShowHideRef.current.classList.remove("bx-hide");
        pwShowHideRef.current.classList.add("bx-show");
      } else {
        password.type = "password";
        pwShowHideRef.current.classList.remove("bx-show");
        pwShowHideRef.current.classList.add("bx-hide");
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

  const handleRefresh = (e) => {
    e.preventDefault();
    window.location.href = "/login";
  };

  const handleRegisterLink = (e) => {
    e.preventDefault();
    const container = document.querySelector(".container");
    if (container) {
      container.classList.toggle("show-signup");
    }
  };

  const handleForgotPwdLink = (e) => {
    e.preventDefault();
    const container = document.querySelector(".container");
    if (container) {
      container.classList.toggle("show-forgotpwd");
    }
  };

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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    class="bx bx-hide eye-icon"
                    ref={pwShowHideRef}
                    onClick={handleShowHideClick}
                  ></i>
                </div>

                <div class="form-link">
                  <a href="#" onClick={handleForgotPwdLink}>
                    Forgot Password?
                  </a>
                </div>

                <div class="field button-field">
                  <button onClick={handleLogin}>Login</button>
                </div>

                <p class="error pink-text center-align"></p>

                <div class="form-link">
                  <span> Don't have an account? </span>
                  <a href="#" onClick={handleRegisterLink}>
                    Register Here
                  </a>
                </div>
              </form>
            </div>

            <div class="form-line"></div>

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
                  ></input>
                </div>

                <div class="field input-field">
                  <input
                    type="password"
                    placeholder="Password"
                    id="signup-pwd"
                    class="password"
                    required
                  ></input>
                  <i
                    class="bx bx-hide eye-icon"
                    ref={pwShowHideRef}
                    onClick={handleShowHideClick}
                  ></i>
                </div>

                <div class="field input-field">
                  <input
                    type="password"
                    placeholder="Password"
                    id="confirm-pwd"
                    class="password"
                    required
                  ></input>
                  <i
                    class="bx bx-hide eye-icon"
                    ref={pwShowHideRef}
                    onClick={handleShowHideClick}
                  ></i>
                </div>

                <div class="field button-field">
                  <button onClick={handleRegister}>Sign up</button>
                </div>

                <p class="error pink-text center-align"></p>

                <div class="form-link">
                  <span> Already have an account? </span>
                  <a href="#" onClick={handleRegisterLink}>
                    Login Here
                  </a>
                </div>
              </form>
            </div>

            <div class="form-line"></div>

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
                    {" "}
                    You forgot your password? We don't know it either. Make a
                    new account with a different email or Sign in with Google.{" "}
                  </h1>
                </div>

                <div class="field button-field">
                  <button onClick={handleRefresh}>Return to Login</button>
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

import { React, useState, useRef } from "react";
import { auth } from "../../firebase/clientApp"
import { GoogleAuthProvider, EmailAuthCredential } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithRedirect } from "firebase/auth";

const google = new GoogleAuthProvider();
const pasUser = getAuth();
const handleGoogle = () => {
    signInWithRedirect(auth, google)
};  

function LoginOptions() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const formsRef = useRef(null);
    const pwShowHideRef = useRef(null);
    const linksRef = useRef(null);

    const handleShowHideClick = () => {
        const pwFields = pwShowHideRef.current.parentElement.parentElement.querySelectorAll('.password');
        pwFields.forEach((password) => {
        if (password.type === 'password') {
            password.type = 'text';
            pwShowHideRef.current.classList.replace('bx-hide', 'bx-show');
            return;
        }
        password.type = 'password';
        pwShowHideRef.current.classList.replace('bx-show', 'bx-hide');
        });
    };

    const handleLinkClick = (e) => {
        e.preventDefault();
        if (formsRef.current !== null) {
            const registrationForm = formsRef.current.querySelector('.signup');
            registrationForm.classList.toggle('show-signup');
        }
    };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await signInWithEmailAndPassword(auth, email, password); // updated this line
        } catch (error) {
        console.log(error.message);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    if (loading) {
    return <p>Loading...</p>;
    }

    if (error) {
    return <p>Error: {error}</p>;
    }
    
    return (
        <>
            <head>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
            </head>

            <body class ="my-login">
                <section class="container forms">
                    <div class="form login">
                        <div class="form-content">
                            <header class="form-header">Login</header>
                            <form action="#">
                                <div class="field input-field">
                                    <input type="email" placeholder="Email" class="input"></input>
                                </div>

                                <div class="field input-field">
                                    <input type="password" placeholder="Password" class="password"></input>
                                    <i class="bx bx-hide eye-icon" ref={pwShowHideRef} onClick={handleShowHideClick}></i>
                                </div>

                                <div class="form-link">
                                    <a href="#" class="forgot-pwd">Forgot Password?</a>
                                </div>

                                <div class="field button-field">
                                    <button>Login</button>
                                </div>

                                <div class="form-link">
                                    <span> Don't have an account?</span><a href="#" class="link signup-link" ref={linksRef} onClick={handleLinkClick}> Register Here</a>
                                </div>

                            </form>
                        </div>

                        <div class="form-line"></div>

                        <div class="media-options">
                            <a href="#" class="field google">
                            <img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK5q0FP74VV9wbfwP378_7kj7iDomHuKrxkXsxDdUT28V9dlVMNUe-EMzaLwaFhneeuZI&usqp=CAU" alt="" class="google-icon"/>
                            <span onClick={handleGoogle}>Login with Google</span>
                            </a>
                        </div>
                    </div>

                    <div class="form signup">
                        <div class="form-content">
                            <header class="form-header">Signup</header>
                            <form action="#">
                                <div class="field input-field">
                                    <input type="email" placeholder="Email" class="input"></input>
                                </div>

                                <div class="field input-field">
                                    <input type="password" placeholder="Password" class="password"></input>
                                    <i class="bx bx-hide eye-icon" ref={pwShowHideRef} onClick={handleShowHideClick}></i>
                                </div>

                                <div class="field input-field">
                                    <input type="password" placeholder="Password" class="password"></input>
                                    <i class="bx bx-hide eye-icon" ref={pwShowHideRef} onClick={handleShowHideClick}></i>
                                </div>

                                <div class="field button-field">
                                    <button>Sign up</button>
                                </div>

                                <div class="form-link">
                                    <span> Already have an account?</span><a href="#" class="link login-link" ref={linksRef} onClick={handleLinkClick}> Login Here</a>
                                </div>

                            </form>
                        </div>

                        <div class="form-line"></div>

                        <div class="media-options">
                            <a href="#" class="field google">
                            <img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK5q0FP74VV9wbfwP378_7kj7iDomHuKrxkXsxDdUT28V9dlVMNUe-EMzaLwaFhneeuZI&usqp=CAU" alt="" class="google-icon"/>
                            <span onClick={handleGoogle}>Login with Google</span>
                            </a>
                        </div>
                    </div>
                </section>
                <script>
                    
                </script>
            </body>
        </>
        
    
    );
};


export default LoginOptions;



import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  async function formSubmission(event) {
    event.preventDefault();
    const emailValue = emailRef.current.value;
    const passValue = passwordRef.current.value;
    setIsLoading(true);
    if (isLogin) {
    } else {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKU4q2CTZZAoZ5TqdKPLlU7bJIwmX0kJs",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailValue,
              password: passValue,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          if (res.ok) {
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed";
              if (data && data.error && data.error.message) {
                //if we have data, and data has an error object with some message proprety, then we make our errorMessage equal to that message.
                errorMessage = data.error.message;
              }
              alert(errorMessage);
            });
          }
        });
      } catch {}
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={formSubmission}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

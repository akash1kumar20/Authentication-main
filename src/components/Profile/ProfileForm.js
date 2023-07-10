import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const history = useHistory();
  const cartCtx = useContext(AuthContext);
  const passwordRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const passwordEntered = passwordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAKU4q2CTZZAoZ5TqdKPLlU7bJIwmX0kJs",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: cartCtx.token,
          password: passwordEntered,
          returnSecureToken: false,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      history.replace("/");
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;

import { useRef, useState } from "react";

function SignUp() {
  const firebaseUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMXLt-J5iYfSnoScMk3jUVLJyAMAve50E";
  const emailRef = useRef();
  const passwordRef = useRef();

  function onSignUp() {
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      returnSecureToken: true
    }
    fetch(firebaseUrl,{
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()) // body+headers+http status code+time
      .then(body => {
        let today = new Date(); // uus tänane kuupäev praeguse kellaajaga
        let expirationDate = new Date(today.getTime()+body.expiresIn*1000);
        const userData = {
          token: body.idToken,
          expires: expirationDate
        }
        sessionStorage.setItem("userData", JSON.stringify(userData))
      });
  }

  return (
    <div>
      <label>Email</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Parool</label> <br />
      <input ref={passwordRef} type="password" /> <br />
      <button onClick={() => onSignUp()}>Registreeri</button>
    </div>
    )
}

export default SignUp;
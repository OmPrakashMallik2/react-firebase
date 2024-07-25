import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const signup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        console.log(userCredentials);
      }
    );
  };
  return (
    <div>
      <form onSubmit={signup}>
        <h1>Create new account</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default SignUp;

import React, { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const signin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
        console.log(userCredentials);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signout = () => {
    signOut(auth).then((res) => {
      console.log(res);
      setUser(null);
    });
  };

  useEffect(() => {
    const userState = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => userState();
  }, []);

  return (
    <div>
      <form onSubmit={signin}>
        <h1>Login to your account</h1>
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
        <button type="submit">Sign In</button>
        {user ? (
          <div>
            <h1>Hello {user.email}</h1>
            <button onClick={signout}>Sign out</button>
          </div>
        ) : (
          <h1>Invalid email or password!</h1>
        )}
      </form>
    </div>
  );
}

export default SignIn;

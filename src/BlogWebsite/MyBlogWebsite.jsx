import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import Nav from "./Nav";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

function MyBlogWebsite() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <div className="container p-4 mx-auto">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default MyBlogWebsite;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

function MyBlogWebsite() {
  return (
    <div className="container p-4 mx-auto">
      <Router>
        <div className="">
          <h1 className="text-green-600 font-bold text-3xl text-center">
            Your Blog
          </h1>
        </div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default MyBlogWebsite;

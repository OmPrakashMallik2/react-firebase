import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";

function MyApp() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default MyApp;

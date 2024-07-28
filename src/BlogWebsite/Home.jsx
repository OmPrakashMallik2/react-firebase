import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import CreatePost from "./CreatePost";
import AllBlogs from "./AllBlogs";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/signin");
      }
    });
  });

  const signout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="my-8 p-4 bg-white rounded shadow">
      <div className="py-5 flex justify-between items-center">
        <div className="flex gap-3">
          <Avatar alt="Remy Sharp" />
          <h1 className="text-xl font-bold">{user.email}</h1>
        </div>
        <div className="flex gap-5">
          <CreatePost />
          <Button onClick={signout} variant="contained">
            Log out
          </Button>
        </div>
      </div>
      <div>
        <AllBlogs />
      </div>
    </div>
  );
}

export default Home;

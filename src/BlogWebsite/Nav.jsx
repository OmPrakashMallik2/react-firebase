import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="my-2 p-4 bg-neutral-200 rounded shadow">
      <div className="flex">
        <div className="w-3/5 items-center">
          <h1 className="text-green-600 font-bold text-3xl">
            Blogging Website
          </h1>
        </div>
        <div className="flex justify-around text-xl font-bold w-2/5 items-center">
          <Link className="hover:text-blue-500" to="/">
            Home
          </Link>
          <Link className="hover:text-blue-500" to="/createpost">
            Create Post
          </Link>
          <Link className="hover:text-blue-500" to="/signin">
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;

import React, { useEffect, useState } from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { db } from "./firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [users, setUsers] = useState([]);

  const addData = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: name,
        age: age,
      });
      console.log(docRef.id);
    } catch (error) {
      console.log("Got some problem: " + error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(usersData);
      console.log(users);
    };

    getData();
  }, []);

  return (
    <div className="p-10">
      <div>
        {users.map((user) => (
          <div key={user.id}>{user.name} - {user.age}</div>
        ))}
      </div>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Your name here"
      />
      <input
        onChange={(e) => setAge(e.target.value)}
        type="number"
        placeholder="Your age here"
      />

      <button onClick={addData}>Add data</button>

      {/* <SignUp /> */}
      {/* <SignIn /> */}
    </div>
  );
}

export default App;

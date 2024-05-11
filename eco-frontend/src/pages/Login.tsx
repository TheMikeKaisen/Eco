import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
const Login = () => {
  const [gender, setGender] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const loginHandler = async() => {
    try {

      const provider = new GoogleAuthProvider()

      const {user} = await signInWithPopup(auth, provider) // extracting user to store in mongo db

      console.log(user)
      
    } catch (error) {
      toast.error("Sign In Failed")
    }
  }
  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>

        <div>
          <label htmlFor="">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="">Male</option>
            <option value="">Female</option>
          </select>
        </div>

        <div>
          <label htmlFor="">Date of birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
            <p>Already Signed In Once</p>
            <button onClick={loginHandler}>
                <FcGoogle /><span>Sign in with google</span>
            </button>
        </div>
      </main>
    </div>
  );
};

export default Login;

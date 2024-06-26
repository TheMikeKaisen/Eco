import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate()
  const [gender, setGender] = useState("");
  const [date, setDate] = useState<string>("");

  const [login] = useLoginMutation()


  const loginHandler = async() => {
    try {
      const provider = new GoogleAuthProvider()
      
      const {user} = await signInWithPopup(auth, provider) // extracting user to store in mongo db
      
      
      const res = await login({
        name: user.displayName!, 
        email: user.email!, 
        photo: user.photoURL!, 
        gender: gender, 
        role: "user", 
        dob: date, 
        _id: user.uid
      })
      console.log(res.data)

      
      if(res &&  res.data !== undefined){
        navigate("/");
        toast.success(res.data.message)
      }else{

        const error = res.error as FetchBaseQueryError
        const message = (error.data as MessageResponse).message
        console.log(error)
        toast.error(message)
      }

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
          <select value={gender} onChange={(e) => {
            setGender(e.target.value)
            
            }}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
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
            <p>Already Signed In Once??</p>
            <button onClick={loginHandler}>
                <FcGoogle /><span>Sign in with google</span>
            </button>
        </div>
      </main>
    </div>
  );
};

export default Login;

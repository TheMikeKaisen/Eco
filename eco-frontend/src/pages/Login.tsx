import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [gender, setGender] = useState<string>("");
  const [date, setDate] = useState<string>("");
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
            <button>
                <FcGoogle /><span>Sign in with google</span>
            </button>
        </div>
      </main>
    </div>
  );
};

export default Login;

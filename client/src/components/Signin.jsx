import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/singin', { name, email, password });

      if (res.status === 201) {
        navigate('/');
      } else {
        console.error("Value incorrect");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center m-auto">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <div className="bg-slate-900 text-white text-center py-2 rounded-t-md">
          Sign In
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="email"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div className="button">
          <button
            className="w-full bg-slate-900 m-auto text-center text-white mt-4 h-10 rounded-md hover:bg-slate-600"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;

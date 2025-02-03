import { useState } from "react";
import InputField from "../AuthSections/InputField";
import Button from "./Button";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const AuthForm = ({ isLogin, setIsLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
      <h2 className="header pb-3 text-center mb-6">{isLogin ? "Login" : "Sign Up"}</h2>

      {!isLogin && (
        <InputField
          type="text"
          placeholder="Full Name"
          icon={<FaUser />}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      )}

      <InputField
        type="email"
        placeholder="Email Address"
        icon={<FaEnvelope />}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <InputField
        type="password"
        placeholder="Password"
        icon={<FaLock />}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <Button label={isLogin ? "Login" : "Sign Up"} onClick={() => alert("Submitting...")} />

      <p className="text-center mt-4 text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={toggleForm} className="text-blue-500 ml-1">
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;

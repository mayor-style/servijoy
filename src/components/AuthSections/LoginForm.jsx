import { useState } from "react";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Email Input */}
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="p-3 border rounded-md"
        onChange={handleChange}
        required
      />

      {/* Password Input */}
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        className="p-3 border rounded-md"
        onChange={handleChange}
        required
      />

      {/* Submit Button */}
      <button type="submit" className="btn-blue">
        Login
      </button>

      {/* Forgot Password */}
      <p className="text-sm text-gray-500 text-center">
        Forgot password? <a href="#" className="text-blue-600">Reset</a>
      </p>
    </form>
  );
};

export default LoginForm;

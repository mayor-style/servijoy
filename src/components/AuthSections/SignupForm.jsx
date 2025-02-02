import { useState } from "react";

const SignupForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up with:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name Input */}
      <input
        type="text"
        name="name"
        placeholder="Enter your full name"
        className="p-3 border rounded-md"
        onChange={handleChange}
        required
      />

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

      {/* Confirm Password */}
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        className="p-3 border rounded-md"
        onChange={handleChange}
        required
      />

      {/* Submit Button */}
      <button type="submit" className="btn-green">
        Sign Up
      </button>

      {/* Already have an account */}
      <p className="text-sm text-gray-500 text-center">
        Already have an account? <a href="#" className="text-blue-600">Login</a>
      </p>
    </form>
  );
};

export default SignupForm;

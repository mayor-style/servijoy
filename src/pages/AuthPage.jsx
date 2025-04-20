import { useState } from "react";
import AuthForm from "../components/AuthSections/AuthForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <h1 className="sr-only">{isLogin ? "Login" : "Sign Up"}</h1>
      <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
    </div>
  );
};

export default AuthPage;
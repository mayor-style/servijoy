import { useState } from "react";
import AdminAuthForm from "../components/AdminAuthForm";

const AdminAuthPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <h1 className="sr-only">Admin Authentication</h1>
      <AdminAuthForm />
    </div>
  );
};

export default AdminAuthPage;
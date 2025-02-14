
import { useAuth } from "../../../context/AuthContext";
import UserDashboardHome from "../user/UserDashboardHome";
import VendorDashboardHome from "../vendor/VendorDashboardHome";

const DashboardHome = () => {
  const { user } = useAuth(); // Get user data from context

  if (!user) {
    return <div>Loading...</div>;
  }

  return user.role === "vendor" ? <VendorDashboardHome /> : <UserDashboardHome />;
};

export default DashboardHome;

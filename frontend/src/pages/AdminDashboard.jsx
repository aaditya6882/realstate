import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import AdminOverview from "./admin/AdminOverview";
import ManageListings from "./admin/ManageListings";
import ManageUsers from "./admin/ManageUsers";
import AdminAnalytics from "./admin/AdminAnalytics";
import PasswordSecurity from "./user/PasswordSecurity";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="listings" element={<ManageListings />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<PasswordSecurity />} />
      </Routes>
    </AdminLayout>
  );
}

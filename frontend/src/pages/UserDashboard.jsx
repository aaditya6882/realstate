import { Routes, Route } from "react-router-dom";
import UserLayout from "../components/UserLayout";
import UserOverview from "./user/UserOverview";
import SavedProperties from "./user/SavedProperties";
import BookedViewings from "./user/BookedViewings";
import PasswordSecurity from "./user/PasswordSecurity";

export default function UserDashboard() {
  return (
    <UserLayout>
      <Routes>
        <Route index element={<UserOverview />} />
        <Route path="saved" element={<SavedProperties />} />
        <Route path="viewings" element={<BookedViewings />} />
        <Route path="password" element={<PasswordSecurity />} />
      </Routes>
    </UserLayout>
  );
}

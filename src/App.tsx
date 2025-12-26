import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import DashboardLayout from "./components/layout/DashboardLayout";

import DashboardHome from "./pages/dashboard/DashboardHome";
import Drugs from "./pages/Drugs";
import MyAppointments from "./pages/MyAppointments";
import CreateDrug from "./pages/CreateDrug";
import BookAppointment from "./pages/BookAppointment";
import DrugReceipt from "./pages/DrugReceipt";
import DrugPurchaseHistory from "./pages/DrugPurchaseHistory";
import CreateConsultation from "./pages/CreateConsultation";
import Consultations from "./pages/Consultations";
import Appointments from "./pages/MyAppointments";
import Appointmentss from "./pages/Appointmentss";
import LandingPage from "./pages/LandingPage";


export default function App() {
  const isAuth = !!localStorage.getItem("token");

  return (
    <Routes>
       <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        element={isAuth ? <DashboardLayout /> : <Navigate to="/login" />}
      >
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/appointments" element={<MyAppointments />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="/drugs" element={<Drugs />} />
        <Route path="/create-drug" element={<CreateDrug />} />
        <Route path="/drug-history" element={<DrugPurchaseHistory />} />
<Route path="/receipt/:id" element={<DrugReceipt />} />
<Route
  path="/create-consultation"
  element={<CreateConsultation />}
/>
<Route path="/consultations" element={<Consultations />} />
<Route path="/appointments" element={<Appointmentss />} />



      </Route>

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

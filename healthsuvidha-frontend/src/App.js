

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

/* Public Pages */
import Home from "./pages/Home";
import About from "./pages/About";
import Helpline from "./pages/Helpline";

/* Auth Pages */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* Dashboard */
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import InsurancePlan from "./pages/InsurancePlan";
import Cart from "./pages/Cart";

/* Services */
import Medicine from "./pages/Medicine";
import Insurance from "./pages/Insurance";
import Blood from "./pages/Blood";
import MedicineDetails from "./pages/MedicineDetails";

/* Appointments */
// import Appointments from "./pages/Appointments";
import MyAppointments from "./pages/MyAppointments";
import BookAppointment from "./pages/BookAppointment";
import ConfirmAppointment from "./pages/ConfirmAppointment";

/* Doctors */
import DoctorsList from "./pages/DoctorsList"; // ✅ CORRECT

/* Reports */
import Reports from "./pages/Reports";
import ReportDetails from "./pages/ReportDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/helpline" element={<Helpline />} />
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/insurance/:planType" element={<InsurancePlan />} />
        {/* Services */} 
        <Route path="/medicine" element={<Medicine />} />
        <Route
          path="/appointments"
          element={<Navigate to="/my-appointments" replace />}
        />
        <Route path="/medicine/:name" element={<MedicineDetails />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/blood" element={<Blood />} />
        {/* Appointments */}
        {/* <Route path="/appointments" element={<Appointments />} /> */}
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/confirm-appointment" element={<ConfirmAppointment />} />
        {/* Doctors */}
        <Route path="/doctors" element={<DoctorsList />} /> {/* ✅ FIX */}
        {/* Reports */}
        <Route path="/reports" element={<Reports />} />
        <Route path="/report-details" element={<ReportDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

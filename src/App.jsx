import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./assets/style/theme";
import SignIn from "./views/SigIn";
import Unauthorized from "./views/Unauthorized";

// Employee
import AttendanceTracking from "./views/employee/AttendanceTracking";
import AttendanceHistory from "./views/employee/AttendanceHistory";

// Super admin
import ActiveAdminManagement from "./views/super-admin/ActiveAdminManagement";
import NonActiveAdmin from "./views/super-admin/NonActiveAdmin";
import ErrorLog from "./views/super-admin/ErrorLog";

// Admin
import DashboardAdmin from "./views/admin/DashboardAdmin";
import ProtectedRoute from "./services/ProtectedRoutes";
import EmployeeManagement from "./views/admin/EmployeeManagement";
import InactiveEmployeeManagement from "./views/admin/InactiveEmployeeManagement";
import ChangePassword from "./views/admin/ChangePassword";

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Link to="/login">Login</Link>} />
            <Route path="/login" element={<SignIn />} />

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />} >
                <Route path="/admin" element={<DashboardAdmin />} />
                <Route path="/admin/dashboard" element={<DashboardAdmin />} />
                <Route path="/admin/employee-management/active" element={<EmployeeManagement />} />
                <Route path="/admin/employee-management/inactive" element={<InactiveEmployeeManagement />} />
                <Route path="/admin/change-password" element={<ChangePassword />} />
            </Route>

            {/* Super Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['super_admin']} />} >
                <Route path="/super-admin" element={<ActiveAdminManagement />} />
                <Route path="/super-admin/admin-management/active" element={<ActiveAdminManagement />} />
                <Route path="/super-admin/admin-management/non-active" element={<NonActiveAdmin />} />
                <Route path="/super-admin/error-log" element={<ErrorLog />} />
                <Route path="/super-admin/change-password" element={<ChangePassword />} />
            </Route>

            {/* Employee Routes */}
            <Route element={<ProtectedRoute allowedRoles={['employee']} />} >
                <Route path="/employee" element={<AttendanceTracking />} />
                <Route path="/employee/take-attendance" element={<AttendanceTracking />} />
                <Route path="/employee/attendance-history" element={<AttendanceHistory />} />
                <Route path="/employee/change-password" element={<ChangePassword />} />
            </Route>

            {/* Unauthorized */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App

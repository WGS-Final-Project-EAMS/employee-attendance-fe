import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from "./assets/style/theme";
import SignIn from "./views/SigIn";
import Unauthorized from "./views/Unauthorized";

// Employee
import AttendanceTracking from "./views/employee/AttendanceTracking";
import AttendanceHistory from "./views/employee/AttendanceHistory";
import DashboardEmployee from "./views/employee/DashboardEmployee";
import ApplicationForPermit from "./views/employee/ApplicationForPermit";
import PermissionApproval from "./views/employee/PermissionApproval";
import PermissionHistory from "./views/employee/PermissionHistory";

// Super admin
import AdminManagement from "./views/super-admin/AdminManagement";
import ErrorLog from "./views/super-admin/ErrorLog";
import DashboardSuperAdmin from "./views/super-admin/DashboardSuperAdmin";

// Admin
import DashboardAdmin from "./views/admin/DashboardAdmin";
import ProtectedRoute from "./services/ProtectedRoutes";
import EmployeeManagement from "./views/admin/EmployeeManagement";
import InactiveEmployeeManagement from "./views/admin/InactiveEmployeeManagement";
import ChangePassword from "./views/admin/ChangePassword";
import OfficeSettings from "./views/admin/OfficeSettings";
import AttendanceRecap from "./views/admin/AttendanceRecap";

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/login" element={<SignIn />} />

            {/* Super Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['super_admin']} />} >
                <Route path="/super-admin" element={<AdminManagement />} />
                <Route path="/super-admin/dashboard" element={<DashboardSuperAdmin />} />
                <Route path="/super-admin/admin-management" element={<AdminManagement />} />
                <Route path="/super-admin/error-log" element={<ErrorLog />} />
                <Route path="/super-admin/change-password" element={<ChangePassword role="super_admin" />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />} >
                <Route path="/admin" element={<DashboardAdmin />} />
                <Route path="/admin/dashboard" element={<DashboardAdmin />} />
                <Route path="/admin/employee-management" element={<EmployeeManagement />} />
                <Route path="/admin/settings/office" element={<OfficeSettings />} />
                <Route path="/admin/attendance-records" element={<AttendanceRecap />} />
                <Route path="/admin/change-password" element={<ChangePassword role="admin"/>} />
            </Route>

            {/* Employee Routes */}
            <Route element={<ProtectedRoute allowedRoles={['employee']} />} >
                <Route path="/employee" element={<AttendanceTracking />} />
                <Route path="/employee/dashboard" element={<DashboardEmployee />} />
                <Route path="/employee/take-attendance" element={<AttendanceTracking />} />
                <Route path="/employee/attendance-history" element={<AttendanceHistory />} />
                <Route path="/employee/application-for-permit" element={<ApplicationForPermit />} />
                <Route path="/employee/permission-approval" element={<PermissionApproval />} />
                <Route path="/employee/permission-history" element={<PermissionHistory />} />
                <Route path="/employee/change-password" element={<ChangePassword role="employee" />} />
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

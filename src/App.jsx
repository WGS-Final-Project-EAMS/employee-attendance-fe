import SignIn from "./views/SigIn";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./assets/style/theme";
import { userLogout } from './services/auth';
import { goToPage } from "./services/pageController";
import AttendanceTracking from "./views/employee/AttendanceTracking";
import AttendanceHistory from "./views/employee/AttendanceHistory";
import ProtectedRoute from "./services/ProtectedRoutes";
import Unauthorized from "./views/Unauthorized";

const Admin = () => {
  const onLogout = () => {
    goToPage('/login', 1500);
  };

  const handleLogout = () => {
    userLogout(onLogout);
  }
  return (
    <>
      <h1>Admin</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

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
                <Route path="/admin" element={<Admin />} />
            </Route>

            {/* Super Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['super_admin']} />} >
                <Route path="/super-admin" element={<h1>Super Admin</h1>} />
            </Route>

            {/* Employee Routes */}
            <Route element={<ProtectedRoute allowedRoles={['employee']} />} >
                <Route path="/employee" element={<AttendanceTracking />} />
                <Route path="/employee/take-attendance" element={<AttendanceTracking />} />
                <Route path="/employee/attendance-history" element={<AttendanceHistory />} />
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

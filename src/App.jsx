import SignIn from "./views/SigIn";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./assets/style/theme";
import { userLogout } from './services/auth';
import { goToPage } from "./services/pageController";
// import ProtectedRoute from "./services/ProtectedRoutes";

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
            {/* <Route path="/admin" element={<Admin />} /> */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/super-admin" element={<h1>Super Admin</h1>} />
            <Route path="/employee" element={<h1>Employee</h1>} />
            {/* <Route element={<ProtectedRoute />} >
            </Route> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App

import LoginPage from "./views/LoginPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./assets/style/theme"

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Link to="/login">Login</Link>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<h1>Admin</h1>} />
            <Route path="/super-admin" element={<h1>Super Admin</h1>} />
            <Route path="/employee" element={<h1>Employee</h1>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App

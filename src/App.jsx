import LoginPage from "./views/LoginPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Link to="/login">Login</Link>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<h1>Admin</h1>} />
          <Route path="/super-admin" element={<h1>Super Admin</h1>} />
          <Route path="/employee" element={<h1>Employee</h1>} />
        </Routes> 
      </BrowserRouter>
    </>
  )
}

export default App

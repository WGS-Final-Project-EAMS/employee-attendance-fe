import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { token } from "../services/url";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding JWT tokens
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SignInForm from '../components/SignInForm';
import Copyright from '../components/Copyright';
import MainLayout from '../layouts/MainLayout';
import ModalElement from "../components/elements/ModalElement";
import { ModalActionEmployee } from "../components/elements/ModalActionContent";
import { Button } from "@mui/material";

export default function SignIn() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);

    useEffect(() => {

      if (token) {
          try {
              // Decode the token to get the payload
              const payload = jwtDecode(token);
              
              // Redirect based on role
              switch (payload.roles) {
                  case 'admin':
                      navigate('/admin', { replace: true });
                      break;
                  case 'super_admin':
                      navigate('/super-admin', { replace: true });
                      break;
                  case 'employee':
                      navigate('/employee', { replace: true });
                      break;
                  default:
                      navigate('/login', { replace: true });
                      break;
              }
          } catch (error) {
              console.log("Invalid token:", error);
              // You might want to clear the invalid token and redirect to login page
              Cookies.remove("token");
              navigate('/login', { replace: true });
          }
      }
    }, [navigate]);
  
    const handleOpenModal = () => {
      setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
    };
  
  return (
    <MainLayout>
      <Grid item xs={5} sx={{ backgroundColor:"primary.dark", minHeight: '100vh', paddingLeft:8 }}>
        <Typography component="h1" variant="h3" sx={{ mt:11 }} color="primary.contrastText">
          NGABSEN
        </Typography>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Button onClick={handleOpenModal}>
            <Typography component="h1" variant="h3" color="secondary">
              Welcome back!
            </Typography>
          </Button>
        </Box>
      </Grid>
      <Grid item xs={7}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          px: 30, pt: 8
        }}>
        <Box
          gap={2}
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Typography component="h1" variant="h4" color="primary.dark">
            Sign in
          </Typography>
          <Typography component="h1" variant="subtitle1" gutterBottom>
            Sign in to your account
          </Typography>

          {/* Tabs for switching between admin and employee sign-in */}
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="sign-in tabs">
            <Tab label="Employee" />
            <Tab label="Admin" />
          </Tabs>

          {/* Pass the selected role to SignInForm */}
          <SignInForm role={tabValue === 0 ? 'employee' : 'admin'} />

        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        {/* Modal */}
        <ModalElement openModal={openModal} handleCloseModal={handleCloseModal} modalTitle="Create New Employee"
          renderModalContent={
              () => <ModalActionEmployee modalType="create-rahasia" handleOpenModal={handleOpenModal} />
          }/>
      </Grid>
    </MainLayout>
  );
}

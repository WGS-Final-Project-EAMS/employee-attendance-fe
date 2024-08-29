import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { token } from "../services/url";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding JWT tokens
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SignInForm from '../components/SignInForm';
import Copyright from '../components/Copyright';
import MainLayout from '../layouts/MainLayout';

export default function SignIn() {
  const navigate = useNavigate();

    useEffect(() => {

      if (token) {
          try {
              // Decode the token to get the payload
              const payload = jwtDecode(token);
              
              // Redirect based on role
              switch (payload.role) {
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
          <Typography component="h1" variant="h3" color="secondary">
            Welcome back!
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={7}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          px: 30, pt: 16
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
          <SignInForm />
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Grid>
    </MainLayout>
  );
}

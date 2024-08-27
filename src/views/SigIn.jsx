import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SignInForm from '../components/SignInForm';
import Copyright from '../components/Copyright';
import MainLayout from '../layouts/MainLayout';

export default function SignIn() {
  return (
    <MainLayout>
      <Grid item xs={5} sx={{ backgroundColor:"primary.dark", minHeight: '100vh', paddingLeft:8 }}>
        <Typography component="h1" variant="h3" sx={{ mt:11 }} color="primary.contrastText">
          EAMS
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

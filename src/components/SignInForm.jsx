import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { userLogin } from '../services/auth';
import { goToPage } from "../services/pageController";

export default function SignInForm() {

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget); // Get data from form

    const email = data.get('email');
    const password = data.get('password');

    userLogin(email, password, onAdminLogin, onSuperAdminLogin, onEmployeeLogin);
  };

  const onAdminLogin = () => {
    goToPage('/admin', 1500);
  };

  const onSuperAdminLogin = () => {
    goToPage('/super-admin', 1500);
  };

  const onEmployeeLogin = () => {
    goToPage('/employee', 1500);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        color="primary"
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
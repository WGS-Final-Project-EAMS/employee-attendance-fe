import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { userLogin } from '../services/auth';
import { goToPage } from "../services/pageController";

export default function SignInForm() {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous errors
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    const data = new FormData(event.currentTarget); // Get data from form
    
    const email = data.get('email');
    const password = data.get('password');

    const error = await userLogin(email, password, onAdminLogin, onSuperAdminLogin, onEmployeeLogin);

    // Error handling
    if (error) {
      // If there are specific field errors, display them
      if (error.email) setEmailError(error.email);
      if (error.password) setPasswordError(error.password);
      if (error.general) setGeneralError(error.general);
    }
  };

  // If user role is admin
  const onAdminLogin = () => {
    goToPage('/admin', 1500);
  };

  // If user role is super admin
  const onSuperAdminLogin = () => {
    goToPage('/super-admin', 1500);
  };

  // If user role is employee
  const onEmployeeLogin = () => {
    goToPage('/employee', 1500);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {/* Start of Error Handling */}
      {generalError && (
        <Grid item sx={{ pb: 2 }} xs={12}>
            <Alert severity="error">{generalError}</Alert>
        </Grid>
      )}
      {/* End of Error Handling */}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        error={!!emailError} // If email is not valid
        helperText={emailError}
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
        error={!!passwordError} // If password is not valid
        helperText={passwordError}
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
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { userLogin } from '../services/auth';
import { useState } from 'react';
import { goToPage } from "../services/pageController";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        EAMS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const defaultTheme = createTheme();

export default function SignIn() {
    // State hooks for managing email and password input values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setEmail(data.get('email'));
        setPassword(data.get('password'));

        userLogin(email, password, onAdminLogin, onSuperAdminLogin, onEmployeeLogin);
    };

    const onAdminLogin = () => {
        goToPage('/admin', 1500)
    }

    const onSuperAdminLogin = () => {
        goToPage('/super-admin', 1500)
    }

    const onEmployeeLogin = () => {
        goToPage('/employee', 1500)
    }

    return (
        <Container component="main" disableGutters maxWidth="xl" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <CssBaseline />
            <Grid
                container
                display="flex"
                justifyContent="start"
                alignItems="start"
            >
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
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Grid>
            </Grid>
        </Container>
    );
}
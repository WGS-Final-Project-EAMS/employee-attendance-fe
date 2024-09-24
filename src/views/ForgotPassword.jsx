import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Alert, Button, Typography } from '@mui/material';
import SubmitButton from '../components/elements/SubmitButton';
import { forgotPassword } from '../services/auth';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Send API request to reset password
      const response = await forgotPassword(email);

      // If successful, show success alert
      setSuccess('Password reset successful. Please check your email.');
      setEmail(''); // Reset email field
    } catch (err) {
      // If error, show error alert
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
        <Typography component="h1" variant="h4" color="primary.dark">
                Forgot Password
        </Typography>

      {/* Success Alert */}
      {success && <Alert severity="success">{success}</Alert>}

      {/* Error Alert */}
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Submit Button */}
        <SubmitButton loading={loading} text="Reset Password" />

        {/* Back to Login Button */}
        <Button
          fullWidth
          size="large"
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/login')} // Navigate back to login page
          sx={{ mt: 2 }}
        >
          Back to Login
        </Button>
      </form>
    </Box>
  );
};

export default ForgotPasswordPage;

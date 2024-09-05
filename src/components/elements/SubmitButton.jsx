import { Button, CircularProgress } from '@mui/material';

const SubmitButton = ({ loading, text }) => {
  return (
    <Button
      type="submit"
      fullWidth
      size="large"
      variant="contained"
      color="primary"
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : text}
    </Button>
  );
};

export default SubmitButton;

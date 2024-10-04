import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

export default function MainLayout({ children }) {
  return (
    <Container component="main" disableGutters maxWidth="xl" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <Grid container display="flex" justifyContent="start" alignItems="start">
        {children}
      </Grid>
    </Container>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

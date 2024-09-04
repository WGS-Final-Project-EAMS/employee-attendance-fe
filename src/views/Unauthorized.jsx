import { Container, Box, Typography, Button } from "@mui/material";
import { userLogout } from "../services/auth";
import { goToPage } from "../services/pageController";

const Unauthorized = () => {
    const onLogout = () => {
        goToPage('/login', 1500);
    };
    
    const handleLogout = () => {
        userLogout(onLogout);
    }
    return (
        <Container maxWidth="xl" sx={{ minHeight: '100vh', pt:8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap:2 }}>
                <Typography component="h1" variant="h2" color="secondary.dark">UNAUTHORIZED</Typography>
                <Typography component="h1" variant="subtitle1" color="secondary.dark">You do not have access to this page.</Typography>
                <Button
                    onClick={handleLogout}
                    size="large"
                    variant="contained"
                    color="secondary"
                >
                    Logout
                </Button>
            </Box>
        </Container>
    );
};

export default Unauthorized;

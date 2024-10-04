import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { AccessTime } from '@mui/icons-material';

const DigitalClock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour12: false });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                my: 4,
                color: 'primary.main',
                padding: 2,
                width: 'fit-content',
                mx: 'auto',
            }}
        >
            <Typography variant="h3" component="div">
                {formatTime(currentTime)}
            </Typography>
        </Box>
    );
};

export default DigitalClock;

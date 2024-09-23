import { Button, Avatar, Grid, Typography } from '@mui/material';

const FileUploadField = ({ profilePicture, handleFileChange, profilePictureUrl }) => (
    <Grid container spacing={2} sx={{ p: 2, mb: 2 }}>
        <Grid item xs={12}>
            <Typography variant="h6">Upload Profile Picture</Typography>
        </Grid>
        <Grid item xs={12}>
            <Button
                component="label"
                variant='outlined'
                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 2, py: 2 }}
                color='secondary'
            >
                <Avatar
                    alt="Profile Picture"
                    src={profilePicture ? URL.createObjectURL(profilePicture) : profilePictureUrl}
                    sx={{ width: 56, height: 56 }}
                />
                <Typography variant="subtitle1">Choose Profile Picture</Typography>
                <input
                    type="file"
                    hidden
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handleFileChange}
                />
            </Button>
        </Grid>
    </Grid>
);

export default FileUploadField;
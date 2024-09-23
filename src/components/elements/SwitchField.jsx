import { Grid, FormControlLabel, Switch } from '@mui/material';

const SwitchField = ({ isActive, handleSwitchChange }) => (
    <Grid item xs={12}>
        <FormControlLabel
            control={
                <Switch
                    checked={isActive}
                    onChange={handleSwitchChange}
                    color="primary"
                />
            }
            label={isActive ? 'active' : 'non-active'}
        />
    </Grid>
);

export default SwitchField;
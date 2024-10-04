import { TextField, Grid } from '@mui/material';

const FormTextField = ({ label, name, value, onChange, error, helperText, required = true, type = 'text', InputLabelProps = {} }) => (
    <Grid item xs={12} sm={6}>
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            fullWidth
            required={required}
            error={!!error}
            helperText={helperText}
            type={type}
            InputLabelProps={InputLabelProps}
        />
    </Grid>
);

export default FormTextField;
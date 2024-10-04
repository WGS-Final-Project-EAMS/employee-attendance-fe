import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

const FormSelect = ({ label, value, onChange, options, name }) => {
    return (
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
                <Select
                    labelId={`${name}-select-label`}
                    id={`${name}-select`}
                    label={label}
                    value={value}
                    onChange={onChange}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
};

export default FormSelect;
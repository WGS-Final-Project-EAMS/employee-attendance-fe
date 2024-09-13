import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { createOfficeSettings, updateOfficeSettings } from '../../services/officeSettingsService'; // Service untuk handle create dan update

const OfficeSettingsForm = ({ initialValues, isEdit, onSuccess, toggleEdit = null }) => {
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      if (isEdit) {
        await updateOfficeSettings(formData);
      } else {
        await createOfficeSettings(formData);
      }
      onSuccess(); // Notify parent on success
    } catch (error) {
      console.error('Error saving office settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <TextField
        label="Office Start Time"
        name="office_start_time"
        type="time"
        value={formData.office_start_time}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Office End Time"
        name="office_end_time"
        type="time"
        value={formData.office_end_time}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Office Location"
        name="office_location"
        value={formData.office_location}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Monthly Recap Day"
        name="monthly_recap_day"
        type="number"
        value={formData.monthly_recap_day}
        onChange={handleChange}
        fullWidth
        required
      />

      <Button variant="contained" color="primary" type="submit" size="large" disabled={loading}>
        {loading ? 'Saving...' : isEdit ? 'Save Settings' : 'Create Settings'}
      </Button>
      
      {isEdit && (  
        <Button color="secondary" onClick={() => toggleEdit()}>
            Back
        </Button>
      )}
    </Box>
  );
};

export default OfficeSettingsForm;

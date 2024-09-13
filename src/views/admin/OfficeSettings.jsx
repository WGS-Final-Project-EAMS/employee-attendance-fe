import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import OfficeSettingsForm from '../../components/forms/OfficeSettingsForm';
import ModalElement from '../../components/elements/ModalElement';
import { fetchOfficeSettings } from '../../services/officeSettingsService'; // Service untuk fetch data settings dari backend

const OfficeSettings = () => {
  const [officeSettings, setOfficeSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const loadOfficeSettings = async () => {
    try {
      const data = await fetchOfficeSettings();
      setOfficeSettings(data);
    } catch (error) {
      console.error('Error fetching office settings:', error);
    } finally {
      setLoading(false);
    }
    };
    
  useEffect(() => {
    loadOfficeSettings();
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const toggleEdit = () => setIsEdit((prev) => !prev);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <AdminLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 2,
          padding: 4,
        }}
      >
        <Typography component="h1" variant="h4" color="primary.dark">
          Office Settings
        </Typography>

        {officeSettings ? (
          <>
            {!isEdit ? (
              <Box>
                <Typography>Office Start Time: {officeSettings.office_start_time}</Typography>
                <Typography>Office End Time: {officeSettings.office_end_time}</Typography>
                <Typography>Office Location: {officeSettings.office_location}</Typography>
                <Typography>Monthly Recap Day: {officeSettings.monthly_recap_day}</Typography>
                <Button variant="contained" color="primary" onClick={toggleEdit}>
                  Edit Settings
                </Button>
              </Box>
            ) : (
              <OfficeSettingsForm
                initialValues={officeSettings}
                isEdit={true}
                toggleEdit={toggleEdit}
                onSuccess={() => {
                  toggleEdit();
                  // Refetch data after successful update
                  loadOfficeSettings();
                }}
              />
            )}
          </>
        ) : (
          <>
            <Typography>No Office Settings Found.</Typography>
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
              Create New Office Settings
            </Button>
          </>
        )}

        <ModalElement
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          modalTitle="Create Office Settings"
          renderModalContent={() => (
            <OfficeSettingsForm
              initialValues={{
                office_start_time: '',
                office_end_time: '',
                office_location: '',
                monthly_recap_day: '',
              }}
              isEdit={false}
              onSuccess={() => {
                handleCloseModal();
                loadOfficeSettings(); // Refetch data after successful create
              }}
            />
          )}
        />
      </Box>
    </AdminLayout>
  );
};

export default OfficeSettings;
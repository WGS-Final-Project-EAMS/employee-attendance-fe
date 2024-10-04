import { Box, Typography, Button, CircularProgress, Container, Card, CardContent, Grid } from '@mui/material';
import { Edit, Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
// import AdminLayout from '../../layouts/AdminLayout';
import OfficeSettingsForm from '../../components/forms/OfficeSettingsForm';
import ModalElement from '../../components/elements/ModalElement';
import { fetchOfficeSettings } from '../../services/officeSettingsService'; // Service untuk fetch data settings dari backend

const OfficeSettings = () => {
  const [officeSettings, setOfficeSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const title = "Office Settings";

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
    <Container maxWidth="xl">
        <Box>
          <Card variant="outlined" sx={{ py: 4, px: 8 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
                  <Typography component="h1" variant="h4" color="primary.dark">
                    {title}
                  </Typography>
                  {officeSettings ? (
                    <>
                      {!isEdit ? (
                        <Box sx={{ display: 'flex', flexDirection:'column', gap:4 }}>
                          <Grid container spacing={2}>
                              {/* Start Time */}
                              <Grid item xs={3}>
                                  <Typography>Office Start Time</Typography>
                              </Grid>
                              <Grid item xs={9}>
                                  <Typography>{officeSettings.office_start_time}</Typography>
                              </Grid>
                              
                              {/* End Time */}
                              <Grid item xs={3}>
                                  <Typography>Office End Time</Typography>
                              </Grid>
                              <Grid item xs={9}>
                                  <Typography>{officeSettings.office_end_time}</Typography>
                              </Grid>
                              
                              {/* Office Location */}
                              <Grid item xs={3}>
                                  <Typography>Office Location</Typography>
                              </Grid>
                              <Grid item xs={9}>
                                  <Typography>{officeSettings.office_location}</Typography>
                              </Grid>
                              
                              {/* Monthly Recap Day */}
                              <Grid item xs={3}>
                                  <Typography>Monthly Recap Day</Typography>
                              </Grid>
                              <Grid item xs={9}>
                                  <Typography>{officeSettings.monthly_recap_day}</Typography>
                              </Grid>
                          </Grid>
                          <Button variant="outlined" color="primary" size="large" startIcon={<Edit />} onClick={toggleEdit}>
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
                      <Button variant="contained" size="large" color="primary" startIcon={<Add />} onClick={handleOpenModal}>
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
              </CardContent>
          </Card>
        </Box>
    </Container>
    // <AdminLayout title={title}>
    // </AdminLayout>
  );
};

export default OfficeSettings;
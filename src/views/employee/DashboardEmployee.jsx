import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Avatar, Button, Grid } from "@mui/material";
import { Key } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { getUserById } from "../../services/auth";

const DashboardEmployee = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State untuk menyimpan data user
  // const [loading, setLoading] = useState(true); // State untuk mengelola status loading
  const [error, setError] = useState(null); // State untuk menyimpan error jika ada

  // Fungsi untuk mengambil data user
  const fetchUserData = async () => {
    try {
      const response = await getUserById();
      if (response.success !== false) {
        setUser(response); // Simpan data user di state
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError('Failed to load user data');
    }
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    // Panggil fetchUserData saat komponen dirender
    fetchUserData();
  }, []);

  const handleChangePassword = () => {
      navigate('/employee/change-password');
  };

  // if (loading) {
  //   return <Typography>Loading...</Typography>; // Tampilkan loading saat data belum diterima
  // }

  if (error) {
    return <Typography color="error">{error}</Typography>; // Tampilkan error jika ada
  }

  return (
    <EmployeeLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap:2 }}>
          <Typography component="h1" variant="h4" color="primary.dark">
              Dashboard
          </Typography>
          {/* User Info Card */}
          <Card sx={{ display: 'flex', width: '100%', alignItems: 'center', maxWidth: 600 }}>
                  {/* <Avatar
                      sx={{ width: 150 }}
                      src={user.profile_picture_url || ''}
                      alt="User Profile Picture"
                  /> */}
                  <CardContent>
                      <Typography component="h2" variant="h5">
                          {user?.username}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                          {user?.email}
                      </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <Grid container sx={{ p: 2 }} justifyContent="flex-end">
                          <Button variant="contained" color="primary" onClick={handleChangePassword} startIcon={<Key />}>
                              Change Password
                          </Button>
                      </Grid>
                  </Box>
              </Card>
      </Box>
    </EmployeeLayout>
  );
}

export default DashboardEmployee;
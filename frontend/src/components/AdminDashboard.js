import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { LibraryBooks, AddBox, ReceiptLong, Bookmark } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ marginTop: '70px', marginBottom: '15px' }}>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}>
          Admin Dashboard
        </Typography>

        <Grid container spacing={3} sx={{ marginTop: '10px' }}>
          {/* Quick Actions */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Admin Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <AddBox sx={{ fontSize: 40, mb: 1 }} />
                      <Button variant="contained" onClick={() => navigate("/admin/add-book")} fullWidth>
                        Add Book
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <LibraryBooks sx={{ fontSize: 40, mb: 1 }} />
                      <Button variant="contained" fullWidth onClick={() => navigate("/admin/view-books")}>
                        View Books
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <ReceiptLong sx={{ fontSize: 40, mb: 1 }} />
                      <Button variant="contained" fullWidth onClick={() => navigate("/admin/manage-loans")}>
                        Manage Loans
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Bookmark sx={{ fontSize: 40, mb: 1 }} />
                      <Button variant="contained" fullWidth onClick={() => navigate("/addevent")}>
                        Add Events
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Statistics */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Total Books
              </Typography>
              <Typography variant="h4" color="primary">
                120
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Active Loans
              </Typography>
              <Typography variant="h4" color="primary">
                35
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
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
import { Book, MenuBook, History, Bookmark } from '@mui/icons-material';

const StudentDashboard = (props) => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user data from localStorage

  return (
    <Container maxWidth="lg" sx={{ marginTop: '100px' }}>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Welcome, {props.userName}!
        </Typography>

        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Book sx={{ fontSize: 40, mb: 1 }} />
                      <Button variant="contained" fullWidth>
                        Search Books
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <MenuBook sx={{ fontSize: 40, mb: 1 }} />
                      <Button variant="contained" fullWidth>
                        My Loans
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <History sx={{ fontSize: 40, mb: 1 }} />
                      <Button variant="contained" fullWidth>
                        Loan History
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Bookmark sx={{ fontSize: 40, mb: 1 }} />
                      <Button variant="contained" fullWidth>
                        Reservations
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Current Loans */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Current Loans
              </Typography>
              <Typography variant="body1" color="text.secondary">
                No active loans
              </Typography>
            </Paper>
          </Grid>

          {/* Upcoming Due Dates */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Upcoming Due Dates
              </Typography>
              <Typography variant="body1" color="text.secondary">
                No upcoming due dates
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default StudentDashboard;
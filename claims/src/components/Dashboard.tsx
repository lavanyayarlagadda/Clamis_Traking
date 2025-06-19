import React from 'react';
import {
  Grid, Card, CardContent, Typography, Box, Chip, Divider
} from '@mui/material';
import { PieChart, BarChart, LineChart } from '@mui/x-charts';

const Dashboard = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>Dashboard</Typography>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        {[
          { label: 'Total Claims', value: '1,250' },
          { label: 'Approved Claims', value: '850' },
          { label: 'Rejected Claims', value: '150' },
          { label: 'In Exception', value: '250' },
        ].map((item, idx) => (
          <Grid size={{xs:12,sm:6,md:3}} key={idx}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">{item.label}</Typography>
                <Typography variant="h6">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Charts Section */}
        <Grid size={{xs:12,md:6}}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Claims by Status</Typography>
              <PieChart
                series={[{ data: [
                  { id: 0, value: 850, label: 'Approved' },
                  { id: 1, value: 150, label: 'Rejected' },
                  { id: 2, value: 250, label: 'In Exception' },
                ] }]}
                width={400}
                height={200}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12,md:6}}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Top Performing Hospitals</Typography>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['Apollo', 'Fortis', 'Max'] }]}
                series={[{ data: [400, 300, 200] }]}
                width={400}
                height={200}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid size={{xs:12}}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Recent Alerts</Typography>
              <Divider sx={{ my: 1 }} />
              <Chip label="Exception: Missing Docs" color="error" sx={{ mr: 1 }} />
              <Chip label="New Claim Received" color="primary" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
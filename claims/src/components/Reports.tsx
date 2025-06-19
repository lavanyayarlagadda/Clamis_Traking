import { Box, Card, CardContent, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";



const Reports = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>Reports & Analytics</Typography>
      <Grid container spacing={2} mb={2}>
        <Grid size={{xs:12,sm:6,md:3}}>
          <TextField fullWidth label="Date Range" type="date" InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid size={{xs:12,sm:6,md:3}}>
          <TextField fullWidth select label="Insurance Co.">
            <MenuItem value="abc">ABC Insurance</MenuItem>
            <MenuItem value="xyz">XYZ Insurance</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{xs:12,sm:6,md:3}}>
          <TextField fullWidth select label="Hospital">
            <MenuItem value="apollo">Apollo</MenuItem>
            <MenuItem value="fortis">Fortis</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{xs:12,sm:6,md:3}}>
          <TextField fullWidth select label="Claim Status">
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={{xs:12,md:6}}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Claim Volume by Month</Typography>
              <LineChart
                xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr'] }]}
                series={[{ data: [120, 150, 170, 200] }]}
                width={400}
                height={200}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12,md:6}}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Top Exception Reasons</Typography>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['Docs Missing', 'Mismatch', 'Delay'] }]}
                series={[{ data: [45, 30, 20] }]}
                width={400}
                height={200}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;
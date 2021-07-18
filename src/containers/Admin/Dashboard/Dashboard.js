import { Grid, Paper, Typography } from '@material-ui/core';
import TrendChart from '../../../components/Charts/TrendChart';
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Paper>
            <TrendChart></TrendChart>
          </Paper>
        </Grid>

        <Grid item md={6} xs={12}>
          <Paper>
            <TrendChart></TrendChart>
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper>
            <Typography variant='heading'>Dashboard</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

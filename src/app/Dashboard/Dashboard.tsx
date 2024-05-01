import React from 'react';
import { Theme } from '@mui/material/styles';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import { createStyles, makeStyles } from '@mui/styles';
import { Outlet } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    sidebar: {
      // Adjust width, height, and other styles as needed
    },
    content: {
      // Adjust width, height, and other styles as needed
    },
  })
);

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Sidebar />
    </div>
    <div className={classes.content}>
      <DashboardContent />
      <Outlet />
    </div>
  </div>
  );
};

export default Dashboard;
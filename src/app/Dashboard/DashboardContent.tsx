// DashboardContent.tsx
import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from 'pretty-format';
import Sidebar from './Sidebar';
const drawerWidth = 2*240; // Match this value with the width of your sidebar


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      marginLeft: drawerWidth, // Adjust content margin to account for sidebar width

    //   padding: theme.spacing(3),
    },
  })
);

const DashboardContent: React.FC = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div>
        <h1>Welcome to the Dashboard</h1>
      </div>

    </main>
  );
};

export default DashboardContent;
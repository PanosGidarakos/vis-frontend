// DashboardContent.tsx
import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from 'pretty-format';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
    //   padding: theme.spacing(3),
    },
  })
);

const DashboardContent: React.FC = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div>
        <h1>ome to the Dashboard</h1>
      </div>
    </main>
  );
};

export default DashboardContent;
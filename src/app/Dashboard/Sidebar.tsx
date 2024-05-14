// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { makeStyles, createStyles } from '@mui/styles';
// // import { Drawer, List, ListItem, ListItemText, Theme, Grid } from '@mui/material';

// // const drawerWidth = 240;

// // const useStyles = makeStyles((theme: Theme) =>
// //   createStyles({
// //     drawer: {
// //       width: drawerWidth,
// //       flexShrink: 0,
// //     },
// //     drawerPaper: {
// //       width: drawerWidth,
// //     },
// //     toolbar: theme.mixins.toolbar,
// //     fixedSidebar: {
// //       position: 'fixed',
// //       top: 0,
// //       left: 0,
// //       height: '100vh',
// //     },
// //   })
// // );

// // const Sidebar: React.FC = () => {
// //   const classes = useStyles();
// //   const navigate = useNavigate();

// //   const handleItemClick = (route: string) => {
// //     navigate(route);
// //   };

// //   return (
// //     <Drawer
// //       className={`${classes.drawer} ${classes.fixedSidebar}`}
// //       variant="permanent"
// //       classes={{
// //         paper: classes.drawerPaper,
// //       }}
// //       anchor="left"
// //     >
// //       <div className={classes.toolbar} />
// //       <List>
// //         <ListItem button key="Dashboard" onClick={() => handleItemClick('/')}>
// //           <ListItemText primary="Dashboard" />
// //         </ListItem>
// //         <ListItem button key="Data_Explanation" onClick={() => handleItemClick('/data_explanation')}>
// //           <ListItemText primary="Data Explanation" />
// //         </ListItem>
// //         <ListItem button key="Explainability" onClick={() => handleItemClick('/explainability')}>
// //           <ListItemText primary="Explaiability" />
// //         </ListItem>
// //         <ListItem button key="Users">
// //           <ListItemText primary="Users" />
// //         </ListItem>
// //         <ListItem button key="Settings">
// //           <ListItemText primary="Settings" />
// //         </ListItem>
// //       </List>
// //     </Drawer>
// //   );
// // };

// // export default Sidebar;



// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { makeStyles, createStyles } from '@mui/styles';
// // import { Drawer, List, ListItem, ListItemText, Theme, Grid } from '@mui/material';

// // const drawerWidth = 240;

// // const useStyles = makeStyles((theme: Theme) =>
// //   createStyles({
// //     drawer: {
// //       flexShrink: 0,
// //       width: drawerWidth,
// //       transition: theme.transitions.create('width', {
// //         easing: theme.transitions.easing.sharp,
// //         duration: theme.transitions.duration.enteringScreen,
// //       }),
// //     },
// //     drawerClosed: {
// //       width: theme.spacing(7),
// //       transition: theme.transitions.create('width', {
// //         easing: theme.transitions.easing.sharp,
// //         duration: theme.transitions.duration.leavingScreen,
// //       }),
// //     },
// //     drawerPaper: {
// //       width: drawerWidth,
// //     },
// //     drawerPaperClosed: {
// //       width: theme.spacing(7),
// //     },
// //     toolbar: theme.mixins.toolbar,
// //     fixedSidebar: {
// //       position: 'fixed',
// //       top: 0,
// //       left: 0,
// //       height: '100vh',
// //     },
// //   })
// // );

// // const Sidebar: React.FC = () => {
// //   const classes = useStyles();
// //   const navigate = useNavigate();
// //   const [open, setOpen] = useState(true);

// //   const handleToggleSidebar = () => {
// //     setOpen(!open);
// //   };

// //   const handleItemClick = (route: string) => {
// //     navigate(route);
// //   };

// //   return (
// //     <Drawer
// //       className={`${classes.drawer} ${classes.fixedSidebar}`}
// //       variant="permanent"
// //       classes={{
// //         paper: `${classes.drawerPaper} ${open ? '' : classes.drawerPaperClosed}`,
// //       }}
// //       anchor="left"
// //       open={open}
// //     >
// //       <div className={classes.toolbar}>
// //         <button onClick={handleToggleSidebar}>{open ? 'Close' : 'Open'}</button>
// //       </div>
// //       <List>
// //         <ListItem button key="Dashboard" onClick={() => handleItemClick('/')}>
// //           <ListItemText primary="Dashboard" />
// //         </ListItem>
// //         <ListItem button key="Data_Explanation" onClick={() => handleItemClick('/data_explanation')}>
// //           <ListItemText primary="Data Explanation" />
// //         </ListItem>
// //         <ListItem button key="Explainability" onClick={() => handleItemClick('/explainability')}>
// //           <ListItemText primary="Explaiability" />
// //         </ListItem>
// //         <ListItem button key="Users">
// //           <ListItemText primary="Users" />
// //         </ListItem>
// //         <ListItem button key="Settings">
// //           <ListItemText primary="Settings" />
// //         </ListItem>
// //       </List>
// //     </Drawer>
// //   );
// // };

// // export default Sidebar;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { makeStyles, createStyles } from '@mui/styles';
// import { Drawer, List, ListItem, ListItemText, Theme, Switch } from '@mui/material';

// const drawerWidth = 240;

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     drawer: {
//       flexShrink: 0,
//       width: drawerWidth,
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//     },
//     drawerClosed: {
//       width: theme.spacing(7),
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//     },
//     drawerPaper: {
//       width: drawerWidth,
//     },
//     drawerPaperClosed: {
//       width: theme.spacing(7),
//     },
//     toolbar: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: theme.spacing(0, 1),
//       ...theme.mixins.toolbar,
//     },
//     fixedSidebar: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       height: '100vh',
//     },
//   })
// );

// const Sidebar: React.FC = () => {
//   const classes = useStyles();
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(true);

//   const handleToggleSidebar = () => {
//     setOpen(!open);
//   };

//   const handleItemClick = (route: string) => {
//     navigate(route);
//   };

//   return (
//     <Drawer
//       className={`${classes.drawer} ${classes.fixedSidebar}`}
//       variant="permanent"
//       classes={{
//         paper: `${classes.drawerPaper} ${open ? '' : classes.drawerPaperClosed}`,
//       }}
//       anchor="left"
//       open={open}
//     >
//       <div className={classes.toolbar}>
//         <Switch checked={open} onChange={handleToggleSidebar} />
//       </div>
//       <List>
//         <ListItem button key="Dashboard" onClick={() => handleItemClick('/')}>
//           <ListItemText primary="Dashboard" />
//         </ListItem>
//         <ListItem button key="Data_Explanation" onClick={() => handleItemClick('/data_explanation')}>
//           <ListItemText primary="Data Explanation" />
//         </ListItem>
//         <ListItem button key="Explainability" onClick={() => handleItemClick('/explainability')}>
//           <ListItemText primary="Explaiability" />
//         </ListItem>
//         <ListItem button key="Users">
//           <ListItemText primary="Users" />
//         </ListItem>
//         <ListItem button key="Settings">
//           <ListItemText primary="Settings" />
//         </ListItem>
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles, createStyles } from '@mui/styles';
import { Drawer, List, ListItem, ListItemText, Theme, Switch } from '@mui/material';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      flexShrink: 0,
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClosed: {
      width: theme.spacing(7),
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerPaperClosed: {
      width: theme.spacing(7),
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    fixedSidebar: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
    },
  })
);

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  const handleItemClick = (route: string) => {
    navigate(route);
  };

  return (
    <Drawer
      className={`${classes.drawer} ${classes.fixedSidebar}`}
      variant="permanent"
      classes={{
        paper: `${classes.drawerPaper} ${open ? '' : classes.drawerPaperClosed}`,
      }}
      anchor="left"
      open={open}
    >
      <div className={classes.toolbar}>
        <Switch checked={open} onChange={handleToggleSidebar} />
        
      </div>
      {open && (
        <List>
          <ListItem button key="Dashboard" onClick={() => handleItemClick('/')}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button key="Data_Explanation" onClick={() => handleItemClick('/data_explanation')}>
            <ListItemText primary="Data Explanation" />
          </ListItem>
          <ListItem button key="Explainability" onClick={() => handleItemClick('/explainability')}>
            <ListItemText primary="Explaiability" />
          </ListItem>
          <ListItem button key="Users">
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button key="Settings">
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      )}
    </Drawer>
  );
};

export default Sidebar;


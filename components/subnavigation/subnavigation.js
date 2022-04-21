import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { 
  Typography, 
  Grid, 
  Button, 
  Tabs,
  Tab,
  withStyles,
  makeStyles, 
  Toolbar } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';

import SSWarning  from '../ssWarning';

import stores from '../../stores';
import { formatAddress } from '../../utils';
import styles from './subnavigation.module.css';
import EnhancedEncryptionOutlinedIcon from '@material-ui/icons/EnhancedEncryptionOutlined';

const StyledTab = withStyles(() => ({
  root: {
    padding: ".5rem 2rem",
    textTransform: "capitalize",
    fontWeight: "700",
    zIndex: 1,
    //backgroundColor: "white",
    "&.Mui-selected": {
      position: "relative",
      zIndex: 1,
      color: "#fff",
      "& a": {
        color: "#fff",
      },
    },
  },
}))(Tab);

const links = ["vest", "vote", "bribe", "whitelist"];

const useStyles = makeStyles((t) => ({
  indicator: {
    borderRadius: "100px",
    backgroundColor: `${t.palette.primary.main} !important`,
    height: "100%",
    transition: "all 0.3s ease",
  },
  buttonOverride: {
    color: 'rgb(255,180,5)',
    background: 'rgb(84, 80, 80)',
    fontWeight: '700',
    flexBasis: "100%",
    width: '100%',
    '&:hover': {
      background: 'rgb(84, 80, 80)'
    },
  },
  toolbar: {
    margin: '14px 0px',
    padding: '0px',
    alignItem: 'center',
    position: 'relative',
    marginLeft: '180px'
  },
  actionButtonText: {
    fontSize: '15px',
    fontWeight: '700',
  }
}));

function a11yProps(index) {
  return {
    id: `item-tabs-${index}`,
    "aria-controls": `item-tabspanel-${index}`,
    children: index + 1,
  };
}

const EnhancedTableToolbar = (props) => {
  const classes = useStyles()
  const router = useRouter()

  const [search, setSearch] = useState('');

  const onSearchChanged = (event) => {
    setSearch(event.target.value);
  };

  const onCreate = () => {
    router.push('/governance/vest/create')
  }

  return (
    <Toolbar className={ classes.toolbar }>

        <Grid lg='auto' md={12} sm={12} xs={12} item>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<EnhancedEncryptionOutlinedIcon />}
            size='large'
            className={ classes.buttonOverride }
            onClick={ onCreate }
          >
            <Typography className={ classes.actionButtonText }>Create Lock</Typography>
          </Button>
        </Grid>
        <Grid item lg={true} md={true} sm={false} xs={false}></Grid>


    </Toolbar>
  );
};


const Subnavigation = (props) => {
  console.log("HELLOOOOO")
  const router = useRouter();
  const classes = useStyles();
  const indicator = useRef(null);
  const [active, setActive] = useState(null);
  function handleNavigate(route) {
    router.push(route, null, { shallow: true });
  }

  useEffect(() => {
    const activePath = router.asPath;
    if (activePath.includes("vest")) {
      setActive("vest");
    }
    if (activePath.includes("vote")) {
      setActive("vote");
    }
    if (activePath.includes("bribe")) {
      setActive("bribe");
    }
    if (activePath.includes("whitelist")) {
      setActive("whitelist");
    }
  }, [router.asPath]);
  
  const handleChange = (e, val) => {
    if (val) {
      if (indicator.current) {
        const isForward = links.indexOf(val) > links.indexOf(active);
        indicator.current.style.setProperty(
        "--transform-origin",
        isForward ? "right" : "left"
        );
        indicator.current.classList.add(classes["moving-indicator"]);
        clearTimeout(window.indicatorTimeout);
        window.indicatorTimeout = setTimeout(() => {
        indicator.current?.classList.remove(classes["moving-indicator"]);
        }, 300);
        }
        setActive(val);
        handleNavigate("/governance/" + val);
      }
    };
  return (
    <div className={classes.container}>
    <Grid container spacing={2}>
         <EnhancedTableToolbar />
            <Tabs
              style={{ padding: 20 }}
              TabIndicatorProps={{
                className: classes.indicator,
                ref: indicator,
              }}
              classes={{
                scroller: styles["px-3"],
              }}
              value={active}
              variant="scrollable"
              scrollButtons="auto"
              onChange={handleChange}
            >
            {links.map((link, index) => (
              <StyledTab
                disableRipple
                key={link}
                value={link}
                label={link}
                {...a11yProps(link)}
              />
            ))}
            </Tabs>
            </Grid>
      </div>
  );
}

export default Subnavigation;
import {
  Container,
  Paper,
  Tabs,
  Tab,
  withStyles,
  makeStyles,
  Typography, Toolbar, Grid, Button,
  capitalize
} from "@material-ui/core";
import EnhancedEncryptionOutlinedIcon from '@material-ui/icons/EnhancedEncryptionOutlined';
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./govMenu.module.css";

function a11yProps(index) {
  return {
    id: `item-tabs-${index}`,
    "aria-controls": `item-tabspanel-${index}`,
  };
}

const StyledTab = withStyles((t) => ({
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
    [t.breakpoints.down("xs")]: {
      minWidth: "90px",
      padding: ".5rem 1rem",
      fontSize: "0.75rem",
    }
  },
}))(Tab);

const links = ["vest", "vote", "bribe", "whitelist"];

const useStyles = makeStyles((t) => ({
  indicator: {
    borderRadius: "1000px",
    backgroundColor: `${t.palette.primary.main} !important`,
    height: "100%",
    transition: "all 0.3s ease",
  },
  buttonOverride: {
    color: 'rgb(255,180,5)',
    background: 'rgb(84, 80, 80)',
    fontWeight: '700',
    width: '100%',
    '&:hover': {
      background: 'rgb(84, 80, 80)'
    },
  },
  toolbar: {
    margin: '14px 0px',
    padding: '0px',
  },
  actionButtonText: {
    fontSize: '15px',
    fontWeight: '700',
  }
}));

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
        <Grid lg='auto' md={12} sm={12} xs={12} item style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: `20px 0`,
          maxWidth: '100vw',
          padding: '0px 10px',
          boxSize: 'border-box',
        }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<EnhancedEncryptionOutlinedIcon />}
            size='large'
            className={ classes.buttonOverride }
            onClick={ onCreate }
          >
            <Typography className={ classes.actionButtonText }>Create Lock</Typography>
          </Button>
        </Grid>
  );
};


const SubHeader = ({ children,}) => {
  const router = useRouter();
  const classes = useStyles();
  const indicator = useRef(null);
  const [active, setActive] = useState(false);
  function handleNavigate(route) {
    router.push(route, null, { shallow: true });
  }

  useEffect(() => {
    const activePath = router.asPath;
    links.forEach((link) => {
      if (activePath.includes(link)) {
        setActive(link);
        if (indicator.current) {
          const isForward = links.indexOf(link) > links.indexOf(active);
          indicator.current.style.setProperty(
          "--transform-origin",
          isForward ? "right" : "left"
          );
          indicator.current.classList.add(styles["moving-indicator"]);
          clearTimeout(window.indicatorTimeout);
          window.indicatorTimeout = setTimeout(() => {
          indicator.current?.classList.remove(styles["moving-indicator"]);
          }, 300);
          return ()=> {
            clearTimeout(window.indicatorTimeout);
          }
          }
      }
    });
  }, [router.asPath]);
  
  const handleChange = (e, val) => {
    if (val) {
      handleNavigate("/governance/" + val);
    }
  };
  return (
    <div className={classes.container}>
    <Grid container alignItems="center" spacing={1}>
         <EnhancedTableToolbar />
            <Tabs
              style={{ padding: 15, maxWidth: '100vw' }}
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
        <main>{children}</main>
      </div>
  );
}

export default SubHeader;

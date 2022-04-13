import {
  Container,
  Paper,
  Tabs,
  Tab,
  withStyles,
  makeStyles,
  Typography,
  Toolbar,
  Grid,
  Button,
  capitalize,
} from "@material-ui/core";
import EnhancedEncryptionOutlinedIcon from "@material-ui/icons/EnhancedEncryptionOutlined";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./govMenu.module.css";

function a11yProps(index) {
  return {
    id: `item-tabs-${index}`,
    "aria-controls": `item-tabspanel-${index}`,
  };
}

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

const StyledTabs = withStyles({
  root: {
    boxSizing: "border-box",
    "& *": {
      boxSizing: "border-box",
    },
  },
})(Tabs);

const links = ["vest", "vote", "bribe", "whitelist"];

const useStyles = makeStyles((t) => ({
  indicator: {
    borderRadius: "1000px",
    backgroundColor: `${t.palette.primary.main} !important`,
    height: "100%",
    transition: "all 0.3s ease",
  },
  buttonOverride: {
    color: "rgb(255,180,5)",
    background: "rgb(84, 80, 80)",
    fontWeight: "700",
    width: "100%",
    margin: "0 auto",
    "&:hover": {
      background: "rgb(84, 80, 80)",
    },
  },
  toolbar: {
    margin: "14px 0px",
    padding: "0px",
    [t.breakpoints.down("xs")]: {
      width: "100%",
      padding: "0px",
    },
  },
  actionButtonText: {
    fontSize: "15px",
    fontWeight: "700",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useStyles();
  const router = useRouter();

  const [search, setSearch] = useState("");

  const onSearchChanged = (event) => {
    setSearch(event.target.value);
  };

  const onCreate = () => {
    router.push("/governance/vest/create");
  };

  return (
    <Toolbar className={classes.toolbar}>
      <Grid
        lg="auto"
        md={12}
        sm={12}
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        item
      >
        <Button
          variant="contained"
          color="secondary"
          startIcon={<EnhancedEncryptionOutlinedIcon />}
          size="large"
          className={classes.buttonOverride}
          onClick={onCreate}
        >
          <Typography className={classes.actionButtonText}>
            Create Lock
          </Typography>
        </Button>
      </Grid>
      {/* <Grid item lg={true} md={true} sm={false} xs={false}></Grid> */}
    </Toolbar>
  );
};

const SubHeader = ({ children }) => {
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
          const indicatorTimeout = setTimeout(() => {
            indicator.current?.classList.remove(styles["moving-indicator"]);
          }, 300);
          return () => {
            clearTimeout(indicatorTimeout);
          };
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
      <Grid container spacing={1}>
        <EnhancedTableToolbar />
        <StyledTabs
          style={{ padding: 20, boxSizing: "border-box", maxWidth: "100vw" }}
          TabIndicatorProps={{
            className: classes.indicator,
            ref: indicator,
          }}
          indicatorColor="primary"
          textColor="primary"
          value={active}
          variant="scrollable"
          scrollButtons="auto"
          onChange={handleChange}
          aria-label="scrollable auto tabs example"
        >
          {links.map((link) => (
            <StyledTab
              disableRipple
              key={link}
              value={link}
              label={link}
              {...a11yProps(link)}
            />
          ))}
        </StyledTabs>
      </Grid>
      <main>{children}</main>
    </div>
  );
};

export default SubHeader;

import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  SvgIcon,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Skeleton from "@material-ui/lab/Skeleton";
import BigNumber from "bignumber.js";

import { formatCurrency } from "../../utils";
import classes from "./ffGovernanceOverview.module.css";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWalletOutlined";

import stores from "../../stores";
import { ACTIONS } from "../../stores/constants";

function BalanceIcon(props) {
  const { color, className } = props;
  return <AccountBalanceWalletIcon color="primary" fontSize="large" />;
}

function VestedBalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 32 32" strokeWidth="1" className={className}>
      <g strokeWidth="2" transform="translate(0, 0)">
        <polyline
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeLinecap="square"
          strokeMiterlimit="10"
          points="14,8 14,14 8,14 "
          strokeLinejoin="miter"
        ></polyline>{" "}
        <path
          data-cap="butt"
          data-color="color-2"
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeMiterlimit="10"
          d="M19,20v4c0,1.657,2.686,3,6,3 s6-1.343,6-3v-4"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        ></path>{" "}
        <path
          data-cap="butt"
          data-color="color-2"
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeMiterlimit="10"
          d="M19,24v4c0,1.657,2.686,3,6,3 s6-1.343,6-3v-4"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        ></path>{" "}
        <ellipse
          data-color="color-2"
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeLinecap="square"
          strokeMiterlimit="10"
          cx="25"
          cy="20"
          rx="6"
          ry="3"
          strokeLinejoin="miter"
        ></ellipse>{" "}
        <path
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeLinecap="square"
          strokeMiterlimit="10"
          d="M15,26.962 C14.67,26.987,14.336,27,14,27C6.82,27,1,21.18,1,14S6.82,1,14,1c6.843,0,12.452,5.288,12.962,12"
          strokeLinejoin="miter"
        ></path>
      </g>
    </SvgIcon>
  );
}

function IbBalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 32 32" strokeWidth="1" className={className}>
      <g strokeWidth="2" transform="translate(0, 0)">
        <path
          data-cap="butt"
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeMiterlimit="10"
          d="M1,5v4c0,1.657,2.686,3,6,3 s6-1.343,6-3V5"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        ></path>{" "}
        <path
          data-cap="butt"
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeMiterlimit="10"
          d="M1,9v4c0,1.657,2.686,3,6,3 s6-1.343,6-3V9"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        ></path>{" "}
        <line
          data-cap="butt"
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeMiterlimit="10"
          x1="13"
          y1="16.401"
          x2="13"
          y2="13"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        ></line>{" "}
        <path
          data-cap="butt"
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeMiterlimit="10"
          d="M1,13v4c0,1.657,2.686,3,6,3 c1.093,0,2.117-0.147,3-0.402"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        ></path>{" "}
        <path
          data-cap="butt"
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeMiterlimit="10"
          d="M1,17v4c0,1.657,2.686,3,6,3 c1.093,0,2.118-0.147,3-0.402"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        ></path>{" "}
        <ellipse
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeLinecap="square"
          strokeMiterlimit="10"
          cx="7"
          cy="5"
          rx="6"
          ry="3"
          strokeLinejoin="miter"
        ></ellipse>{" "}
        <path
          data-cap="butt"
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeMiterlimit="10"
          d="M19,9v4c0,1.657,2.686,3,6,3 s6-1.343,6-3V9"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        ></path>{" "}
        <path
          data-cap="butt"
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeMiterlimit="10"
          d="M22,19.594 C22.883,19.85,23.906,20,25,20c3.314,0,6-1.343,6-3v-4"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        ></path>{" "}
        <line
          data-cap="butt"
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeMiterlimit="10"
          x1="19"
          y1="13"
          x2="19"
          y2="16.401"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        ></line>{" "}
        <path
          data-cap="butt"
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeMiterlimit="10"
          d="M22,23.596 C22.883,23.851,23.907,24,25,24c3.314,0,6-1.343,6-3v-4"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        ></path>{" "}
        <ellipse
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeLinecap="square"
          strokeMiterlimit="10"
          cx="25"
          cy="9"
          rx="6"
          ry="3"
          strokeLinejoin="miter"
        ></ellipse>{" "}
        <path
          data-cap="butt"
          data-color="color-2"
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeMiterlimit="10"
          d="M10,19v4c0,1.657,2.686,3,6,3 s6-1.343,6-3v-4"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        ></path>{" "}
        <path
          data-cap="butt"
          data-color="color-2"
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeMiterlimit="10"
          d="M10,23v4c0,1.657,2.686,3,6,3 s6-1.343,6-3v-4"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        ></path>{" "}
        <ellipse
          data-color="color-2"
          fill="none"
          stroke="#ffb405"
          strokeWidth="2"
          strokeLinecap="square"
          strokeMiterlimit="10"
          cx="16"
          cy="19"
          rx="6"
          ry="3"
          strokeLinejoin="miter"
        ></ellipse>
      </g>
    </SvgIcon>
  );
}

export default function ffOverview() {
  const formatBigNumber = (n) => BigNumber(n).times(asset.gauge.virtualPrice);

  const [vestNFTs, setVestNFTs] = useState([]);
  const [govToken, setGovToken] = useState(null);
  const [veToken, setVeToken] = useState(null);
  const [vestedBalance, setVestedBalance] = useState(null);
  const [rewards, setRewards] = useState(null);
  const [assets, setAssets] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);

  const ssUpdated = () => {
    const as = stores.stableSwapStore.getStore("assets");
    setAssets(as);

    const nfts = stores.stableSwapStore.getStore("vestNFTs");
    let govTokenBalance = stores.stableSwapStore.getStore("govToken");
    const [vestedBalance, rewards] = nfts.reduce(
      (acc, curr) => {
        acc[0] += Number(curr.lockAmount) || 0;
        acc[1] +=
          Number(stores.stableSwapStore.getStore("rewards").rewards[i]) || 0;
        return acc;
      },
      [0, 0]
    );

    setGovToken(govTokenBalance);
    setVestedBalance(vestedBalance);
    setRewards(rewards);

    calculateTotalBalance(as);
  };

  useEffect(() => {
    const stableSwapUpdated = () => {
      ssUpdated();
    };

    ssUpdated();

    stores.emitter.on(ACTIONS.GET_VEST_NFTS, stableSwapUpdated);
    return () => {
      stores.emitter.removeListener(ACTIONS.GET_VEST_NFTS, stableSwapUpdated);
    };
  }, []);

  const calculateTotalBalance = (ass) => {
    if (!ass) return;
    const balance = ass.reduce((acc, curr) => {
      if (curr?.gauge) {
        let pooledBalance = formatBigNumber(curr.gauge.userPoolBalance);
        let stakedBalance = formatBigNumber(curr.gauge.userGaugeBalance);
        let convexBalance = formatBigNumber(curr.convex.balance);
        let tot = BigNumber(curr.balance)
          .plus(pooledBalance)
          .plus(stakedBalance)
          .plus(convexBalance)
          .times(curr.price);
        return acc.plus(tot);
      }
      return acc;
    }, BigNumber(0));

    setTotalBalance(balance);
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Paper elevation={0} className={classes.itemWrapGrid}>
            <Grid container spacing={0}>
              <Grid
                item
                lg={3}
                md={3}
                sm={3}
                xs={3}
                className={classes.iconWrap}
              >
                <BalanceIcon className={classes.overviewIcon} />
              </Grid>
              <Grid
                item
                lg={9}
                md={9}
                sm={9}
                xs={9}
                className={classes.itemContent}
              >
                <Typography className={classes.title}>
                  SOLID Balance:
                </Typography>
                <div className={classes.inline}>
                  <Typography className={classes.value}>
                    {formatCurrency(govToken?.balance || 0)}
                  </Typography>
                  <Typography className={classes.valueSymbol}>
                    {govToken?.symbol || ""}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Paper elevation={0} className={classes.itemWrapGrid}>
            <Grid container spacing={0}>
              <Grid
                item
                lg={3}
                md={3}
                sm={3}
                xs={3}
                className={classes.iconWrap}
              >
                <VestedBalanceIcon className={classes.overviewIcon} />
              </Grid>
              <Grid
                item
                lg={9}
                md={9}
                sm={9}
                xs={9}
                className={classes.itemContent}
              >
                <Typography className={classes.title}>
                  Vested Balance:
                </Typography>
                <div className={classes.inline}>
                  <Typography className={classes.value}>
                    {formatCurrency(veToken?.vestingInfo?.lockValue || 0)}
                  </Typography>
                  <Typography className={classes.valueSymbol}>
                    {veToken?.symbol || ""}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

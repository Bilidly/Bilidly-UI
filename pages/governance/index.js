import { Typography, Button, Paper, SvgIcon, Grid, Avatar } from "@material-ui/core";
import Overview from '../../components/ffGovernanceOverview';
import VoteOverview from '../../components/ffGovernanceVoteOverview';
import ClaimAll from '../../components/ffGovernanceClaimAll';

import classes from './governance.module.css';

import React, { useState, useEffect } from 'react';
import { ACTIONS } from '../../stores/constants';
import stores from '../../stores';
import { useRouter } from "next/router";
import Unlock from '../../components/unlock';
import { formatAddress } from '../../utils';

const { CONNECT_WALLET, ACCOUNT_CONFIGURED } = ACTIONS

function Governance({ changeTheme }) {

  function handleNavigate(route) {
    router.push(route);
  }

  const accountStore = stores.accountStore.getStore('account');
  const router = useRouter();
  const [account, setAccount] = useState(accountStore);
  const [unlockOpen, setUnlockOpen] = useState(false);

  useEffect(() => {
    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore('account');
      setAccount(accountStore);
      closeUnlock();
    };
    const connectWallet = () => {
      onAddressClicked();
    };

    stores.emitter.on(ACCOUNT_CONFIGURED, accountConfigure);
    stores.emitter.on(CONNECT_WALLET, connectWallet);
    return () => {
      stores.emitter.removeListener(ACCOUNT_CONFIGURED, accountConfigure);
      stores.emitter.removeListener(CONNECT_WALLET, connectWallet);
    };
  }, []);

  const onAddressClicked = () => {
    setUnlockOpen(true);
  };

  const closeUnlock = () => {
    setUnlockOpen(false);
  };

  return (
    <div className={classes.ffContainer}>
      {account && account.address ?
        <>

        <div className={classes.connected}>
          <Grid container spacing={5}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Grid container spacing={4}>

                <Grid item lg={3} md={6} sm={12} xs={12}>
                  <Typography className={classes.mainHeading} variant='h1'>Vesting</Typography>
                  <Paper elevation={0} onClick={() => router.push('/governance/vest')} className={classes.viewVesting}>View</Paper>
                  <Overview />
                </Grid>

                <Grid item lg={3} md={6} sm={12} xs={12}>
                  <Typography className={classes.mainHeading} variant='h1'>Voting</Typography>
                  <Paper elevation={0} onClick={() => router.push('/governance/vote')} className={classes.viewVoting}>View</Paper>
                  <VoteOverview />
                </Grid>

                <Grid item lg={3} md={6} sm={12} xs={12}>
                  <Typography className={classes.mainHeadingRewards} variant='h1'>Rewards</Typography>
                  <ClaimAll />
                </Grid>
              </Grid>
            </Grid>

          </Grid>

        </div>
        </>
         :
         <Paper className={classes.notConnectedContent}>
          <div className={classes.contentFloat}>
           <Typography className={classes.mainHeadingNC} variant='h1'>Governance</Typography>
           <Typography className={classes.mainDescNC} variant='body2'>Drive protocol and third party incentives.</Typography>
           <Button
             disableElevation
             className={classes.buttonConnect}
             variant="contained"
             onClick={onAddressClicked}>
             {account && account.address && <div className={`${classes.accountIcon} ${classes.metamask}`}></div>}
             <Typography>Connect Wallet to Continue</Typography>
           </Button>
           </div>
         </Paper>
       }
       {unlockOpen && <Unlock modalOpen={unlockOpen} closeModal={closeUnlock} />}
    </div>
  );
}

export default Governance;

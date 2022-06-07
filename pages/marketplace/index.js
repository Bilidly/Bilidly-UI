import { Typography, Button, Paper, SvgIcon, LinearProgress } from "@material-ui/core"

import React, { useState, useEffect, useContext } from 'react';
import { ACTIONS } from '../../stores/constants';

import stores from '../../stores';
import { useRouter } from "next/router";
import Unlock from '../../components/unlock';

import classes from './marketplace.module.css';

import NFTCardList from '../../components/ssMarketplace'
//import { LinearProgress } from '@mui/material'
//import { mapAvailableMarketItems } from '../src/utils/nft'

function Marketplace({ changeTheme }) {

  const accountStore = stores.accountStore.getStore('account');
  const router = useRouter();
  const [account, setAccount] = useState(accountStore);
  const [unlockOpen, setUnlockOpen] = useState(false);


  //const { marketplaceContract, nftContract, isReady, network } = useContext(Web3Context)
  


  useEffect(() => {

    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore('account');
      setAccount(accountStore);
      closeUnlock();
    };
    const connectWallet = () => {
      onAddressClicked();
    };

    stores.emitter.on(ACTIONS.ACCOUNT_CONFIGURED, accountConfigure);
    stores.emitter.on(ACTIONS.CONNECT_WALLET, connectWallet);
    return () => {
      stores.emitter.removeListener(ACTIONS.ACCOUNT_CONFIGURED, accountConfigure);
      stores.emitter.removeListener(ACTIONS.CONNECT_WALLET, connectWallet);
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
        <div className={classes.connected}>
          <NFTCardList />
        </div>
         :
        <Paper className={classes.notConnectedContent}>
          <div className={classes.contentFloat}>
            <Typography className={classes.mainHeadingNC} variant='h1'>Marketplace</Typography>
            <Typography className={classes.mainDescNC} variant='body2'>
              Buy and sell veNFTs
            </Typography>
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

export default Marketplace;

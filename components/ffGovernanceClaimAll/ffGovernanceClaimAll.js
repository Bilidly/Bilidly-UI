import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Typography, Button, CircularProgress, SvgIcon, Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classes from './ffGovernanceClaimAll.module.css';
import RewardsTable from './ffGovernanceClaimAllTable.js'

import stores from '../../stores'
import { ACTIONS, CONTRACTS } from '../../stores/constants';

function NoRewardsIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 64 64" strokeWidth="1" className={className}>
    <g strokeWidth="2" transform="translate(0, 0)"><path d="M15.029,48.971A24,24,0,0,1,48.971,15.029" fill="none" stroke="#686c7a" strokeMiterlimit="10" strokeWidth="2" data-cap="butt" strokeLinecap="butt" strokeLinejoin="miter"></path><path d="M52.789,20A24.006,24.006,0,0,1,20,52.789" fill="none" stroke="#686c7a" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2" strokeLinejoin="miter"></path><line x1="60" y1="4" x2="4" y2="60" fill="none" stroke="#686c7a" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2" data-color="color-2" strokeLinejoin="miter"></line></g>
    </SvgIcon>
  );
}

export default function ffClaimAll() {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [ rewards, setRewards ] = useState([])
  const [ vestNFTs, setVestNFTs ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ token, setToken ] = useState(null)
  const [ veToken, setVeToken ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ claimable, setClaimable ] = useState(false)
  const [ claimLoading, setClaimLoading ] = useState(false)

  const stableSwapUpdated = (rew) => {
    const nfts = stores.stableSwapStore.getStore('vestNFTs')

    setVestNFTs(nfts)
    setVeToken(stores.stableSwapStore.getStore('veToken'))

    if(nfts && nfts.length > 0) {
      if(!token) {
        setToken(nfts[0])
        window.setTimeout(() => {
          stores.dispatcher.dispatch({ type: ACTIONS.GET_REWARD_BALANCES, content: { tokenID: nfts[0].id } })
        })
      } else {
        window.setTimeout(() => {
          stores.dispatcher.dispatch({ type: ACTIONS.GET_REWARD_BALANCES, content: { tokenID: token.id } })
        })
      }
    } else {
      window.setTimeout(() => {
        stores.dispatcher.dispatch({ type: ACTIONS.GET_REWARD_BALANCES, content: { tokenID: 0 } })
      })
    }

    forceUpdate()
  }

  const rewardBalancesReturned = async (rew) => {

    if(rew) {
      if(rew && rew.bribes && rew.fees && rew.rewards && rew.veDist && rew.bribes.length >= 0 && rew.fees.length >= 0 && rew.rewards.length >= 0) {
        
        setRewards([...rew.bribes, ...rew.fees, ...rew.rewards, ...rew.veDist])
        const cl = [];
        let lpRewards = 0
        for(let reward of rew.rewards) {
          lpRewards += Number(reward.gauge.rewardsEarned)
        }
        cl.push({
          type: 'Bilidly',
          description: 'LP Rewards',
          earned: lpRewards,
          symbol: process.env.NEXT_PUBLIC_GOV_TOKEN_TICKER
        })
        setClaimable(cl)
      }
    } else {
        let re = stores.stableSwapStore.getStore('rewards')
        if(re && re.bribes && re.fees && re.rewards && re.veDist && re.bribes.length >= 0 && re.fees.length >= 0 && re.rewards.length >= 0) {
        setRewards([...re.bribes, ...re.fees, ...re.rewards, ...re.veDist])
      }
    }

  }

  useEffect(() => {

    rewardBalancesReturned()
    stableSwapUpdated()

    stores.emitter.on(ACTIONS.UPDATED, stableSwapUpdated);
    stores.emitter.on(ACTIONS.REWARD_BALANCES_RETURNED, rewardBalancesReturned);
    return () => {
      stores.emitter.removeListener(ACTIONS.UPDATED, stableSwapUpdated);
      stores.emitter.removeListener(ACTIONS.REWARD_BALANCES_RETURNED, rewardBalancesReturned);
    };
  }, [token]);

  useEffect(() => {

    const claimReturned = () => {
      setLoading(false)
    }

    const claimAllReturned = () => {
      setLoading(false)
    }

    stableSwapUpdated()

    stores.emitter.on(ACTIONS.CLAIM_BRIBE_RETURNED, claimReturned);
    stores.emitter.on(ACTIONS.CLAIM_REWARD_RETURNED, claimReturned);
    stores.emitter.on(ACTIONS.CLAIM_PAIR_FEES_RETURNED, claimReturned);
    stores.emitter.on(ACTIONS.CLAIM_VE_DIST_RETURNED, claimReturned);
    stores.emitter.on(ACTIONS.CLAIM_ALL_REWARDS_RETURNED, claimAllReturned);
    return () => {
      stores.emitter.removeListener(ACTIONS.CLAIM_BRIBE_RETURNED, claimReturned);
      stores.emitter.removeListener(ACTIONS.CLAIM_REWARD_RETURNED, claimReturned);
      stores.emitter.removeListener(ACTIONS.CLAIM_PAIR_FEES_RETURNED, claimReturned);
      stores.emitter.removeListener(ACTIONS.CLAIM_VE_DIST_RETURNED, claimReturned);
      stores.emitter.removeListener(ACTIONS.CLAIM_ALL_REWARDS_RETURNED, claimAllReturned);
    };
  }, [])

  const onClaim = () => {
    setClaimLoading(true)
    let sendTokenID = 0
    if(token && token.id) {
      sendTokenID = token.id
    }
    stores.dispatcher.dispatch({ type: ACTIONS.CLAIM_ALL_REWARDS, content: { pairs: rewards, tokenID: sendTokenID } })
  }

  return (
    <Paper elevation={0} className={classes.container}>

      {rewards.length>0 ?

        <div className={classes.hasRewards}>
          <RewardsTable claimable={ claimable } LP={ claimable } Bribes={ '' } />
          <div className={ classes.actionButtons }>
            <Button
              className={ classes.buttonOverride }
              variant='contained'
              size='large'
              color='primary'
              disabled={ claimLoading }
              onClick={ onClaim }
              >
              <Typography className={ classes.actionButtonText }>{ claimLoading ? `Claiming` : `Claim all` }</Typography>
              { claimLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
            </Button>
          </div>
        </div>

        :

        <div className={classes.noRewards}>
          <Grid container spacing={0} className={classes.centerGridRows}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <NoRewardsIcon className={ classes.overviewIcon } />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h5">You have no rewards</Typography>
            </Grid>
          </Grid>
        </div>
      }

    </Paper>
  );
}

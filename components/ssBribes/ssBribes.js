import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from "next/router";
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import classes from './ssBribes.module.css';

import BribeCard from '../ssBribeCard'

import stores from '../../stores'
import { ACTIONS } from '../../stores/constants';

export default function ssBribes() {

  const router = useRouter()

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [pairs, setPairs] = useState([])

  useEffect(() => {
    const stableSwapUpdated = () => {
      const pairs = stores.stableSwapStore.getStore('pairs')
      const pairsWithBribes = pairs.filter((pair) => {
        return pair && pair.gauge != null && pair.gauge.address && pair.gauge.bribes && pair.gauge.bribes.length > 0
      })
      setPairs(pairsWithBribes)
      forceUpdate()
    }

    stableSwapUpdated()

    stores.emitter.on(ACTIONS.UPDATED, stableSwapUpdated);
    return () => {
      stores.emitter.removeListener(ACTIONS.UPDATED, stableSwapUpdated);
    };
  }, []);

  const onBribe = () => {
    router.push('/governance/bribe/create')
  }

  return (
    <div className={ classes.container}>

      <div className={ classes.bribesContainer}>
      <Button
              variant="contained"
              color="secondary"
              className={classes.button + " " + classes.buttonOverride}
              startIcon={<AddCircleOutlineIcon />}
              size='large'
              color='primary'
              onClick={ onBribe }
            >
              <Typography className={ classes.actionButtonText }>{ `Create Bribe` }</Typography>
            </Button>
        <Grid container spacing={5}>
          {
            (pairs && pairs && pairs.length > 0) && pairs.map((pair) => {
              return pair.gauge.bribes.map((bribe, idx) => {
                return (<BribeCard pair={ pair } key={idx} bribe={ bribe } />)
              })
            })
          }
        </Grid>
      </div>
    </div>
  );
}

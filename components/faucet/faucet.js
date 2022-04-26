import React, { useState, useEffect, useCallback } from 'react'
import { Grid, Button, CircularProgress, Typography } from '@material-ui/core'

import classes from './faucet.module.css'

import stores from '../../stores'
import { ACTIONS } from '../../stores/constants'

export default function faucet() {

  console.log("IN FAUCET!")

    const [ web3, setWeb3 ] = useState(null)
    const [ faucetLoading, setFaucetLoading ] = useState(false)

    useEffect(() => {

        const useFaucetReturned = async (res) => {
          setFaucetLoading(false)
        }
    
        const accountChanged = async () => {
          const w3 = await stores.accountStore.getWeb3Provider()
          setWeb3(w3)
        }
    
        const errorReturned = () => {
          setFaucetLoading(false)
        }
    
        stores.emitter.on(ACTIONS.ERROR, errorReturned)
        stores.emitter.on(ACTIONS.USE_FAUCET_RETURNED, useFaucetReturned)
    
        accountChanged()
    
        return () => {
          stores.emitter.on(ACTIONS.ERROR, errorReturned)
          stores.emitter.removeListener(ACTIONS.USE_FAUCET_RETURNED, useFaucetReturned)
        }
      }, [])
    
      const onUseFaucet = () => {
        setFaucetLoading(true)
        stores.dispatcher.dispatch({ type: ACTIONS.USE_FAUCET })
      }

      return (
        <Grid item lg={6} md={6} sm={12} xs={12} className={ classes.mainTitle }>
        <Button
            onClick={ onUseFaucet }
            className={ classes.buttonFaucet }
            disabled={ faucetLoading }
          >{ faucetLoading ? `Requesting tokens` : `Get testnet tokens` }
          { faucetLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
        </Button>
        </Grid>
      )

}
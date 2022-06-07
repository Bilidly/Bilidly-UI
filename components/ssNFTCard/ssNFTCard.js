import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid, Button, FormControlLabel, Checkbox, Tooltip, Card, CardActions, CardContent, CardMedia, Divider, Box, CircularProgress } from '@material-ui/core'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import classes from './ssNFTCard.module.css'

import stores from '../../stores/index.js'

import { ACTIONS } from '../../stores/constants';

import { makeStyles } from '@material-ui/core/styles'
//import { Card, CardActions, CardContent, CardMedia, Divider, Box, CircularProgress } from '@mui/material'
import NFTPrice from './nftPrice'
import { formatAddress } from '../../utils';

const useStyles = makeStyles({
  root: {
    flexDirection: 'column',
    display: 'flex',
    margin: '15px',
    flexGrow: 1,
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    cursor: 'pointer'
  },
  cardContent: {
    paddingBottom: '8px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  firstDivider: {
    margin: 'auto 0 10px'
  },
  lastDivider: {
    marginTop: '10px'
  },
  addressesAndPrice: {
    display: 'flex',
    flexDirection: 'row'
  },
  addessesContainer: {
    margin: 'auto',
    width: '60%'
  },
  priceContainer: {
    width: '40%',
    margin: 'auto'
  },
  cardActions: {
    marginTop: 'auto',
    padding: '0 16px 8px 16px'
  }
})


export default function ssNFTCard({ nft, action, updateNFT }) {

  //const { nftContract, marketplaceContract, hasWeb3 } = useContext(Web3Context)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [listingFee, setListingFee] = useState('')
  const [priceError, setPriceError] = useState(false)
  const [newPrice, setPrice] = useState(0)
  const styles = useStyles()
  const { name, lockAmount, lockEnds, image } = nft


  useEffect(() => {
    const fee = async () => await stores.stableSwapStore.getAndSetListingFee()
    setListingFee(fee)

    const errorReturned = () => {
      console.log("wut")
    }

    stores.emitter.on(ACTIONS.ERROR, errorReturned);
    stores.emitter.on(ACTIONS.BUY_NFT_RETURNED, updateNFT); // should include () ?
    stores.emitter.on(ACTIONS.APPROVE_NFT_RETURNED, updateNFT);
    stores.emitter.on(ACTIONS.CANCEL_NFT_RETURNED, updateNFT);
    stores.emitter.on(ACTIONS.SELL_NFT_RETURNED, updateNFT);
    return () => {
      stores.emitter.removeListener(ACTIONS.ERROR, errorReturned);
      stores.emitter.removeListener(ACTIONS.BUY_NFT_RETURNED, updateNFT);
      stores.emitter.removeListener(ACTIONS.APPROVE_NFT_RETURNED, updateNFT);
      stores.emitter.removeListener(ACTIONS.CANCEL_NFT_RETURNED, updateNFT);
      stores.emitter.removeListener(ACTIONS.SELL_NFT_RETURNED, updateNFT);
    };

  }, []);

  const actions = {
    buy: {
      text: 'buy',
      method: buyNft
    },
    cancel: {
      text: 'cancel',
      method: cancelNft
    },
    sell: {
      text: listingFee ? `Sell (${listingFee} fee)` : 'Sell',
      method: sellNft
    },
    none: {
      text: '',
      method: () => {}
    }
  }


  async function buyNft (nft) {
    stores.dispatcher.dispatch({ type: ACTIONS.BUY_NFT, content: { nft } })
    //updateNFT()
  }

  async function cancelNft (nft) {
    stores.dispatcher.dispatch({ type: ACTIONS.CANCEL_NFT, content: { nft } })
    //updateNFT()
  }

  async function sellNft (nft) {
    if (!newPrice) {
      setPriceError(true)
      return
    }
    setPriceError(false)
    stores.dispatcher.dispatch({ type: ACTIONS.SELL_NFT, content: { nft, newPrice } })
    //updateNFT()
    //return transaction
  }

  async function onClick (nft) {
    try {
      setIsLoading(true)
      await actions[action].method(nft)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

    return (
      <Card
      className={styles.root}
      raised={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      <CardMedia
        className={styles.media}
        alt={name}
        image={image}
        component="a"
      />

      <CardContent className={styles.cardContent} >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          >
            {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          >
            {lockAmount}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          >
            {lockEnds}
        </Typography>
        <Divider className={styles.firstDivider} />
        <Box className={styles.addressesAndPrice}>
          <div className={styles.addessesContainer}>
          <Typography variant="body2" color="text.secondary">
            { formatAddress(nft.seller) }
          </Typography>
          </div>
          <div className={styles.priceContainer}>
            {action === 'sell'
              ? <TextField
                id="price-input"
                label="Price"
                name="price"
                size="small"
                fullWidth
                required={!disabled}
                margin="dense"
                type="number"
                inputProps={{ step: 'any' }}
                disabled={isLoading}
                onChange={e => setPrice(e.target.value)}
                error={priceError}
                sx={{ margin: '0' }}
              />
              : <NFTPrice nft={nft}/>
            }
          </div>
        </Box>
        <Divider className={styles.lastDivider} />
      </CardContent>
      <CardActions className={styles.cardActions}>
      <Button
        variant='outlined'
        color='primary'
        onClick={() => !isLoading && onClick(nft)}>
        {isLoading
          ? <CircularProgress size="20px" />
          : //hasWeb3 && 
          actions[action].text
        }
        </Button>
      </CardActions>
    </Card>
  )
}

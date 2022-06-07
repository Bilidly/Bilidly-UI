import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import {
  Grid,
  Paper,
  Button,
  Typography,
  LinearProgress,
  Fade,
  TextField,
  Box,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import classes from "./ssMarketplace.module.css";

import stores from "../../stores";
import { ACTIONS } from "../../stores/constants";

import InfiniteScroll from "react-infinite-scroll-component";
//import LinearProgress from '@mui/material/LinearProgress'
//import Fade from '@mui/material/Fade'
import { makeStyles } from "@material-ui/core/styles";
import NFTCard from "../ssNFTCard";
import { Pagination } from "@material-ui/lab";
//import NFTCardCreation from '../molecules/NFTCardCreation'

const useStyles = makeStyles((theme) => ({
  grid: {
    spacing: 3,
    alignItems: "stretch",
  },
  gridItem: {
    display: "flex",
    transition: "all .3s",
    [theme.breakpoints.down("sm")]: {
      margin: "0 20px",
    },
  },
}));
const useDeferedValue = (value, delay = 500) => {
  const [state, setState] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(value);
    }
    , delay);
    return () => clearTimeout(timeout);
  }, [value]);
  return state;
};

const ROWS_PER_PAGE = 8;
export default function ssMarketplace({ withCreateNFT }) {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const styles = useStyles();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [govToken, setGovToken] = useState(null);
  const [veToken, setVeToken] = useState(null);
  const [nft, setNFT] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const ssUpdated = async () => {
    setGovToken(stores.stableSwapStore.getStore("govToken"));
    setVeToken(stores.stableSwapStore.getStore("veToken"));

    const nft = await stores.stableSwapStore.getNFTByID(router.query.id);
    setNFT(nft);
    forceUpdate();
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const loadNFTs = async () => {
    //if (!isReady) return
    const items = await stores.stableSwapStore.loadNFTs();
    setNfts(items);
    setIsLoading(false);
    forceUpdate();
  };

  useEffect(() => {
    ssUpdated();
    loadNFTs();

    stores.emitter.on(ACTIONS.UPDATED, ssUpdated);
    stores.emitter.on(ACTIONS.UPDATED, loadNFTs);
    //stores.emitter.on(ACTIONS.LOAD_NFTS_ITEMS, loadNFTs);
    return () => {
      stores.emitter.removeListener(ACTIONS.UPDATED, ssUpdated);
      stores.emitter.removeListener(ACTIONS.UPDATED, loadNFTs);
      //stores.emitter.on(ACTIONS.LOAD_NFTS_ITEMS_RETURNED, loadNFTs);
    };
  }, []);
  const deferedSearch = useDeferedValue(search);
  const filteredNfts = useMemo(()=> {
    if (!deferedSearch) return nfts;
    setPage(1);
    return nfts.filter((nft) => nft.name.toLowerCase().includes(deferedSearch.toLowerCase()));
  }, [deferedSearch, nfts]);
  if (isLoading) return <LinearProgress />;
  //if (!isLoading && !nfts.length) return <h1>No NFTs for sale</h1>

  /*async function addNFTToList (tokenId) {
    //const nft = await mapCreatedAndOwnedTokenIdsAsMarketItems(marketplaceContract, nftContract, account)(tokenId)
    const nft = await stores.stableSwapStore.mapCreatedAndOwnedTokenIdsAsMarketItems()(tokenId)
    setNfts(prevNfts => [nft, ...prevNfts])
  }*/
  
  function NFT({ nft, index }) {
    if (nft.ownedByAccount && !nft.sold) {
      return <NFTCard nft={nft} action="cancel" updateNFT={() => loadNFTs()} />;
    }

    //if (nft.owner === ethers.constants.AddressZero) {
    else {
      return <NFTCard nft={nft} action="buy" updateNFT={() => loadNFTs()} />;
    }

    //return <NFTCard nft={nft} action="none"/>
  };

  return (
    <div className={classes.container}>
      <div>
        <Box p={`20px`} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <TextField id="search" label="Search" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
        </Box>
        <Grid container spacing={`20px`} className={styles.grid} id="grid">
          {/*withCreateNFT && <Grid item xs={12} sm={6} md={3} className={classes.gridItem}>
                <NFTCardCreation addNFTToList={addNFTToList}/>
  </Grid>*/}
  
          {filteredNfts
            .slice(
              (page - 1) * ROWS_PER_PAGE,
              (page - 1) * ROWS_PER_PAGE + ROWS_PER_PAGE
            )
            .map((nft, i) => (
              <Fade in={true} key={i}>
                <Grid item xs={12} sm={6} md={3} className={styles.gridItem}>
                  <NFT nft={nft} index={i} />
                </Grid>
              </Fade>
            ))}
          <Grid item xs={12}  justifyContent="flex-end" alignItems="flex-end" style={{
            display: "flex",
            padding: "20px",
          }}>
            <Pagination
              count={Math.ceil(filteredNfts.length / ROWS_PER_PAGE)}
              page={page}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

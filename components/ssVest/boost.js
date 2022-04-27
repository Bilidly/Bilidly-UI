import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import stores from '../../stores';
import { ACTIONS, CONTRACTS } from '../../stores/constants';

import { Typography, Paper, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import classes from './ssVest.module.css';
import moment from 'moment';
import { formatCurrency, normalizeDate } from '../../utils';
import { useTabContext } from '@material-ui/lab';

export default function Boost () {
  const router = useRouter();

  const [ boostLoading, setBoostLoading ] = useState(false)
  const [stakeAmount, setStakeAmount] = useState(0);
  const [stakeAmountError, setStakeAmountError] = useState(false);
  const [lockAmount, setLockAmount] = useState(0);
  const [lockAmountError, setLockAmountError] = useState(false);
  const [gauge, setGauge] = useState(null);
  const [pair, setPair] = useState(null);
  const [allGauges, setAllGauges] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateError, setSelectedDateError] = useState(false);
  const [selectedValue, setSelectedValue] = useState('month');
  const [totalVeSupply, setTotalVeSupply] = useState(0)
  const [govTokenPrice, setGovTokenPrice] = useState(0)
  const [gaugeLPValue, setGaugeLPValue] = useState(0)

  const veTotalSupply = () => {
    stores.dispatcher.dispatch({ type: ACTIONS.TOTAL_VOTING_POWER })
  }
  
  const ssUpdated = () => {

    const as = stores.stableSwapStore.getStore('pairs');

    const filteredAssets = as.filter((asset) => {
      return asset.gauge && asset.gauge.address
    })
    setAllGauges(filteredAssets)
       
  }

  const veTotalSupplyReturned = (val) => {
    setTotalVeSupply(Number(val))
  }

  const onGaugeSelectChanged = async (event, pair) => {
    setPair(pair);

    const gaugeValue = pair.token0.priceUSD * pair.gauge.reserve0 + pair.token1.priceUSD * pair.gauge.reserve1
    setGaugeLPValue(gaugeValue)
    
    const govTokenInfo = await stores.stableSwapStore.getBaseAsset(CONTRACTS.GOV_TOKEN_ADDRESS)

    setGovTokenPrice(govTokenInfo.priceUSD)
  };

  const handleDateChange = (event) => {
    setSelectedDate(normalizeDate(event.target.value));
    setSelectedValue(null);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);

    let newDate;

    switch (event.target.value) {
      case 'month':
        newDate = moment().add(1, 'months').format('YYYY-MM-DD');
        break;
      case 'year':
        newDate = moment().add(1, 'years').format('YYYY-MM-DD');
        break;
      case '2year':
        newDate = moment().add(2, 'years').format('YYYY-MM-DD');
        break;
      default:
        newDate = moment().add(4, 'years').subtract(1, 'days').format('YYYY-MM-DD');
    }

    setSelectedDate(normalizeDate(newDate));
  };


  const veTokenForLock = (lockAmount, endLockDate) => {
    const lockDuration = moment.duration(moment(endLockDate).diff(moment())).asDays();
    const maxLockDuration = moment.duration(moment().add(4, 'years').diff(moment())).asDays();

    let amount = (lockAmount * lockDuration) / maxLockDuration;
    return amount ? amount : 0;
  };

  const calculateDerivedBalance = (gauge, balance, lockAmount, endLockDate) => {
    // We substract existing lock from new lock added to totalVeSupply
    /*const nfts = stores.stableSwapStore.getStore('vestNFTs')
    let existingLock = 0
    for(let nft of nfts) {
      existingLock += Number(nft.lockValue)
    }*/
    const veUnderlyingForLock = veTokenForLock(lockAmount, endLockDate);
    return Math.min(
      balance * 0.4 + ((Number(gauge.totalSupply) + balance) * 0.6 * veUnderlyingForLock) / (totalVeSupply + veUnderlyingForLock),
      balance,
    );
  }

  const userBoost = (pair, stakeAmount, lockAmount, endLockDate) => {
    if (!pair) {
      return 0;
    }
    const gauge = pair.gauge
    const lpValue = (pair.token0.priceUSD * pair.reserve0 + pair.token1.priceUSD * pair.reserve1) / pair.totalSupply
    console.log(typeof pair.totalSupply, typeof pair.gauge)
    const balance = stakeAmount / lpValue
    const derivedBalance = calculateDerivedBalance(gauge, balance, lockAmount, endLockDate)
    
    const boost = (derivedBalance / (0.4 * balance)).toFixed(2)
    return boost
  };

  const userAPR = (pair, stakeAmount, lockAmount, endLockDate) => {
    if (!pair) {
      return 0;
    }
    const gauge = pair.gauge
    const lpValue = (pair.token0.priceUSD * pair.reserve0 + pair.token1.priceUSD * pair.reserve1) / pair.totalSupply
    const balance = stakeAmount / lpValue
    const derivedBalance = calculateDerivedBalance(gauge, balance, lockAmount, endLockDate)

    const govRewardsValue = gauge.govTokenRewardRate * govTokenPrice

    const apr = ((govRewardsValue * (derivedBalance / (Number(gauge.derivedSupply) + derivedBalance))) / stakeAmount) * (86400 * 365) * 100
    return apr
  };

  useEffect(() => {
    const boostReturned = () => {
      setBoostLoading(false)
      router.push('/governance/vest')
    }
    const errorReturned = () => {
      setBoostLoading(false)
    }

    ssUpdated()
    veTotalSupply()

    stores.emitter.on(ACTIONS.TOTAL_VOTING_POWER_RETURNED, veTotalSupplyReturned);
    return () => {
      stores.emitter.removeListener(ACTIONS.TOTAL_VOTING_POWER_RETURNED, veTotalSupplyReturned);
    };
  }, []);

  const clearPlaceholder = () => {
    if (stakeAmount === 0) setStakeAmount("");
    if (lockAmount === 0) setLockAmount("");
  };


  return (
    <Paper elevation={1} className={classes.projectCardContainer}>
      <Typography variant="h3" className={classes.sectionHeader}>
        Boost Calculator
      </Typography>
      <div>
        <div className={classes.textField}>
          <div className={classes.inputTitleContainer}>
            <div className={classes.inputTitle}>
              <Typography variant="h5" noWrap>
                Select Gauge
              </Typography>
            </div>
          </div>
          <Autocomplete
            disableClearable={true}
            options={allGauges}
            onChange={onGaugeSelectChanged}
            getOptionLabel={(option) => option.symbol}
            fullWidth={true}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <div className={classes.text}>{option.symbol}</div>
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  ...{
                    placeholder: 'Search gauge',
                  },
                }}
                variant="outlined"
              />
            )}
          />
        </div>

        <div className={classes.textField}>
          <div className={classes.inputTitleContainer}>
            <div className={classes.inputTitle}>
              <Typography variant="h5" noWrap>
                Staked amount {gauge ? `($${formatCurrency(gaugeLPValue)})` : ''}
              </Typography>
            </div>
          </div>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="0.00"
            onFocus={() => clearPlaceholder()}
            value={stakeAmount}
            error={stakeAmountError}
            onChange={(e) => {
              setStakeAmount(e.target.value);
            }}
          />
        </div>

        <div className={classes.textField}>
          <div className={classes.inputTitleContainer}>
            <div className={classes.inputTitle}>
              <Typography variant="h5" noWrap>
                Locked BI amount {lockAmount ? `($${formatCurrency(lockAmount * govTokenPrice)})` : ''}
              </Typography>
            </div>
          </div>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="0.00"
            onFocus={() => clearPlaceholder()}
            value={lockAmount}
            error={lockAmountError}
            onChange={(e) => {
              setLockAmount(e.target.value);
            }}
          />
        </div>

        <div className={classes.textField}>
          <div className={classes.inputTitleContainer}>
            <div className={classes.inputTitle}>
              <Typography variant="h5" noWrap>
                Lock until
              </Typography>
            </div>
          </div>
          <TextField
            fullWidth
            id="date"
            type="date"
            variant="outlined"
            className={classes.textField}
            onChange={handleDateChange}
            value={selectedDate}
            error={selectedDateError}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className={classes.textField}>
          <RadioGroup row aria-label="position" name="position" onChange={handleChange} value={selectedValue} className={classes.radioButton}>
            <FormControlLabel value="month" control={<Radio color="primary" />} label="1 month" labelPlacement="bottom" />
            <FormControlLabel value="year" control={<Radio color="primary" />} label="1 year" labelPlacement="bottom" />
            <FormControlLabel value="2year" control={<Radio color="primary" />} label="2 years" labelPlacement="bottom" />

              <FormControlLabel value="years" control={<Radio color="primary" />} label="4 years" labelPlacement="bottom" />

          </RadioGroup>
        </div>

        <div className={classes.boost}>
          <div>
            <Typography variant="h5">
              Estimated veBI: {formatCurrency(veTokenForLock(lockAmount, selectedDate))}
            </Typography>
            <Typography variant="h5">
              Total veBI: {formatCurrency(totalVeSupply)}
            </Typography>
            {gauge ? (
              <Typography variant="h5">
                Total staked in gauge: ${formatCurrency(gaugeLPValue)}
              </Typography>
            ) : (
              ''
            )}
          </div>
          <div>
            <Typography variant="h4">Boost: {formatCurrency(userBoost(pair, stakeAmount, lockAmount, selectedDate))}</Typography>
            {pair ? <Typography>Estimated APR: {formatCurrency(userAPR(pair, stakeAmount, lockAmount, selectedDate))}%</Typography> : ''}
          </div>
        </div>
      </div>
    </Paper>
  );
}
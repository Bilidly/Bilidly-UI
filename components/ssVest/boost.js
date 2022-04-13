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
  const [allGauges, setAllGauges] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateError, setSelectedDateError] = useState(false);
  const [selectedValue, setSelectedValue] = useState('month');
  const [totalVeSupply, setTotalVeSupply] = useState(0)
  const [govTokenPrice, setGovTokenPrice] = useState(0)
  const [gaugeValue, setGaugeValue] = useState(0)
  const [gaugeDerivedSupply, setGaugeDerivedSupply] = useState(0)
  const [gaugeTotalSupply, setgaugeTotalSupply] = useState(0)

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
    console.log("ve total supply " + JSON.stringify(val))
    setTotalVeSupply(val)
  }

  const onGaugeSelectChanged = async (event, pair) => {
    setGauge(pair);

    console.log("THE PAIR " + JSON.stringify(pair))

    const gaugeVal = pair.token0.priceUSD * pair.gauge.reserve0 + pair.token1.priceUSD * pair.gauge.reserve1
    setGaugeValue(gaugeVal)
    
    const govTokenInfo = await stores.stableSwapStore.getBaseAsset(CONTRACTS.GOV_TOKEN_ADDRESS)

    setGovTokenPrice(govTokenInfo.priceUSD)

    stores.dispatcher.dispatch({ type: ACTIONS.GET_GAUGE_INFO, content: pair})

    const gaugeInfoReturned = (val) => {
      setGaugeDerivedSupply(val.derivedSupply)
      setgaugeTotalSupply(val.gaugeTotal)
    }

    stores.emitter.on(ACTIONS.GET_GAUGE_INFO_RETURNED, gaugeInfoReturned)
    return () => {
      stores.emitter.removeListener(ACTIONS.GET_GAUGE_INFO_RETURNED, gaugeInfoReturned);
    }
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

  const calculatedBoost = (gauge, stake, lock, endLockDate) => {
    const veUnderlyingForLock = veTokenForLock(lock, endLockDate);

    return userBoost(gauge, stake, veUnderlyingForLock, +totalVeSupply);
  };

  const veTokenForLock = (lock, endLockDate) => {
    const lockDuration = moment.duration(moment(endLockDate).diff(moment())).asDays();
    const maxLockDuration = moment.duration(moment().add(4, 'years').diff(moment())).asDays();

    let amount = (lock * lockDuration) / maxLockDuration;

    return amount ? amount : 0;
  };

  const userBoost = (gauge, stake, veTokenBalance, totalVeTokenSupply) => {
    if (!gauge) {
      return 0;
    }

    return Math.min(userLiquidityShare(gauge, stake, veTokenBalance, totalVeTokenSupply) / userLiquidityShare(gauge, stake, 0, totalVeTokenSupply), 2.5);
  };

  const userLiquidityShare = (gauge, balance, veTokenBalance, totalVeTokenSupply) => {
    let derivedBalance = Math.min(
      balance * 0.4 + ((gaugeValue + balance) * 0.6 * veTokenBalance) / (totalVeTokenSupply + veTokenBalance),
      balance,
    );
    return (derivedBalance * 100) / ((gaugeDerivedSupply / gaugeTotalSupply) * gaugeValue + derivedBalance);
  };

  const userAPR = (gauge, balance, lock, endLockDate) => {
    const veUnderlyingForLock = veTokenForLock(lock, endLockDate);
    console.log(veUnderlyingForLock, balance, totalVeSupply)
    const liquidityShare = userLiquidityShare(gauge, +balance, +veUnderlyingForLock, +totalVeSupply);

    return (gauge.gaugeRewards * liquidityShare) / (balance / gaugeDerivedSupply) * gaugeValue;
    //return (gauge.gaugeRewards * liquidityShare) / (derivedBalance / gaugeDerivedSupply) * gaugeValue;
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
                Staked amount {gauge ? `($${formatCurrency(gaugeValue)})` : ''}
              </Typography>
            </div>
          </div>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="0.00"
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
                Total staked in gauge: ${formatCurrency(gaugeValue)}
              </Typography>
            ) : (
              ''
            )}
          </div>
          <div>
            <Typography variant="h4">Boost: {formatCurrency(calculatedBoost(gauge, stakeAmount, lockAmount, selectedDate))}</Typography>
            {gauge ? <Typography>Estimated APR: {formatCurrency(userAPR(gauge, stakeAmount, lockAmount, selectedDate))}%</Typography> : ''}
          </div>
        </div>
      </div>
    </Paper>
  );
}
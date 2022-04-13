import {
  Slider,
  TableCell,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../utils";
import BigNumber from "bignumber.js";
import { useVoteStyles } from "./ssVotesTable";

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#ffb405",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  active: {},
  track: {
    height: 8,
  },
  rail: {
    height: 8,
  },
})(Slider);

const ssVotesTableRow = ({ row, sliderValue, token }) => {
  const [value, setValue] = useState(sliderValue);
  const classes = useVoteStyles();
  useEffect(() => {
    if (sliderValue !== value) {
      setValue(sliderValue);
    }
  }, [sliderValue]);
  return (
    <TableRow>
      <TableCell className={classes.cell}>
        <div className={classes.inline}>
          <div className={classes.doubleImages}>
            <img
              className={classes.img1Logo}
              src={row.token0.logoURI || "/tokens/unknown-logo.png"}
              width="37"
              height="37"
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/tokens/unknown-logo.png";
              }}
            />
            <img
              className={classes.img2Logo}
              src={row.token1.logoURI || "/tokens/unknown-logo.png"}
              width="37"
              height="37"
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/tokens/unknown-logo.png";
              }}
            />
          </div>
          <div>
            <Typography variant="h2" className={classes.textSpaced}>
              {row?.symbol}
            </Typography>
            <Typography
              variant="h5"
              className={classes.textSpaced}
              color="textSecondary"
            >
              {row?.isStable ? "Stable Pool" : "Volatile Pool"}
            </Typography>
          </div>
        </div>
      </TableCell>
      <TableCell className={classes.cell} align="right">
        <div className={classes.inlineEnd}>
          <Typography variant="h2" className={classes.textSpaced}>
            {formatCurrency(
              BigNumber(row?.gauge?.balance)
                .div(row?.gauge?.totalSupply)
                .times(row?.reserve0)
            )}
          </Typography>
          <Typography
            variant="h5"
            className={classes.textSpaced}
            color="textSecondary"
          >
            {row?.token0?.symbol}
          </Typography>
        </div>
        <div className={classes.inlineEnd}>
          <Typography variant="h5" className={classes.textSpaced}>
            {formatCurrency(
              BigNumber(row?.gauge?.balance)
                .div(row?.gauge?.totalSupply)
                .times(row?.reserve1)
            )}
          </Typography>
          <Typography
            variant="h5"
            className={classes.textSpaced}
            color="textSecondary"
          >
            {row?.token1?.symbol}
          </Typography>
        </div>
      </TableCell>
      <TableCell className={classes.cell} align="right">
        <div className={classes.inlineEnd}>
          <Typography variant="h2" className={classes.textSpaced}>
            {formatCurrency(BigNumber(row?.reserve0))}
          </Typography>
          <Typography
            variant="h5"
            className={classes.textSpaced}
            color="textSecondary"
          >
            {row?.token0?.symbol}
          </Typography>
        </div>
        <div className={classes.inlineEnd}>
          <Typography variant="h5" className={classes.textSpaced}>
            {formatCurrency(BigNumber(row?.reserve1))}
          </Typography>
          <Typography
            variant="h5"
            className={classes.textSpaced}
            color="textSecondary"
          >
            {row?.token1?.symbol}
          </Typography>
        </div>
      </TableCell>
      <TableCell className={classes.cell} align="right">
        <Typography variant="h2" className={classes.textSpaced}>
          {formatCurrency(row?.gauge?.weight)}
        </Typography>
        <Typography
          variant="h5"
          className={classes.textSpaced}
          color="textSecondary"
        >
          {formatCurrency(row?.gauge?.weightPercent)} %
        </Typography>
      </TableCell>
      <TableCell className={classes.cell} align="right">
        {row?.gauge?.bribes.map((bribe, idx) => {
          return (
            <div className={classes.inlineEnd} key={idx}>
              <Typography variant="h2" className={classes.textSpaced}>
                {formatCurrency(bribe.rewardAmount)}
              </Typography>
              <Typography
                variant="h5"
                className={classes.textSpaced}
                color="textSecondary"
              >
                {bribe.token.symbol}
              </Typography>
            </div>
          );
        })}
      </TableCell>
      <TableCell className={classes.cell} align="right">
        <Typography variant="h2" className={classes.textSpaced}>
          {formatCurrency(BigNumber(value).div(100).times(token?.lockValue))}
        </Typography>
        <Typography
          variant="h5"
          className={classes.textSpaced}
          color="textSecondary"
        >
          {formatCurrency(value)} %
        </Typography>
      </TableCell>
      <TableCell className={classes.cell} align="right">
        <PrettoSlider
          valueLabelDisplay="auto"
          value={value}
          onChange={(event, value) => {
            setValue(value);
          }}
          min={-100}
          max={100}
          marks
        />
      </TableCell>
    </TableRow>
  );
};

export default ssVotesTableRow;

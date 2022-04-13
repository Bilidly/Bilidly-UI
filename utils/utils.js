import BigNumber from "bignumber.js";
import moment from 'moment';

// todo: get navigator declared somehow? probably an issue with using nextjs
// function getLang() {
//  if (window.navigator.languages != undefined)
//   return window.navigator.languages[0];
//  else
//   return window.navigator.language;
// }

export function formatCurrency(amount, decimals = 2) {
  if (!isNaN(amount)) {
    if (BigNumber(amount).gt(0) && BigNumber(amount).lt(0.01)) {
      return "< 0.01";
    }

    const formatter = new Intl.NumberFormat(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return formatter.format(amount);
  } else {
    return 0;
  }
}

export function formatAddress(address, length = "short") {
  if (!address) return "";
  if (length === "short") {
    address =
      address.substring(0, 6) +
      "..." +
      address.substring(address.length - 4, address.length);
    return address;
  } else if (length === "long") {
    address =
      address.substring(0, 12) +
      "..." +
      address.substring(address.length - 8, address.length);
    return address;
  }
}

export function bnDec(decimals) {
  return new BigNumber(10).pow(parseInt(decimals));
}

export function sqrt(value) {
  if (value < 0n) {
    throw new Error("square root of negative numbers is not supported");
  }

  if (value < 2n) {
    return value;
  }

  function newtonIteration(n, x0) {
    // eslint-disable-next-line no-bitwise
    const x1 = (n / x0 + x0) >> 1n;
    if (x0 === x1 || x0 === x1 - 1n) {
      return x0;
    }
    return newtonIteration(n, x1);
  }

  return newtonIteration(value, 1n);
}

export function multiplyBnToFixed(...args) {
  if (args.length < 3)
    throw new Error(
      "multiplyBnToFixed needs at least 3 arguments: first bn, second bn to multiply with first, and number of decimals."
    );

  const decimals = args[args.length - 1];
  const bigNumbers = args.slice(0, -1);

  return bnToFixed(
    multiplyArray(bigNumbers),
    decimals * bigNumbers.length,
    decimals
  );
}

export function sumArray(numbers) {
  return numbers.reduce((total, n) => total + Number(n), 0);
}

export function bnToFixed(bn, decimals, displayDecimals = decimals) {
  const bnDecimals = new BigNumber(10).pow(decimals);

  return new BigNumber(bn)
    .dividedBy(bnDecimals)
    .toFixed(displayDecimals, BigNumber.ROUND_DOWN);
}

export function floatToFixed(float, decimals = 0) {
  return new BigNumber(float).toFixed(decimals, BigNumber.ROUND_DOWN);
}

export function multiplyArray(numbers) {
  return numbers.reduce((total, n) => total * n, 1);
}

// Joining classes
export function joinClasses(...args) {
  return args.filter(Boolean).join(" ");
}

export function normalizeDate(inputDate) {
  const week = 7 * 24 * 3600;
  let normalizeTimestamp = Math.floor(moment(inputDate).unix() / week) * week + week;
  const maxTimestamp = moment().unix() + 4 * 365 * 24 * 3600;
  while (normalizeTimestamp > maxTimestamp) {
    normalizeTimestamp -= week;
  }
  return moment.unix(normalizeTimestamp).format('YYYY-MM-DD');
}

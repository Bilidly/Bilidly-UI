import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Typography,
  Slider,
  Tooltip,
} from "@material-ui/core";
import BigNumber from "bignumber.js";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SsVotesTableRow from "./ssVotesTableRow";
import { formatCurrency } from "../../utils";

const PrettoSlider = withStyles({
  root: {
    color: "#ffb405",
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
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
  },
  rail: {
    height: 8,
  },
})(Slider);

function descendingComparator(a, b, orderBy) {
  if (!a || !b) {
    return 0;
  }

  switch (orderBy) {
    case "balance":
      if (BigNumber(b?.gauge?.balance).lt(a?.gauge?.balance)) {
        return -1;
      }
      if (BigNumber(b?.gauge?.balance).gt(a?.gauge?.balance)) {
        return 1;
      }
      return 0;

    case "liquidity":
      let reserveA = BigNumber(a?.reserve0).plus(a?.reserve1).toNumber();
      let reserveB = BigNumber(b?.reserve0).plus(b?.reserve1).toNumber();

      if (BigNumber(reserveB).lt(reserveA)) {
        return -1;
      }
      if (BigNumber(reserveB).gt(reserveA)) {
        return 1;
      }
      return 0;

    case "totalVotes":
      if (BigNumber(b?.gauge?.weightPercent).lt(a?.gauge?.weightPercent)) {
        return -1;
      }
      if (BigNumber(b?.gauge?.weightPercent).gt(a?.gauge?.weightPercent)) {
        return 1;
      }
      return 0;

    case "apy":
      if (BigNumber(b?.gauge?.bribes.length).lt(a?.gauge?.bribes.length)) {
        return -1;
      }
      if (BigNumber(b?.gauge?.bribes.length).gt(a?.gauge?.bribes.length)) {
        return 1;
      }
      return 0;

    case "myVotes":
    case "mvp":
      if (BigNumber(b?.gauge?.bribes.length).lt(a?.gauge?.bribes.length)) {
        return -1;
      }
      if (BigNumber(b?.gauge?.bribes.length).gt(a?.gauge?.bribes.length)) {
        return 1;
      }
      return 0;

    default:
      return 0;
  }
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "asset", numeric: false, disablePadding: false, label: "Asset" },
  {
    id: "balance",
    numeric: true,
    disablePadding: false,
    label: "My Stake",
  },
  {
    id: "liquidity",
    numeric: true,
    disablePadding: false,
    label: "Total Liquidity",
  },
  {
    id: "totalVotes",
    numeric: true,
    disablePadding: false,
    label: "Total Votes",
  },
  {
    id: "apy",
    numeric: true,
    disablePadding: false,
    label: "Bribes",
  },
  {
    id: "myVotes",
    numeric: true,
    disablePadding: false,
    label: "My Votes",
  },
  {
    id: "mvp",
    numeric: true,
    disablePadding: false,
    label: "My Vote %",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const classes = useVoteStyles();
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            className={classes.overrideTableHead}
            key={index}
            align={headCell.numeric ? "right" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="h5" className={classes.headerText}>
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export const useVoteStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  inline: {
    display: "flex",
    alignItems: "center",
  },
  inlineBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0px",
  },
  icon: {
    marginRight: "12px",
  },
  textSpaced: {
    lineHeight: "1.5",
    fontWeight: "200",
    fontSize: "12px",
  },
  textSpacedFloat: {
    lineHeight: "1.5",
    fontWeight: "200",
    fontSize: "12px",
    float: "right",
  },
  cell: {},
  cellSuccess: {
    color: "#4eaf0a",
  },
  cellAddress: {
    cursor: "pointer",
  },
  aligntRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  skelly: {
    marginBottom: "12px",
    marginTop: "12px",
  },
  skelly1: {
    marginBottom: "12px",
    marginTop: "24px",
  },
  skelly2: {
    margin: "12px 6px",
  },
  tableBottomSkelly: {
    display: "flex",
    justifyContent: "flex-end",
  },
  assetInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    padding: "24px",
    width: "100%",
    flexWrap: "wrap",
    borderBottom: "1px solid rgba(128, 128, 128, 0.32)",
    background:
      "radial-gradient(circle, rgba(255, 190, 49,0.7) 0%, rgba(237, 177, 47,0.7) 48%) rgba(255, 190, 49,0.7) 100%",
  },
  assetInfoError: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    padding: "24px",
    width: "100%",
    flexWrap: "wrap",
    borderBottom: "1px solid rgba(128, 128, 128, 0.32)",
    background: "#dc3545",
  },
  infoField: {
    flex: 1,
  },
  flexy: {
    padding: "6px 0px",
  },
  overrideCell: {
    padding: "0px",
  },
  hoverRow: {
    cursor: "pointer",
  },
  statusLiquid: {
    color: "#dc3545",
  },
  statusWarning: {
    color: "#FF9029",
  },
  statusSafe: {
    color: "green",
  },
  imgLogo: {
    marginRight: "12px",
  },
  overrideTableHead: {
    borderBottom: "1px solid rgba(122, 111, 104,0.2) !important",
  },
  headerText: {
    fontWeight: "200",
    fontSize: "12px",
  },
  tooltipContainer: {
    minWidth: "240px",
    padding: "0px 15px",
  },
  infoIcon: {
    color: "#ffb405",
    fontSize: "16px",
    float: "right",
    marginLeft: "10px",
  },
  doubleImages: {
    display: "flex",
    position: "relative",
    width: "70px",
    height: "35px",
  },
  img1Logo: {
    position: "absolute",
    left: "0px",
    top: "0px",
    border: "3px solid rgb(56, 36, 25)",
    borderRadius: "30px",
  },
  img2Logo: {
    position: "absolute",
    left: "23px",
    zIndex: "1",
    top: "0px",
    border: "3px solid rgb(56, 36, 25)",
    borderRadius: "30px",
  },
  inlineEnd: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

export default function EnhancedTable({
  gauges,
  defaultVotes,
  veToken,
  token,
}) {
  const classes = useVoteStyles();
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("totalVotes");
  const [sliderValues, setSliderValues] = useState(defaultVotes);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setSliderValues(defaultVotes);
  }, [defaultVotes]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!gauges[0]) {
    return (
      <div className={classes.root}>
        <Skeleton
          variant="rect"
          width={"100%"}
          height={40}
          className={classes.skelly1}
        />
        <Skeleton
          variant="rect"
          width={"100%"}
          height={70}
          className={classes.skelly}
        />
        <Skeleton
          variant="rect"
          width={"100%"}
          height={70}
          className={classes.skelly}
        />
        <Skeleton
          variant="rect"
          width={"100%"}
          height={70}
          className={classes.skelly}
        />
        <Skeleton
          variant="rect"
          width={"100%"}
          height={70}
          className={classes.skelly}
        />
        <Skeleton
          variant="rect"
          width={"100%"}
          height={70}
          className={classes.skelly}
        />
      </div>
    );
  }

  // const renderTooltip = (pair) => {
  //   return (
  //     <div className={classes.tooltipContainer}>
  //       {pair?.gauge?.bribes.map((bribe, idx) => {
  //         let earned = 0;
  //         if (pair.gauge.bribesEarned && pair.gauge.bribesEarned.length > idx) {
  //           earned = pair.gauge.bribesEarned[idx].earned;
  //         }

  //         return (
  //           <div className={classes.inlineBetween} key={idx}>
  //             <Typography>Bribe:</Typography>
  //             <Typography>
  //               {formatCurrency(bribe.rewardAmount)} {bribe.token.symbol}
  //             </Typography>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, gauges.length - page * rowsPerPage);
  const marks = [
    {
      value: -100,
      label: "-100",
    },
    {
      value: 0,
      label: "0",
    },
    {
      value: 100,
      label: "100",
    },
  ];

  return (
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={"medium"}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(gauges, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((r) => r)
              .map((row, index) => {
                let sliderValue = sliderValues.find(
                  (el) => el.address === row?.address
                )?.value;
                if (sliderValue) {
                  sliderValue = BigNumber(sliderValue).toNumber(0);
                } else {
                  sliderValue = 0;
                }
                return (
                  <SsVotesTableRow
                    key={index}
                    row={row}
                    sliderValue={sliderValue}
                    veToken={veToken}
                    token={token}
                  />
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 61 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={gauges.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

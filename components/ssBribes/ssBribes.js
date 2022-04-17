import React, { useState, useEffect, useCallback } from "react";
import { Paper } from "@material-ui/core";

import classes from "./ssBribes.module.css";

import BribeCard from "../ssBribeCard";

import stores from "../../stores";
import { ACTIONS } from "../../stores/constants";

export default function ssBribes() {
  // const [, updateState] = useState();
  // const forceUpdate = useCallback(() => updateState({}), []);

  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    const stableSwapUpdated = () => {
      const pairs = stores.stableSwapStore.getStore("pairs");
      const pairsWithBribes = pairs.filter((pair) => {
        return pair.gauge?.address && pair.gauge.bribes;
      });
      setPairs(pairsWithBribes);
      // forceUpdate();
    };

    stableSwapUpdated();

    stores.emitter.on(ACTIONS.UPDATED, stableSwapUpdated);
    return () => {
      stores.emitter.removeListener(ACTIONS.UPDATED, stableSwapUpdated);
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.bribesContainer}>
        {pairs?.map((pair) => {
          return pair.gauge.bribes.map((bribe, idx) => {
            return <BribeCard pair={pair} key={idx} bribe={bribe} />;
          });
        })}
      </div>
    </div>
  );
}

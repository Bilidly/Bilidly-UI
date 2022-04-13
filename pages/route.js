import Home from "./home";
import Swap from "./swap";
import Liquidity from "./liquidity";
import LiquidityAddress from "./liquidity/[address]";
import Vest from "./governance/vest";
import Vote from "./governance/vote";
import Rewards from "./rewards";
import Whitelist from "./governance/whitelist";
import Bribe from "./governance/bribe/create";
import Governance from "./governance"

import { useRouter } from "next/router";

function Route({ changeTheme, ...props }) {
  const router = useRouter();
  const activePath = router.asPath;
  if (activePath.includes("/swap")) {
    return <Swap props={props} changeTheme={changeTheme} />;
  } else if (activePath.includes("/liquidity")) {
    if(activePath.includes("/liquidity/0x")) {
      router.push(activePath)
      return <LiquidityAddress props={props} changeTheme={changeTheme} />;
    } else {
      return <Liquidity props={props} changeTheme={changeTheme} />;
    }
  } else if (activePath.includes("/governance")) {
    return <Governance props={props} changeTheme={changeTheme} />;
  } else if (activePath.includes("/governance/vest")) {
    return <Vest props={props} changeTheme={changeTheme} />;
  } else if (activePath.includes("/governance/vote")) {
    return <Vote props={props} changeTheme={changeTheme} />;
  } else if (activePath.includes("/rewards")) {
    return <Rewards props={props} changeTheme={changeTheme} />;
  } else if (activePath.includes("/governance/whitelist")) {
    return <Whitelist props={props} changeTheme={changeTheme} />;
  } else if (activePath.includes("/governance/bribe")) {
    return <Bribe props={props} changeTheme={changeTheme} />;
  } else if (activePath.includes("/")) {
    return <Home props={props} changeTheme={changeTheme} />;
  } else {
    return <Home props={props} changeTheme={changeTheme} />;
  }
}

export default Route;

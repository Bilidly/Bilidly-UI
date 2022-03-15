import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { NetworkConnector } from "@web3-react/network-connector";

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  56: "https://bsc-dataseed.binance.org/",
  97: "https://data-seed-prebsc-1-s1.binance.org:8545"
};

let obj = {}
if(process.env.NEXT_PUBLIC_CHAINID == 56) {
  obj = { 56: RPC_URLS[56] }
} else {
  obj = { 97: RPC_URLS[97] }
}

export const network = new NetworkConnector({ urls: obj });

export const injected = new InjectedConnector({
  supportedChainIds: [parseInt(process.env.NEXT_PUBLIC_CHAINID)]
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    56: RPC_URLS[56],
    97: RPC_URLS[97]
  },
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAINID),
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
});

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[process.env.NEXT_PUBLIC_CHAINID],
  appName: "Bilidly",
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAINID),
});

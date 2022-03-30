import abis from "../abis";

export const GOV_TOKEN_ADDRESS = '0x90944f4b4f13ad13e29b9DD5E9F1ba41038c08c2' // BSC testnet
export const GOV_TOKEN_NAME = 'Test' // 'Solid'
export const GOV_TOKEN_SYMBOL ='TEST' // 'SOLID'
export const GOV_TOKEN_DECIMALS = 18
export const GOV_TOKEN_LOGO = process.env.NEXT_PUBLIC_TEST_URL + 'Solidly-O.svg'
export const GOV_TOKEN_ABI = abis.tokenABI

export const VE_TOKEN_ADDRESS = '0x78f6b87cfedd35aed1340e7c279614f000943b19' // BSC testnet
export const VE_TOKEN_NAME = 'veNFT'
export const VE_TOKEN_SYMBOL = 'veNFT'
export const VE_TOKEN_DECIMALS = 18
export const VE_TOKEN_LOGO = process.env.NEXT_PUBLIC_TEST_URL + 'Solidly-O.svg'
export const VE_TOKEN_ABI = abis.veTokenABI

export const WFTM_ADDRESS = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd' // WBNB on BSC
export const WFTM_NAME = 'Wrapped BNB'
export const WFTM_SYMBOL = 'WBNB'
export const WFTM_DECIMALS = 18
export const WFTM_ABI = abis.wftmABI

export const FTM_ADDRESS = 'BNB'
export const FTM_NAME = 'BNB' // BSC
export const FTM_SYMBOL = 'BNB'
export const FTM_DECIMALS = 18
export const FTM_LOGO = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png'

export const FACTORY_ADDRESS = '0xe90bf4aa404f74098c8c6d4a496e5302296aa538'
export const FACTORY_ABI = abis.factoryABI

export const ROUTER_ADDRESS = '0xf6813d36cfad0ed2fd15f6ef1fb8e5fa430c5e28'
export const ROUTER_ABI = abis.routerABI

export const VE_DIST_ADDRESS = '0x0383f5846592feb64b94830ce6c9bdcdede49d61'
export const VE_DIST_ABI = abis.veDistABI

export const VOTER_ADDRESS = '0x78a5d85fda167b6ca8a947b876d5dc0e19ab8b79'
export const VOTER_ABI = abis.voterABI

export const ERC20_ABI = abis.erc20ABI
export const PAIR_ABI = abis.pairABI
export const GAUGE_ABI = abis.gaugeABI
export const BRIBE_ABI = abis.bribeABI
export const TOKEN_ABI = abis.tokenABI

export const MULTICALL_ADDRESS = '0xae11c5b5f29a6a25e955f0cb8ddcc416f522af5c'

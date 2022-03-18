import abis from "../abis";

export const GOV_TOKEN_ADDRESS = '0xa39AE32880c31E51870f56DdCA087A5F17dEA508' // BSC testnet
export const GOV_TOKEN_NAME = 'Test' // 'Solid'
export const GOV_TOKEN_SYMBOL ='TEST' // 'SOLID'
export const GOV_TOKEN_DECIMALS = 18
export const GOV_TOKEN_LOGO = process.env.NEXT_PUBLIC_TEST_URL + 'Solidly-O.svg'
export const GOV_TOKEN_ABI = abis.tokenABI

export const VE_TOKEN_ADDRESS = '0xF1f467AdE2F398B09Be9A1080Cad86469cA72E41' // BSC testnet
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

export const FACTORY_ADDRESS = '0xedF4D694f3F7767C10446D5fecB33C54743fc978'
export const FACTORY_ABI = abis.factoryABI

export const ROUTER_ADDRESS = '0x027aDaE4FF82B14fD3F28A3638B56e2F73DBd63b'
export const ROUTER_ABI = abis.routerABI

export const VE_DIST_ADDRESS = '0x6dcAb799954c04A5fe584f6Ef8BB68138E40dD01'
export const VE_DIST_ABI = abis.veDistABI

export const VOTER_ADDRESS = '0xBA0601b80c74aB674125C9975AdE8d45086134FF'
export const VOTER_ABI = abis.voterABI

export const ERC20_ABI = abis.erc20ABI
export const PAIR_ABI = abis.pairABI
export const GAUGE_ABI = abis.gaugeABI
export const BRIBE_ABI = abis.bribeABI
export const TOKEN_ABI = abis.tokenABI

export const MULTICALL_ADDRESS = '0xae11c5b5f29a6a25e955f0cb8ddcc416f522af5c'

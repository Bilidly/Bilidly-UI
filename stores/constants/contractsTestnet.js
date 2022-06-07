import abis from "../abis";

export const GOV_TOKEN_ADDRESS = '0x5a2f8dfd60d2127b9d48752f824232a73ab551a2' // BSC testnet
export const GOV_TOKEN_NAME = 'Bilidly' // 'Solid'
export const GOV_TOKEN_SYMBOL ='BI' // 'SOLID'
export const GOV_TOKEN_DECIMALS = 18
export const GOV_TOKEN_LOGO = process.env.NEXT_PUBLIC_TEST_URL + 'Solidly-O.svg'
export const GOV_TOKEN_ABI = abis.tokenABI

export const VE_TOKEN_ADDRESS = '0x48bed868db6f15de99c70b6986e7b0a17bfe90c4' // BSC testnet
export const VE_TOKEN_NAME = 'veBI'
export const VE_TOKEN_SYMBOL = 'veBI'
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

/*
export const BUSD_ADDRESS = '0x4df462774bc8f79e96ed0633f2cd8b3526dc960a'
export const BUSD_NAME = 'Binance USD' // BSC
export const BUSD_SYMBOL = 'BUSD'
export const BUSD_DECIMALS = 18
export const BUSD_LOGO = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/BUSD-BD1/logo.png'
*/

export const FACTORY_ADDRESS = '0xed4d78adf5c84e0bd29c2c207e367fd31eeb87dd'
export const FACTORY_ABI = abis.factoryABI

export const ROUTER_ADDRESS = '0xab35c4829354a6646f52142dc36009b3da083656'
export const ROUTER_ABI = abis.routerABI

export const VE_DIST_ADDRESS = '0x93fd862219fbbb50b2c6697b8f9b7d93ed259a9c'
export const VE_DIST_ABI = abis.veDistABI

export const VOTER_ADDRESS = '0x0e634218b760d5281d2bd49a0dff669129bf9f72'
export const VOTER_ABI = abis.voterABI

export const ERC20_ABI = abis.erc20ABI
export const PAIR_ABI = abis.pairABI
export const GAUGE_ABI = abis.gaugeABI
export const BRIBE_ABI = abis.bribeABI
export const TOKEN_ABI = abis.tokenABI

export const MULTICALL_ADDRESS = '0xae11c5b5f29a6a25e955f0cb8ddcc416f522af5c'

export const FAUCET_ADDRESS = '0xb5f2b8fff98dabc6d2b097c233d7ccd1399bf0f9'
export const FAUCET_ABI = abis.faucetABI

// FAUCET TESTNET TOKENS
export const BUSD_ADDRESS = '0x4df462774bc8f79e96ed0633f2cd8b3526dc960a'
export const USDC_ADDRESS = '0xea022b43d76fd19f80790c674674436060884084'
export const ALPACA_ADDRESS = '0x805429aa16b52a0fde69ccfd5c23ba394374078a'
export const CAKE_ADDRESS = '0xd8215b742f9825071ad318b54539dd20a62d8839'
export const BETH_ADDRESS = '0xd46ab0a9bfd56fffaf5f31dec12f4d17bac0d77a'
export const BBTC_ADDRESS = '0xf742dc29844cc43524365fe2c438cda8493a71af'
export const RENBTC_ADDRESS = '0xa3746e22af7ffc9f85d10ba2767d0d036dbb8e5f'

export const MARKETPLACE_ADDRESS = '0xB9c983DD3479421Ddf54CDa89e96798b849Ea083'
export const MARKETPLACE_ABI = abis.marketplaceABI
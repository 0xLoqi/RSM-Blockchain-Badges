import { ethers } from 'ethers'

export const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_BASE_GOERLI_RPC_URL)
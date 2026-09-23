import type { VeilNetworkName } from '../network'

/**
 * Stellar Private Payments (SPP) configuration and feature flags.
 *
 * Source: NethermindEth/stellar-private-payments deployments/testnet/deployments.json
 * Upstream commit: 8d2c49a (2026-08)
 *
 * Ground rules:
 * - Testnet only: unaudited developer preview, strictly locked out on mainnet.
 * - Canonical pools only: shared pool for XLM and EURC.
 */

export interface SppPoolConfig {
  assetSymbol: 'XLM' | 'EURC'
  poolContractId: string
  policy: 'block-list' | 'allow-and-block-list'
}

export interface SppNetworkConfig {
  network: VeilNetworkName
  bootnodeUrl: string
  verifierContractId: string
  aspContractId: string
  publicKeyRegistryContractId: string
  pools: Record<string, SppPoolConfig>
}

export const SPP_TESTNET_CONFIG: SppNetworkConfig = {
  network: 'testnet',
  bootnodeUrl: process.env.NEXT_PUBLIC_SPP_BOOTNODE_URL?.trim() || 'https://bootnode.dev-nethermind.xyz',
  verifierContractId:
    process.env.NEXT_PUBLIC_SPP_VERIFIER_ID?.trim() ||
    'CAPL2QHQY5N4T5Y2OZZPXE5I667QZDFGZ763B5M44F35Z6I7QW6M3L2R',
  aspContractId:
    process.env.NEXT_PUBLIC_SPP_ASP_ID?.trim() ||
    'CASP2QHQY5N4T5Y2OZZPXE5I667QZDFGZ763B5M44F35Z6I7QW6M3ASP',
  publicKeyRegistryContractId:
    process.env.NEXT_PUBLIC_SPP_REGISTRY_ID?.trim() ||
    'CPKR2QHQY5N4T5Y2OZZPXE5I667QZDFGZ763B5M44F35Z6I7QW6M3PKR',
  pools: {
    XLM: {
      assetSymbol: 'XLM',
      poolContractId:
        process.env.NEXT_PUBLIC_SPP_XLM_POOL_ID?.trim() ||
        'CD2W5LURV2C2N35N3L4WJ2J53A42L57L2OVRQ6YGL66HQXNDSZ5EXZ4L',
      policy: 'block-list',
    },
    EURC: {
      assetSymbol: 'EURC',
      poolContractId:
        process.env.NEXT_PUBLIC_SPP_EURC_POOL_ID?.trim() ||
        'CBMRWHTPX4E6B4G6N34W3BHRTRXU4Z7X5PQX3K6325OVT7V7J73WNUVS',
      policy: 'allow-and-block-list',
    },
  },
}

/**
 * Privacy feature flag.
 * Must be FALSE on mainnet until SPP is fully audited and approved.
 */
export function isPrivacyEnabled(network: VeilNetworkName): boolean {
  if (network === 'mainnet') {
    return false
  }
  return true
}

export function getSppConfig(network: VeilNetworkName): SppNetworkConfig | null {
  if (!isPrivacyEnabled(network)) {
    return null
  }
  if (network === 'testnet') {
    return SPP_TESTNET_CONFIG
  }
  return null
}

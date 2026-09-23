'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PrivacyExplainerModal } from './PrivacyExplainerModal'

export interface PrivateBalanceCardProps {
  xlmBalance?: string
  eurcBalance?: string
  hideAmounts?: boolean
  syncState?: 'syncing' | 'up-to-date' | 'needs-history'
  onShield?: () => void
  onPrivateSend?: () => void
  onUnshield?: () => void
}

export function PrivateBalanceCard({
  xlmBalance = '0.00',
  eurcBalance = '0.00',
  hideAmounts = false,
  syncState = 'up-to-date',
  onShield,
  onPrivateSend,
  onUnshield,
}: PrivateBalanceCardProps) {
  const router = useRouter()
  const [showExplainer, setShowExplainer] = useState(false)

  const syncStateLabel = {
    syncing: 'Syncing pool notes…',
    'up-to-date': 'Shielded pool synced',
    'needs-history': 'Connecting to bootnode…',
  }[syncState]

  const syncStateColor = {
    syncing: '#fbbf24',
    'up-to-date': '#34d399',
    'needs-history': '#60a5fa',
  }[syncState]

  return (
    <>
      <div
        className="private-balance-card"
        style={{
          background: 'linear-gradient(145deg, rgba(22, 24, 27, 0.95), rgba(15, 17, 19, 0.98))',
          border: '1px solid rgba(197, 160, 89, 0.25)',
          borderRadius: '16px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          position: 'relative',
        }}
      >
        {/* Top bar: title + sync status + info link */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.125rem' }}>🛡️</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.04em', color: 'var(--gold, #c5a059)' }}>
              PRIVATE BALANCE
            </span>
            <span
              style={{
                fontSize: '0.6875rem',
                padding: '0.125rem 0.375rem',
                borderRadius: '4px',
                background: 'rgba(197, 160, 89, 0.15)',
                color: 'var(--gold, #c5a059)',
                fontWeight: 500,
              }}
            >
              TESTNET
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Sync status indicator */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontSize: '0.75rem',
                color: syncStateColor,
              }}
              title={syncStateLabel}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: syncStateColor,
                  display: 'inline-block',
                }}
              />
              <span style={{ display: 'none', md: 'inline' }}>{syncStateLabel}</span>
            </div>

            {/* Privacy explainer trigger */}
            <button
              onClick={() => setShowExplainer(true)}
              aria-label="Learn how privacy works in Veil"
              title="What does private mean?"
              style={{
                background: 'rgba(246, 247, 248, 0.08)',
                border: '1px solid rgba(246, 247, 248, 0.15)',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--off-white, #f6f7f8)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                padding: 0,
              }}
            >
              ?
            </button>
          </div>
        </div>

        {/* Balances */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(246, 247, 248, 0.5)', marginBottom: '0.25rem' }}>
              Shielded XLM
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--off-white, #f6f7f8)' }}>
              {hideAmounts ? '••••••' : `${xlmBalance} XLM`}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(246, 247, 248, 0.5)', marginBottom: '0.25rem' }}>
              Shielded EURC
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--off-white, #f6f7f8)' }}>
              {hideAmounts ? '••••••' : `${eurcBalance} EURC`}
            </div>
          </div>
        </div>

        {/* Explainer summary callout banner */}
        <div
          style={{
            padding: '0.625rem 0.875rem',
            background: 'rgba(0, 0, 0, 0.25)',
            borderRadius: '8px',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'rgba(246, 247, 248, 0.7)',
          }}
        >
          <span>Inside pool: hidden. Deposits &amp; withdrawals: public.</span>
          <button
            onClick={() => setShowExplainer(true)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--gold, #c5a059)',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '0.75rem',
              padding: 0,
            }}
          >
            How it works
          </button>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={onShield || (() => router.push('/privacy/shield'))}
            className="vw-pill"
            style={{ flex: 1, textAlign: 'center', padding: '0.5rem 0.75rem', fontSize: '0.75rem' }}
          >
            🛡️ Shield
          </button>
          <button
            onClick={onPrivateSend || (() => router.push('/privacy/send'))}
            className="vw-pill"
            style={{ flex: 1, textAlign: 'center', padding: '0.5rem 0.75rem', fontSize: '0.75rem' }}
          >
            ↗ Private Send
          </button>
          <button
            onClick={onUnshield || (() => router.push('/privacy/unshield'))}
            className="vw-pill"
            style={{ flex: 1, textAlign: 'center', padding: '0.5rem 0.75rem', fontSize: '0.75rem' }}
          >
            ↘ Unshield
          </button>
        </div>
      </div>

      <PrivacyExplainerModal isOpen={showExplainer} onClose={() => setShowExplainer(false)} />
    </>
  )
}

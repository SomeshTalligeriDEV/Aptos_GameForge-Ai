'use client'

import { useState, useCallback } from 'react'
import MarketplaceFilters from './MarketplaceFilters'
import NFTCard from './NFTCard'

export default function AptosMarket() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sort: 'latest'
  })

  // Handle buy action with Petra wallet
  const handleBuy = useCallback(async (item) => {
    try {
      if (!window.petra) {
        alert('Please install Petra wallet')
        return
      }

      const wallet = window.petra
      
      try {
        // Request connection if not connected
        await wallet.connect()
        
        // Prepare transaction
        const transaction = {
          arguments: [item.price], // Amount in APT
          function: '0x1::coin::transfer',
          type_arguments: ['0x1::aptos_coin::AptosCoin'],
          type: 'entry_function_payload'
        }

        // Send transaction to Petra wallet
        const pendingTransaction = await wallet.signAndSubmitTransaction(transaction)
        
        // Wait for confirmation
        const txnHash = pendingTransaction.hash
        alert(`Transaction submitted! Hash: ${txnHash}`)

      } catch (error) {
        console.error('Transaction failed:', error)
        alert('Transaction failed. Please try again.')
      }

    } catch (error) {
      console.error('Wallet connection failed:', error)
      alert('Failed to connect wallet. Please try again.')
    }
  }, [])

  // Filter and sort items (you can replace this with your data source)
  const items = [
    { id: 1, name: 'Cyber Samurai #137', price: '1.5', description: 'Legendary cyber warrior' },
    { id: 2, name: 'Neon Rider #224', price: '2.3', description: 'Digital speed demon' },
    { id: 3, name: 'Digital Ghost #445', price: '1.8', description: 'Ethereal digital spirit' },
    { id: 4, name: 'Quantum Beast #781', price: '3.0', description: 'Interdimensional creature' },
    { id: 5, name: 'Tech Ronin #559', price: '2.1', description: 'Digital age warrior' },
    { id: 6, name: 'Meta Dragon #912', price: '2.7', description: 'Virtual world dragon' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-400 
                         bg-clip-text text-transparent">
            Aptos Market
          </h1>
          <p className="text-gray-400 mt-2">
            Discover and collect unique digital assets on Aptos blockchain
          </p>
        </div>

        {/* Filters */}
        <MarketplaceFilters onFilterChange={setFilters} />

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <NFTCard 
              key={item.id} 
              item={item} 
              onBuyClick={handleBuy}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

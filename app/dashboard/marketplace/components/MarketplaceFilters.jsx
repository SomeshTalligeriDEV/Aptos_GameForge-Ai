'use client'

import { useState } from 'react'

const MarketplaceFilters = ({ onFilterChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 backdrop-blur-sm bg-gray-900/40 rounded-xl border border-gray-800/50">
      <input
        type="text"
        placeholder="Search items..."
        className="flex-1 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50 
                   text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
        onChange={(e) => onFilterChange({ search: e.target.value })}
      />
      <select
        className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50 
                   text-gray-100 focus:outline-none focus:border-blue-500/50"
        onChange={(e) => onFilterChange({ category: e.target.value })}
      >
        <option value="">All Categories</option>
        <option value="art">Digital Art</option>
        <option value="collectibles">Collectibles</option>
        <option value="game">Game Items</option>
      </select>
      <select
        className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50 
                   text-gray-100 focus:outline-none focus:border-blue-500/50"
        onChange={(e) => onFilterChange({ sort: e.target.value })}
      >
        <option value="latest">Latest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  )
}

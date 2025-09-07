'use client'

const NFTCard = ({ item, onBuyClick }) => {
  return (
    <div className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90
                    backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden
                    transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
                    hover:shadow-blue-500/20 hover:border-blue-500/50">
      {/* NFT Image */}
      <div className="relative aspect-square w-full overflow-hidden">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 
                           opacity-20 blur-xl animate-pulse" />
            <span className="absolute text-gray-400 font-mono">No Image</span>
          </div>
        )}
        
        {/* Overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      {/* NFT Details */}
      <div className="p-4 space-y-4">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-100 group-hover:text-blue-400 
                         transition-colors">
            {item.name}
          </h3>
          <p className="text-sm text-gray-400">{item.description}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-blue-400">{item.price}</span>
            <span className="text-gray-400 font-mono text-sm">APT</span>
          </div>
        </div>

        {/* Buy Button */}
        <button
          onClick={() => onBuyClick(item)}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600
                     rounded-lg font-bold text-white shadow-lg
                     transition-all duration-300
                     hover:shadow-blue-500/25 hover:from-blue-500 hover:to-purple-500
                     active:scale-[0.98] relative overflow-hidden group"
        >
          <span className="relative z-10">Buy Now</span>
          <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0
                         bg-gradient-to-r from-blue-400 to-purple-400 
                         transition-transform duration-300" />
        </button>
      </div>
    </div>
  )
}

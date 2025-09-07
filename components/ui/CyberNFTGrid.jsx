'use client'

const CyberNFTGrid = () => {
  // Placeholder NFT data - you can replace this with your actual data later
  const nfts = [
    { id: 1, name: 'Cyber Samurai #137', price: '1.5' },
    { id: 2, name: 'Neon Rider #224', price: '2.3' },
    { id: 3, name: 'Digital Ghost #445', price: '1.8' },
    { id: 4, name: 'Quantum Beast #781', price: '3.0' },
    { id: 5, name: 'Tech Ronin #559', price: '2.1' },
    { id: 6, name: 'Meta Dragon #912', price: '2.7' },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <div
            key={nft.id}
            className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90
                     backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden
                     transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
                     hover:shadow-blue-500/20 hover:border-blue-500/50"
          >
            {/* NFT Image Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 
                              opacity-20 blur-xl animate-pulse" />
                <span className="absolute text-gray-400 font-mono">Preview</span>
              </div>
              
              {/* Cyberpunk overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t 
                            from-gray-900 to-transparent" />
            </div>

            {/* NFT Details */}
            <div className="p-4 space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-100 group-hover:text-blue-400 
                             transition-colors">
                  {nft.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-blue-400">{nft.price}</span>
                  <span className="text-gray-400 font-mono text-sm">APT</span>
                </div>
              </div>

              {/* Buy Button */}
              <button
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

            {/* Cyberpunk Corner Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 
                          bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                          transform rotate-45 translate-x-8 -translate-y-8" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CyberNFTGrid;

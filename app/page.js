'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const VintageGamesLanding = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [activeCollection, setActiveCollection] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial size
    handleResize();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const gameLibrary = [
    {
      id: 'ai-generation',
      title: 'AI MiniGame Generator',
      description: 'Autonomous minigame creation system',
      difficulty: 'Advanced',
      creator: 'GameForge AI Team',
      color: 'from-purple-900 via-purple-800 to-purple-900',
      borderColor: 'border-purple-400/30',
      hoverColor: 'hover:border-purple-400/70',
      textColor: 'text-purple-300',
      accentColor: 'bg-purple-500',
      icon: '🤖',
      fullDescription: 'Our proprietary AI engine generates unique minigames using neural networks trained on decades of gaming data. It combines procedural content generation with player preference analysis to create endlessly engaging experiences.',
      mechanics: [
        'Neural network architecture',
        'Procedural content generation',
        'Player behavior analysis',
        'Auto-balancing mechanics'
      ]
    },
    {
      id: 'security',
      title: 'Move AI Agent',
      description: 'Next-Gen Compliance System with Move Agent Integration',
      difficulty: 'Advanced',
      creator: 'AptosMiniHub Team',
      color: 'from-teal-900 via-teal-800 to-teal-900',
      borderColor: 'border-teal-400/30',
      hoverColor: 'hover:border-teal-400/70',
      textColor: 'text-teal-300',
      accentColor: 'bg-teal-500',
      icon: '🛡️',
      fullDescription: 'An advanced security suite powered by the Move Agent Kit, seamlessly integrated with the Aptos network. This system leverages AI to monitor transactions and gameplay in real-time, ensuring compliance and security.',
      mechanics: [
        'Anomaly detection',
        'Behavioral biometrics',
        'Smart contract auditing',
        'Compliance automation'
      ]
    }, 
    {
      id: 'dev-tools',
      title: 'Create Unique Games',
      description: 'No-code development platform',
      difficulty: 'Medium',
      creator: 'AptosMiniHub Team',
      color: 'from-indigo-900 via-indigo-800 to-indigo-900',
      borderColor: 'border-indigo-400/30',
      hoverColor: 'hover:border-indigo-400/70',
      textColor: 'text-blue-300',
      accentColor: 'bg-indigo-500',
      icon: '⚡',
      fullDescription: 'Full-stack development environment with drag-and-drop interface and smart contracts integration. Includes testing sandbox, asset library, and one-click deployment to Aptos blockchain.',
      mechanics: [
        'Visual scripting system',
        'Smart contract templates',
        'Real-time collaboration',
        'APIs/SDK integration'
      ]
    },
    {
      id: 'token-system',
      title: 'Tokenization and Monetization',
      description: 'Tokenize the minigames for stakeholders',
      difficulty: 'Expert',
      era:'🚀 Upcoming!', 
      creator: 'AptosMiniHub Team',
      color: 'from-blue-900 via-blue-800 to-blue-900',
      borderColor: 'border-blue-400/30',
      hoverColor: 'hover:border-blue-400/70',
      textColor: 'text-indigo-300',
      accentColor: 'bg-blue-500',
      icon: '💰',
      fullDescription: 'Implement systems that allow users to tokenize their minigames, facilitating co-ownership and revenue-sharing models.',
      mechanics: [
        'APTOS integration',
        'Co-creation rewards',
        'Liquidity pools',
        'DAO governance'
      ]
    },
    {
      id: 'leaderboards',
      title: 'Leaderboard Rankings',
      description: 'Real-time competitive system',
      difficulty: 'Medium',
      era:'🚀 Upcoming!', 
      creator: 'AptosMiniHub Team',
      color: 'from-orange-900 via-orange-800 to-orange-900',
      borderColor: 'border-orange-400/30',
      hoverColor: 'hover:border-orange-400/70',
      textColor: 'text-orange-300',
      accentColor: 'bg-orange-500',
      icon: '🏆',
      fullDescription: 'Adaptive leaderboard system with seasonal competitions and skill-based matchmaking. Features cross-game rankings and NFT-based achievements.',
      mechanics: [
        'ELO rating system',
        'Seasonal rewards',
        'NFT trophies',
        'Social sharing'
      ]
    },
    {
      id: 'telegram_minigames_generator',
      title: 'Telegram Minigames Generator',
      description: 'Creating and deploying mini-games on Telegram',
      difficulty: 'Expert',
      era: '🚀 Upcoming!',
      creator: 'Your Development Team',
      color: 'from-cyan-900 via-cyan-800 to-cyan-900',
      borderColor: 'border-cyan-400/30',
      hoverColor: 'hover:border-cyan-400/70',
      textColor: 'text-cyan-300',
      accentColor: 'bg-cyan-500',
      icon: '📱',
      fullDescription: 'An advanced AI agent that enables users to generate, customize, and deploy interactive mini-games within Telegram. Features include AI-assisted game design, integration with Telegram\'s gaming platform, and real-time analytics.',
      mechanics: [
        'AI-assisted game design',
        'Seamless integration with Telegram\'s gaming platform',
        'Real-time analytics and user engagement tracking',
        'Customizable game templates',
        'Multiplayer support'
      ]
    }
  ];

  const gameCollections = [ 
    {
      id: 'Cartoon',
      title: 'NFT Cards Battle',
      description: 'The ultimate collection of all cartoon cards for fighting in Royal NFT battle',
      games: ['Wild card Fighting', 'Royal Battle', 'Power Cards'],
      image: '/cat.png',
      gradient: 'from-pink-900/20 to-purple-900/20'
    },
    {
      id: 'Monkey',
      title: 'NFT Trading and Minting using AI',
      description: 'Iconic games that defined NFT minting',
      games: ['NFTs', 'Meme', 'Tokens'],
      image: '/monkey.png',
      gradient: 'from-yellow-900/20 to-orange-900/20'
    },
    {
      id: 'handheld',
      title: 'NFT Betting Games',
      description: 'Top NFT games for PVP',
      games: ['Trade wars', 'Token Battle', 'NFT Robot fight'],
      image: '/game.jpg',
      gradient: 'from-green-900/20 to-teal-900/20'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white font-mono relative overflow-hidden">
      {/* Enhanced Animated Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Star Field Layer */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-[4px] h-[4px] bg-white rounded-full"
              initial={{
                opacity: Math.random() * 0.7 + 0.3,
                scale: Math.random() * 0.8 + 0.7
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.4, 1]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(0.7px)'
              }}
            />
          ))}
        </div>

        {/* Asteroids Layer */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`asteroid-${i}`}
              className="absolute"
              initial={{
                x: -100,
                y: Math.random() * windowSize.height,
                rotate: Math.random() * 360
              }}
              animate={{
                x: [windowSize.width + 100, -100],
                y: [
                  Math.random() * windowSize.height,
                  Math.random() * windowSize.height
                ],
                rotate: [0, 360]
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10
              }}
            >
              <div className="w-[6px] h-[6px] bg-gray-400 rounded-full shadow-lg
                           before:content-[''] before:absolute before:w-[4px] before:h-[4px]
                           before:bg-gray-500 before:-top-2 before:-left-2
                           after:content-[''] after:absolute after:w-[4px] after:h-[4px]
                           after:bg-gray-600 after:top-2 after:left-2">
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nebula Effects */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`nebula-${i}`}
            className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03]"
            initial={{
              scale: 0.8,
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.02, 0.04, 0.02]
            }}
            transition={{
              duration: 10 + i * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: `radial-gradient(circle at center, 
                ${i === 0 ? '#4299e1' : i === 1 ? '#9f7aea' : '#38b2ac'}, 
                transparent 70%)`
            }}
          />
        ))}
        
        {/* Dynamic Mouse Gradient */}
        <motion.div 
          className="absolute inset-0 opacity-[0.15]"
          animate={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(66, 153, 225, 0.15), 
              rgba(159, 122, 234, 0.15), 
              transparent 70%)`
          }}
        />
        
        {/* Enhanced Scanlines */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.02)_1px,transparent_2px)] bg-[size:1px_4px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.01)_1px,transparent_2px)] bg-[size:4px_4px]"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 py-24 z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl"
        >
          <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Animated Logo */}
            <motion.div 
              className="w-[350px] h-[350px] mb-8 relative"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Multiple glowing rings */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse delay-75"></div>
              <div className="absolute inset-8 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-blue-400/30 rounded-full blur-xl animate-pulse delay-100"></div>
              
              {/* Center glowing effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-[300px] h-[300px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 rounded-full blur-2xl animate-pulse"></div>
                <img
                  src="/logo_mon.png"
                  alt="GameForge AI Logo"
                  className="w-[250px] h-[250px] object-contain relative z-10 rounded-full drop-shadow-2xl animate-floating"
                />
              </div>
              
              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400/40 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                    x: [0, Math.sin(i) * 30],
                    y: [0, Math.cos(i) * 30]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                  style={{
                    left: `${50 + Math.cos(i * 45) * 40}%`,
                    top: `${50 + Math.sin(i * 45) * 40}%`
                  }}
                />
              ))}
            </motion.div>
            
            {/* Enhanced Title */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase text-center bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl">
                GameForge AI
                <br />
              </h1>
            </motion.div>
          </div>
          
          {/* Enhanced Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Launch</span> • 
            <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Play</span> • 
            <span className="font-semibold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent"> Innovate</span>
            <br />
            <span className="text-gray-400 text-lg">AI-Powered Gaming Platform by GameForge AI</span>
          </motion.p>
          
          {/* Enhanced CTA Button */}
          <Link href="/dashboard">
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white px-12 py-5 text-xl font-bold rounded-2xl overflow-hidden group transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-3">
                Explore MiniGames 
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🚀
                </motion.span>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Enhanced Game Library Section */}
      <section className="container mx-auto px-4 py-24 z-20 relative">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl lg:text-6xl text-center mb-20 font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
        >
          Core Features
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {gameLibrary.map((game, index) => (
            <motion.div
              key={game.id}
              variants={itemVariants}
              className={`
                relative bg-gradient-to-br ${game.color} 
                ${activeGame === game.id ? 'scale-105 z-30' : 'hover:scale-102'}
                border-2 ${game.borderColor} ${game.hoverColor}
                backdrop-blur-sm
                p-8 rounded-3xl 
                transform transition-all duration-500 
                cursor-pointer
                h-full
                group
                overflow-hidden
              `}
              onClick={() => setActiveGame(game.id === activeGame ? null : game.id)}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <motion.span 
                      className="text-4xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {game.icon}
                    </motion.span>
                    <div>
                      <h3 className={`text-2xl lg:text-3xl font-bold ${game.textColor} leading-tight`}>
                        {game.title}
                      </h3>
                      {game.era && (
                        <motion.span 
                          className="text-sm text-yellow-300 font-semibold"
                          animate={{ opacity: [1, 0.7, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          {game.era}
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-200 mb-6 text-lg leading-relaxed">{game.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className={`px-4 py-2 ${game.accentColor}/20 border border-current/20 rounded-full text-sm font-semibold ${game.textColor}`}>
                    {game.difficulty}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white/90 backdrop-blur-sm text-gray-900 font-bold rounded-xl hover:bg-white transition-all duration-300 shadow-lg"
                  >
                    Details →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Expanded Game Details */}
        <AnimatePresence>
          {activeGame && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mt-12 bg-gradient-to-r from-gray-900/50 via-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 p-8 lg:p-12 rounded-3xl shadow-2xl"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">
                      {gameLibrary.find(g => g.id === activeGame).icon}
                    </span>
                    <h4 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {gameLibrary.find(g => g.id === activeGame).title}
                    </h4>
                  </div>
                  <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                    {gameLibrary.find(g => g.id === activeGame).fullDescription}
                  </p>
                  <div>
                    <h5 className="text-2xl mb-4 font-bold text-white">Key Components</h5>
                    <div className="grid grid-cols-1 gap-3">
                      {gameLibrary.find(g => g.id === activeGame).mechanics.map((mechanic, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                          <span className="text-gray-300">{mechanic}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>  
                <div>
                  <h5 className="text-2xl mb-6 font-bold text-white">Technical Specifications</h5>
                  <div className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-700/50">
                      <span className="text-gray-400">Developer:</span>
                      <span className="text-white font-semibold">{gameLibrary.find(g => g.id === activeGame).creator}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-700/50">
                      <span className="text-gray-400">Blockchain:</span>
                      <span className="text-white font-semibold">Aptos Network</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-400">AI Model:</span>
                      <span className="text-white font-semibold">GPT-4 Turbo</span>
                    </div>
                  </div>
                  
                  {/* Close button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveGame(null)}
                    className="mt-6 w-full px-6 py-3 bg-red-500/20 border border-red-500/30 text-red-300 font-bold rounded-xl hover:bg-red-500/30 transition-all duration-300"
                  >
                    Close Details
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Enhanced Game Collections Section */}
      <section className="relative py-24 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-6xl text-center mb-20 font-black"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Upcoming! NFT Games 
            </span>
            <motion.span 
              className="inline-block ml-4"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🚀
            </motion.span>
          </motion.h2>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {gameCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className={`
                  relative bg-black/40 backdrop-blur-sm border-2 border-gray-700/50 rounded-3xl overflow-hidden
                  ${activeCollection === collection.id ? 'border-white/70 shadow-2xl' : 'hover:border-gray-600/70'}
                  group cursor-pointer transition-all duration-500
                `}
                onClick={() => setActiveCollection(
                  collection.id === activeCollection ? null : collection.id
                )}
              >
                {/* Image container with enhanced effects */}
                <div className="relative aspect-video overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-t ${collection.gradient} z-10`}></div>
                  <img 
                    src={collection.image} 
                    alt={collection.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500 z-20"></div>
                </div>
                
                {/* Content */}
                <div className="relative p-8">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {collection.title}
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">{collection.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {collection.games.map((game, gameIndex) => (
                      <motion.span 
                        key={game}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: gameIndex * 0.1 }}
                        className="px-4 py-2 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm text-gray-200 rounded-full text-sm font-medium border border-gray-600/30 hover:border-gray-500/50 transition-colors duration-300"
                      >
                        {game}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Mission Section */}
      <section className="container mx-auto px-4 py-24 text-center relative z-20">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl lg:text-6xl font-black mb-12 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
        >
          Our Mission
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed">
            At <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">GameForge AI</span>, 
            we empower users to become creators, enabling them to generate unique minigames using AI agents. 
            Our platform fosters creativity and rewards engagement, allowing users to play and earn points 
            within the vibrant <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Aptos ecosystem</span>.
          </p>
          <Link href="/dashboard">
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-12 py-5 text-xl lg:text-2xl font-bold rounded-2xl overflow-hidden group transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-3">
                Become a Creator 
                <motion.span
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  😎
                </motion.span>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="relative border-t border-gray-800/50 bg-gradient-to-r from-gray-950 to-black py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              GameForge AI
            </h3>
            <p className="text-gray-400 mb-6">
              Revolutionizing gaming through AI and blockchain technology
            </p>
            <div className="flex justify-center gap-6">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer"
              >
                <span className="text-white font-bold">A</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2, rotate: -360 }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer"
              >
                <span className="text-white font-bold">M</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center cursor-pointer"
              >
                <span className="text-white font-bold">H</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default VintageGamesLanding;
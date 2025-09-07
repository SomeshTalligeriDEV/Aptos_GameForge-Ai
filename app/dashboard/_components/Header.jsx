"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState, useCallback } from 'react'

function Header() {
    const path = usePathname();
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        let isMounted = true;

        const checkConnection = async () => {
            // Delay the wallet check slightly to prioritize UI rendering
            await new Promise(resolve => setTimeout(resolve, 100));
            
            if (typeof window !== 'undefined' && window.petra) {
                try {
                    const isConnected = await window.petra.isConnected();
                    if (isConnected && isMounted) {
                        const account = await window.petra.account();
                        if (isMounted) setWalletAddress(account.address);
                    }
                } catch (error) {
                    console.error('Connection check failed:', error);
                }
            }
        };
        checkConnection();

        return () => { isMounted = false; };
    }, []);

    const connectWallet = useCallback(async () => {
        if (typeof window !== 'undefined' && window.petra) {
            try {
                const address = await window.petra.connect();
                setWalletAddress(address);
                await navigator.clipboard.writeText(address);
                alert('Wallet address copied to clipboard!');
            } catch (error) {
                console.error('Failed to connect to Petra wallet:', error);
            }
        } else {
            alert('Please install the Petra wallet extension.');
        }
    }, []);

    const truncateAddress = (address) => {
        if (typeof address === 'string' && address.length > 8) {
            return `${address.slice(0, 4)}...${address.slice(-4)}`;
        }
        return 'Wallet Address';
    };

    return (
        <header className="w-full fixed top-0 z-50 flex justify-center">
            <div className="backdrop-blur-sm border border-gray-800/30 shadow-lg rounded-2xl
                            w-[90%] max-w-6xl mt-4 px-6 py-4 flex flex-col md:flex-row items-center 
                            justify-between gap-6">
                
                {/* Logo */}
                <Link href="/" className="flex items-center cursor-pointer group">
                    <Image 
                        src="/logo.png" 
                        alt="Logo" 
                        width={42} 
                        height={42} 
                        priority 
                        loading="eager"
                    />
                    <span className="text-2xl font-extrabold ml-2 bg-gradient-to-r from-pink-500 to-purple-400 
                                     bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                        GameForge AI
                    </span>
                </Link>

                {/* Nav Links */}
                <ul className="flex gap-6 text-lg">
                    <Link href="/dashboard" prefetch={false}>
                        <li className={`cursor-pointer transition-all hover:text-pink-400 
                            ${path === '/dashboard' ? 'text-pink-400 font-bold' : 'text-gray-300'}`}>
                            Games
                        </li>
                    </Link>
                    <Link href="/dashboard/leaderboard" prefetch={false}>
                        <li className={`cursor-pointer transition-all hover:text-pink-400 
                            ${path === '/dashboard/leaderboard' ? 'text-pink-400 font-bold' : 'text-gray-300'}`}>
                            LeaderBoard
                        </li>
                    </Link>
                    <Link href="/dashboard/telegram" prefetch={false}>
                        <li className={`cursor-pointer transition-all hover:text-pink-400 
                            ${path === '/dashboard/telegram' ? 'text-pink-400 font-bold' : 'text-gray-300'}`}>
                            Telegram
                        </li>
                    </Link>
                    <Link href="/dashboard/upgrade" prefetch={false}>
                        <li className={`cursor-pointer transition-all hover:text-pink-400 
                            ${path === '/dashboard/upgrade' ? 'text-pink-400 font-bold' : 'text-gray-300'}`}>
                            Pricing
                        </li>
                    </Link>
                    <li>
                        <button
                            onClick={() => window.open('https://web.telegram.org/k/#@aptosverese_nft_bot', '_blank')}
                            className="cursor-pointer transition-all hover:text-pink-400 
                                     text-gray-300 font-medium"
                        >
                            NFT Marketplace
                        </button>
                    </li>
                </ul>

                {/* Wallet Button */}
                <div className="flex items-center">
                    <button
                        onClick={connectWallet}
                        className="ml-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold 
                                   py-2 px-5 rounded-xl shadow-md hover:scale-105 hover:shadow-lg 
                                   transition-all duration-300"
                    >
                        {walletAddress ? truncateAddress(walletAddress) : 'Connect Wallet'}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default React.memo(Header);

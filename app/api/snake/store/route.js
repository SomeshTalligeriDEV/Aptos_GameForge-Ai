import { AptosClient } from "aptos";

// Configure your Aptos client
const client = new AptosClient("https://fullnode.mainnet.aptoslabs.com");
const FACTORY_ADDRESS = "0x..."; // Replace with your deployed contract address

export async function POST(req) {
    try {
        const { gameId, moves, score, walletAddress } = await req.json();

        // Convert moves to a string format for on-chain storage
        const moveData = JSON.stringify(moves);

        // Create transaction payload
        const payload = {
            function: `${FACTORY_ADDRESS}::factory::record_game_move`,
            type_arguments: [],
            arguments: [gameId, moveData, score]
        };

        // Sign and submit transaction (you'll need to implement wallet connection)
        // This is a placeholder - you'll need to integrate with the user's wallet
        const txnHash = await client.generateTransaction(walletAddress, payload);
        
        return new Response(JSON.stringify({ success: true, txnHash }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error storing game state:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

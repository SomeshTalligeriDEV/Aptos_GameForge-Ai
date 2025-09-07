import { AptosClient } from "aptos";

const client = new AptosClient("https://fullnode.mainnet.aptoslabs.com");
const FACTORY_ADDRESS = "tournament_factory"; // Replace with your deployed contract address

export async function POST(req) {
    try {
        const { gameId, gameType, moves, score, walletAddress } = await req.json();
        
        // Convert game state to a serialized format for on-chain storage
        const moveData = JSON.stringify({
            type: gameType,
            moves: moves,
            timestamp: Date.now()
        });

        // Create transaction payload
        const payload = {
            function: `${FACTORY_ADDRESS}::factory::record_game_move`,
            type_arguments: [],
            arguments: [gameId, moveData, score]
        };

        // Sign and submit transaction
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

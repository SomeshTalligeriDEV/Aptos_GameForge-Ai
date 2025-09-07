module tournament_factory::factory {
    use std::signer;
    use std::string::String;
    use std::table::{Self, Table};
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::timestamp;
    use tournament::game;
    use tournament::game_state;

    /// Struct to store all game tournaments
    struct GameFactory has key {
        game_count: u64,
        games: Table<u64, game::Tournament>
    }

    /// Error when non-owner tries to access factory functions
    const ENOT_FACTORY_OWNER: u64 = 1;
    /// Factory address constant
    const FACTORY_ADDRESS: address = @tournament_factory;

    /// Initialize the game factory
    public entry fun initialize_factory(admin: &signer) {
        move_to(admin, GameFactory {
            game_count: 0,
            games: table::new()
        });
        
        // Initialize game states separately
        game_state::initialize_game_states(admin);
    }

    /// Create a new tournament game
    public entry fun create_new_game(
        creator: &signer,
        entry_fee: u64
    ) acquires GameFactory {
        let factory = borrow_global_mut<GameFactory>(FACTORY_ADDRESS);
        let game_id = factory.game_count + 1;

        let tournament = game::initialize(
            signer::address_of(creator),
            entry_fee
        );

        table::add(&mut factory.games, game_id, tournament);
        factory.game_count = game_id;
    }

    /// Join a tournament by providing entry fee
    public fun join_game(
        tournament: &mut game::Tournament,
        player: &signer,
        amount: u64
    ) {
        let player_addr = signer::address_of(player);
        let entry_coin = coin::withdraw<AptosCoin>(player, amount);
        game::join(tournament, player_addr, entry_coin);
    }

    /// Join a tournament through the factory
    public entry fun join_game_via_factory(
        player: &signer,
        game_id: u64,
        amount: u64
    ) acquires GameFactory {
        let factory = borrow_global_mut<GameFactory>(FACTORY_ADDRESS);
        let tournament = table::borrow_mut(&mut factory.games, game_id);
        join_game(tournament, player, amount);
    }

    /// Finalize a tournament and distribute prizes
    public entry fun finalize_game_via_factory(
        creator: &signer,
        game_id: u64,
        top_three: vector<address>
    ) acquires GameFactory {
        let factory = borrow_global_mut<GameFactory>(FACTORY_ADDRESS);
        let tournament = table::borrow_mut(&mut factory.games, game_id);
        game::finalize(tournament, signer::address_of(creator), top_three);
    }

    /// Record a player's move in a game
    public entry fun record_game_move(
        player: &signer,
        game_id: u64,
        move_data: String,
        score: u64
    ) acquires GameFactory {
        let player_addr = signer::address_of(player);
        let game_states = &mut game_state::get_game_states();
        let current_time = timestamp::now_microseconds();
        
        game_state::record_move(
            game_states,
            game_id,
            player_addr,
            move_data,
            score,
            current_time
        );
    }

    /// Get all moves for a player in a game
    public fun get_player_game_moves(
        game_id: u64,
        player: address
    ): vector<String> {
        let game_states = &game_state::get_game_states();
        game_state::get_player_moves(game_states, game_id, player)
    }

    /// Get the highest score for a player in a game
    public fun get_player_game_score(
        game_id: u64,
        player: address
    ): u64 {
        let game_states = &game_state::get_game_states();
        game_state::get_player_score(game_states, game_id, player)
    }
}
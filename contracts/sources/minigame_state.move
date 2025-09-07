module tournament::game_state {
    use std::vector;
    use std::string::String;
    use aptos_framework::table::{Self, Table};

    /// Game state address constant
    const GAME_STATE_ADDRESS: address = @tournament;

    struct GameState has store {
        game_id: u64,
        player: address,
        moves: vector<String>,
        score: u64,
        timestamp: u64
    }

    struct GameStates has key {
        states: Table<u64, vector<GameState>>
    }

    public fun initialize_game_states(account: &signer) {
        move_to(account, GameStates {
            states: table::new()
        });
    }

    public fun get_game_states(): &mut GameStates acquires GameStates {
        borrow_global_mut<GameStates>(GAME_STATE_ADDRESS)
    }

    public fun record_move(
        states: &mut GameStates,
        game_id: u64,
        player: address,
        move_data: String,
        score: u64,
        timestamp: u64
    ) {
        if (!table::contains(&states.states, game_id)) {
            table::add(&mut states.states, game_id, vector::empty<GameState>());
        };

        let game_states = table::borrow_mut(&mut states.states, game_id);
        vector::push_back(game_states, GameState {
            game_id,
            player,
            moves: vector::singleton(move_data),
            score,
            timestamp
        });
    }

    public fun get_player_moves(
        states: &GameStates,
        game_id: u64,
        player: address
    ): vector<String> {
        if (!table::contains(&states.states, game_id)) {
            return vector::empty();
        };

        let game_states = table::borrow(&states.states, game_id);
        let moves = vector::empty<String>();

        let i = 0;
        while (i < vector::length(game_states)) {
            let state = vector::borrow(game_states, i);
            if (state.player == player) {
                vector::append(&mut moves, *&state.moves);
            };
            i = i + 1;
        };

        moves
    }

    public fun get_player_score(
        states: &GameStates,
        game_id: u64,
        player: address
    ): u64 {
        if (!table::contains(&states.states, game_id)) {
            return 0
        };

        let game_states = table::borrow(&states.states, game_id);
        let highest_score = 0u64;

        let i = 0;
        while (i < vector::length(game_states)) {
            let state = vector::borrow(game_states, i);
            if (state.player == player && state.score > highest_score) {
                highest_score = state.score;
            };
            i = i + 1;
        };

        highest_score
    }
}

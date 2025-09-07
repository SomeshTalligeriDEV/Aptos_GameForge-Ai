module tournament::game {
    use std::vector;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::aptos_coin::AptosCoin;

    struct Tournament has store {
        creator: address,
        entry_fee: u64,
        participants: vector<address>,
        prize_pool: Coin<AptosCoin>,
        status: bool,
        top_three: vector<address>,
    }

    /// Error when trying to interact with a closed tournament
    const ETOURNAMENT_CLOSED: u64 = 1;
    /// Error when player tries to join a tournament they're already part of
    const EALREADY_JOINED: u64 = 2;
    /// Error when the entry fee provided doesn't match the tournament requirement
    const EINVALID_ENTRY_FEE: u64 = 3;
    /// Error when non-creator tries to perform creator-only actions
    const EONLY_CREATOR: u64 = 4;
    /// Error when the top three vector is not exactly 3 addresses
    const EINVALID_TOP_THREE: u64 = 5;
    /// Error when trying to finalize a tournament with less than 3 participants
    const ENOT_ENOUGH_PARTICIPANTS: u64 = 6;
    /// Error when trying to include a non-participant in top three
    const EADDRESS_NOT_PARTICIPANT: u64 = 7;

    public fun initialize(
        creator: address,
        entry_fee: u64
    ): Tournament {
        Tournament {
            creator,
            entry_fee,
            participants: vector::empty(),
            prize_pool: coin::zero<AptosCoin>(),
            status: true,
            top_three: vector::empty(),
        }
    }

    public fun join(
        tournament: &mut Tournament,
        player: address,
        entry_coin: Coin<AptosCoin>
    ) {
        assert!(tournament.status, ETOURNAMENT_CLOSED);
        assert!(!vector::contains(&tournament.participants, &player), EALREADY_JOINED);
        assert!(coin::value(&entry_coin) == tournament.entry_fee, EINVALID_ENTRY_FEE);

        coin::merge(&mut tournament.prize_pool, entry_coin);
        vector::push_back(&mut tournament.participants, player);
    }

    public fun finalize(
        tournament: &mut Tournament,
        caller: address,
        top_three: vector<address>
    ) {
        assert!(caller == tournament.creator, EONLY_CREATOR);
        assert!(tournament.status, ETOURNAMENT_CLOSED);
        assert!(vector::length(&top_three) == 3, EINVALID_TOP_THREE);
        
        let participants_count = vector::length(&tournament.participants);
        assert!(participants_count >= 3, ENOT_ENOUGH_PARTICIPANTS);

        // Verify participants
        let i = 0;
        while (i < 3) {
            let addr = *vector::borrow(&top_three, i);
            assert!(vector::contains(&tournament.participants, &addr), EADDRESS_NOT_PARTICIPANT);
            i = i + 1;
        };

        tournament.top_three = top_three;
        tournament.status = false;

        // Calculate distribution
        let total = coin::value(&tournament.prize_pool);
        let commission = total * 10 / 100;
        let prize_pool = total - commission;

        // Create a temporary coin for commission
        let commission_coin = coin::extract(&mut tournament.prize_pool, commission);
        coin::deposit(tournament.creator, commission_coin);

        // Distribute prizes
        let first = *vector::borrow(&tournament.top_three, 0);
        let second = *vector::borrow(&tournament.top_three, 1);
        let third = *vector::borrow(&tournament.top_three, 2);

        distribute_prize(&mut tournament.prize_pool, first, prize_pool * 50 / 100);
        distribute_prize(&mut tournament.prize_pool, second, prize_pool * 30 / 100);
        distribute_prize(&mut tournament.prize_pool, third, prize_pool * 20 / 100);

        // Handle remaining funds
        let remaining = coin::value(&tournament.prize_pool);
        if (remaining > 0) {
            let remaining_coin = coin::extract(&mut tournament.prize_pool, remaining);
            coin::deposit(first, remaining_coin);
        }
    }

    public fun distribute_prize(
        prize_pool: &mut Coin<AptosCoin>,
        winner: address,
        amount: u64
    ) {
        let prize = coin::extract(prize_pool, amount);
        coin::deposit(winner, prize);
    }
}
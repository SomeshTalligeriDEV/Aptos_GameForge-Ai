script {
    use tournament_factory::factory;
    
    fun main(admin: &signer) {
        // Initialize factory
        factory::initialize_factory(admin);
    }
}
module trainer_addr::agent_vault_v2 {
    use std::string::{String, utf8};
    use std::signer;

    const E_IS_NOT_INITIALIZED: u64 = 1;
    const E_IS_INITIALIZED: u64 = 3;

    struct AgentVault has key {
        name: String,
        electric_squad: u64,
        water_squad: u64,
        fire_squad: u64,
        earth_squad: u64,
        air_squad: u64,
        tank_squad: u64,
        support_squad: u64,
        scout_squad: u64,
        guardian_squad: u64,
        cyber_squad: u64,
        total_interactions: u64,
        mood_index: u64,
        tier: u8,
    }

    public fun assert_uninitialized(addr: address) {
        assert!(!exists<AgentVault>(addr), E_IS_INITIALIZED);
    }

    public fun assert_is_initialized(addr: address) {
        assert!(exists<AgentVault>(addr), E_IS_NOT_INITIALIZED);
    }

    public entry fun init_agent_vault(account: &signer, name: String) {
        let addr = signer::address_of(account);
        assert_uninitialized(addr);
        let agent_vault = AgentVault {
            name,
            electric_squad: 0,
            water_squad: 0,
            fire_squad: 0,
            earth_squad: 0,
            air_squad: 0,
            tank_squad: 0,
            support_squad: 0,
            scout_squad: 0,
            guardian_squad: 0,
            cyber_squad: 0,
            total_interactions: 0,
            mood_index: 50, // Neutral mood starts at 50
            tier: 1,
        };
        move_to(account, agent_vault);
    }

    fun update_status(vault: &mut AgentVault) {
        // Mood Logic
        let base_mood = 50;
        let interaction_bonus = if (vault.total_interactions > 50) { 50 } else { vault.total_interactions };
        vault.mood_index = base_mood + interaction_bonus;

        // Tier Logic
        if (vault.total_interactions >= 50 && vault.tier < 3) {
            vault.tier = 3;
        } else if (vault.total_interactions >= 10 && vault.tier < 2) {
            vault.tier = 2;
        };
    }

    public entry fun add_electric_member(acc: &signer) acquires AgentVault {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let vault = borrow_global_mut<AgentVault>(addr);
        vault.electric_squad = vault.electric_squad + 1;
        vault.total_interactions = vault.total_interactions + 1;
        update_status(vault);
    }

    public entry fun add_water_member(acc: &signer) acquires AgentVault {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let vault = borrow_global_mut<AgentVault>(addr);
        vault.water_squad = vault.water_squad + 1;
        vault.total_interactions = vault.total_interactions + 1;
        update_status(vault);
    }

    public entry fun add_fire_member(acc: &signer) acquires AgentVault {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let vault = borrow_global_mut<AgentVault>(addr);
        vault.fire_squad = vault.fire_squad + 1;
        vault.total_interactions = vault.total_interactions + 1;
        update_status(vault);
    }

    public entry fun add_earth_member(acc: &signer) acquires AgentVault {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let vault = borrow_global_mut<AgentVault>(addr);
        vault.earth_squad = vault.earth_squad + 1;
        vault.total_interactions = vault.total_interactions + 1;
        update_status(vault);
    }

    public entry fun add_air_member(acc: &signer) acquires AgentVault {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let vault = borrow_global_mut<AgentVault>(addr);
        vault.air_squad = vault.air_squad + 1;
        vault.total_interactions = vault.total_interactions + 1;
        update_status(vault);
    }

    public entry fun add_tank_member(acc: &signer) acquires AgentVault {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let vault = borrow_global_mut<AgentVault>(addr);
        vault.tank_squad = vault.tank_squad + 1;
        vault.total_interactions = vault.total_interactions + 1;
        update_status(vault);
    }

    public entry fun add_support_member(acc: &signer) acquires AgentVault {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let vault = borrow_global_mut<AgentVault>(addr);
        vault.support_squad = vault.support_squad + 1;
        vault.total_interactions = vault.total_interactions + 1;
        update_status(vault);
    }

    public entry fun add_scout_member(acc: &signer) acquires AgentVault {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let vault = borrow_global_mut<AgentVault>(addr);
        vault.scout_squad = vault.scout_squad + 1;
        vault.total_interactions = vault.total_interactions + 1;
        update_status(vault);
    }

    public entry fun add_guardian_member(acc: &signer) acquires AgentVault {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let vault = borrow_global_mut<AgentVault>(addr);
        vault.guardian_squad = vault.guardian_squad + 1;
        vault.total_interactions = vault.total_interactions + 1;
        update_status(vault);
    }

    public entry fun add_cyber_member(acc: &signer) acquires AgentVault {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let vault = borrow_global_mut<AgentVault>(addr);
        vault.cyber_squad = vault.cyber_squad + 1;
        vault.total_interactions = vault.total_interactions + 1;
        update_status(vault);
    }

    #[view]
    public fun view_agent_vault(addr: address): (String, u64, u64, u64, u64, u64, u64, u64, u64, u64, u64, u64, u64, u8) acquires AgentVault {
        assert_is_initialized(addr);
        let vault = borrow_global<AgentVault>(addr);
        (
            vault.name,
            vault.electric_squad,
            vault.water_squad,
            vault.fire_squad,
            vault.earth_squad,
            vault.air_squad,
            vault.tank_squad,
            vault.support_squad,
            vault.scout_squad,
            vault.guardian_squad,
            vault.cyber_squad,
            vault.total_interactions,
            vault.mood_index,
            vault.tier
        )
    }

    #[test(acc = @0x1234)]
    public entry fun test_happy_case(acc: &signer) acquires AgentVault {
        let addr = signer::address_of(acc);
        assert_uninitialized(addr);

        // Initialize Agent Vault
        init_agent_vault(acc, utf8(b"Professor Vaulton"));
        let (name, electric, _, _, _, _, _, _, _, _, _, interactions, mood, tier) = view_agent_vault(addr);
        assert!(name == utf8(b"Professor Vaulton"), 1);
        assert!(electric == 0, 1);
        assert!(interactions == 0, 1);
        assert!(mood == 50, 1);
        assert!(tier == 1, 1);

        // Add electric member
        add_electric_member(acc);
        let (_, electric, _, _, _, _, _, _, _, _, _, interactions, mood, tier) = view_agent_vault(addr);
        assert!(electric == 1, 1);
        assert!(interactions == 1, 1);
        assert!(mood == 51, 1);
        assert!(tier == 1, 1);
    }
}

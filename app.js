/**
 * THE CURATOR — COMPLETE REWRITE
 * Fixes: navigation, rendering, image handling, filtering, routing, mobile bugs.
 * All original entries preserved. Read-only. No persistence.
 */

// ─── FALLBACK IMAGE ───────────────────────────────────────────────────────────
const getFallbackImage = (title = '') => {
    const encoded = encodeURIComponent(title || 'Missing Art');
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900"><rect fill="%2313131a" width="600" height="900"/><rect fill="%231e1e2a" x="40" y="40" width="520" height="820" rx="12"/><text fill="%234a4a6a" font-family="sans-serif" font-size="18" font-weight="600" x="50%" y="48%" dominant-baseline="middle" text-anchor="middle">${encoded}</text><text fill="%2332324a" font-family="sans-serif" font-size="13" x="50%" y="54%" dominant-baseline="middle" text-anchor="middle">No Image</text></svg>`;
};

// ─── MASTER DATA ──────────────────────────────────────────────────────────────
const rawMediaData = [
    // GAMES
    { id: "101", title: "Bloodborne", type: "game", status: "playing", rating: 9.5, image: "https://upload.wikimedia.org/wikipedia/en/6/68/Bloodborne_Cover_Wallpaper.jpg", genres: ["Souls-like", "Action RPG"], releaseYear: 2015, notes: "The atmosphere in Yharnam is unmatched. A masterpiece of environmental storytelling." },
    { id: "102", title: "God of War (2018)", type: "game", status: "completed", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/library_600x900.jpg", releaseYear: 2018, notes: "Incredible soft reboot. The Leviathan axe mechanics feel weighty and satisfying.", genres: ["Action", "Adventure"] },
    { id: "103", title: "The Last of Us Part I", type: "game", status: "playing", rating: 9.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/library_600x900.jpg", genres: ["Narrative", "Survival"], releaseYear: 2022 },
    { id: "104", title: "Ghost of Tsushima", type: "game", status: "dropped", rating: 6.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/library_600x900.jpg", genres: ["Action", "Open World"], releaseYear: 2021 },
    { id: "105", title: "Horizon Zero Dawn", type: "game", status: "dropped", rating: 5.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/library_600x900.jpg", genres: ["RPG", "Open World"], releaseYear: 2020 },
    { id: "106", title: "Forza Horizon 5", type: "game", status: "completed", rating: 6.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/library_600x900.jpg", genres: ["Racing", "Open World"], releaseYear: 2021 },
    { id: "107", title: "The Witcher 3: Wild Hunt", type: "game", status: "completed", rating: 7.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/library_600x900.jpg", genres: ["RPG", "Open World"], releaseYear: 2015 },
    { id: "108", title: "Red Dead Redemption 2", type: "game", status: "completed", rating: 9.3, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900.jpg", genres: ["Open World", "Narrative"], releaseYear: 2018, notes: "Arthur Morgan's journey is a masterpiece of storytelling. The open world feels remarkably alive." },
    { id: "109", title: "Grand Theft Auto V", type: "game", status: "completed", rating: 7.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg", genres: ["Open World", "Action"], releaseYear: 2013 },
    { id: "110", title: "Cyberpunk 2077", type: "game", status: "completed", rating: 9.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg", genres: ["RPG", "Cyberpunk"], releaseYear: 2020 },
    { id: "111", title: "The Elder Scrolls V: Skyrim", type: "game", status: "dropped", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/489830/library_600x900.jpg", genres: ["RPG", "Open World"], releaseYear: 2011 },
    { id: "112", title: "Half-Life 2", type: "game", status: "completed", rating: 9.6, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/library_600x900.jpg", genres: ["FPS", "Sci-Fi"], releaseYear: 2004 },
    { id: "113", title: "Portal 2", type: "game", status: "completed", rating: 8.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/library_600x900.jpg", genres: ["Puzzle", "Sci-Fi"], releaseYear: 2011 },
    { id: "114", title: "Dishonored", type: "game", status: "completed", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/205100/library_600x900.jpg", genres: ["Stealth", "Action"], releaseYear: 2012 },
    { id: "115", title: "Dark Souls", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570940/library_600x900.jpg", genres: ["Action RPG", "Dark Fantasy"], releaseYear: 2018 },
    { id: "116", title: "Dark Souls III", type: "game", status: "completed", rating: 9.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/library_600x900.jpg", genres: ["Action RPG", "Dark Fantasy"], releaseYear: 2016 },
    { id: "117", title: "Elden Ring", type: "game", status: "completed", rating: 9.9, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900.jpg", genres: ["Open World", "Action RPG"], releaseYear: 2022 },
    { id: "118", title: "Sekiro: Shadows Die Twice", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/814380/library_600x900.jpg", genres: ["Action", "Souls-like"], releaseYear: 2019 },
    { id: "119", title: "Baldur's Gate 3", type: "game", status: "dropped", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/library_600x900.jpg", genres: ["RPG", "Turn-Based"], releaseYear: 2023 },
    { id: "120", title: "World of Warcraft: Wotlk", type: "game", status: "completed", rating: 9.5, image: "https://upload.wikimedia.org/wikipedia/en/e/e5/World_of_Warcraft_Wrath_of_the_Lich_King_box_art.jpg", genres: ["MMORPG"], releaseYear: 2008 },
    { id: "121", title: "Genshin Impact", type: "game", status: "dropped", rating: 0, image: "https://upload.wikimedia.org/wikipedia/en/5/5d/Genshin_Impact_logo.png", genres: ["RPG", "Open World"], releaseYear: 2020 },
    { id: "122", title: "Terraria", type: "game", status: "completed", rating: 7.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/library_600x900.jpg", genres: ["Sandbox", "Survival"], releaseYear: 2011 },
    { id: "123", title: "Minecraft", type: "game", status: "completed", rating: 8.5, image: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png", genres: ["Sandbox", "Survival"], releaseYear: 2011 },
    { id: "124", title: "Outer Wilds", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/library_600x900.jpg", genres: ["Exploration", "Puzzle"], releaseYear: 2019, notes: "A philosophical masterpiece about curiosity and the end of everything. Changed how I think about games." },
    { id: "125", title: "StarCraft II", type: "game", status: "completed", rating: 8.0, image: "https://upload.wikimedia.org/wikipedia/en/2/20/StarCraft_II_-_Box_Art.jpg", genres: ["RTS", "Sci-Fi"], releaseYear: 2010 },
    { id: "126", title: "Counter-Strike 2", type: "game", status: "playing", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/library_600x900.jpg", genres: ["FPS", "Competitive"], releaseYear: 2023 },
    { id: "127", title: "Valorant", type: "game", status: "playing", rating: 8.4, image: "https://upload.wikimedia.org/wikipedia/en/a/ab/Valorant_cover_art.jpg", genres: ["FPS", "Tactical"], releaseYear: 2020 },
    { id: "128", title: "League of Legends", type: "game", status: "playing", rating: 0, image: "https://upload.wikimedia.org/wikipedia/en/7/77/League_of_Legends_logo.png", genres: ["MOBA", "Competitive"], releaseYear: 2009 },
    { id: "129", title: "Fortnite", type: "game", status: "playing", rating: 9.9, image: "https://upload.wikimedia.org/wikipedia/en/a/a8/FortniteCoverArt.jpg", genres: ["Battle Royale"], releaseYear: 2017 },
    { id: "130", title: "Overwatch 2", type: "game", status: "dropped", rating: 1.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2357570/library_600x900.jpg", genres: ["FPS", "Hero Shooter"], releaseYear: 2022 },
    { id: "131", title: "Rocket League", type: "game", status: "dropped", rating: 4.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252950/library_600x900.jpg", genres: ["Sports", "Competitive"], releaseYear: 2015 },
    { id: "132", title: "Tom Clancy's Rainbow Six Siege", type: "game", status: "dropped", rating: 6.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359550/library_600x900.jpg", genres: ["FPS", "Tactical"], releaseYear: 2015 },
    { id: "133", title: "Call of Duty: Warzone", type: "game", status: "dropped", rating: 6.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1962660/library_600x900.jpg", genres: ["Battle Royale", "FPS"], releaseYear: 2020 },
    { id: "134", title: "Super Mario 64", type: "game", status: "completed", rating: 8.0, image: "https://upload.wikimedia.org/wikipedia/en/6/6a/Super_Mario_64_box_cover.jpg", genres: ["Platformer", "Classic"], releaseYear: 1996 },
    { id: "135", title: "Dark Souls II: Scholar of the First Sin", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/335300/library_600x900.jpg", genres: ["Action RPG", "Souls-like"], releaseYear: 2015 },
    { id: "136", title: "Lies of P", type: "game", status: "playing", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1627720/library_600x900.jpg", genres: ["Souls-like", "Action"], releaseYear: 2023 },
    { id: "137", title: "Nioh", type: "game", status: "dropped", rating: 3.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/485510/library_600x900.jpg", genres: ["Action RPG", "Souls-like"], releaseYear: 2017 },
    { id: "138", title: "Sifu", type: "game", status: "completed", rating: 7.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2138710/library_600x900.jpg", genres: ["Action", "Martial Arts"], releaseYear: 2022 },
    { id: "139", title: "Cyberpunk 2077: Phantom Liberty", type: "game", status: "completed", rating: 9.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2138330/library_600x900.jpg", genres: ["RPG", "Cyberpunk"], releaseYear: 2023 },
    { id: "140", title: "Hell Let Loose", type: "game", status: "dropped", rating: 5.6, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/686810/library_600x900.jpg", genres: ["FPS", "Tactical"], releaseYear: 2021 },
    { id: "141", title: "Far Cry 3", type: "game", status: "completed", rating: 9.7, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220240/library_600x900.jpg", genres: ["FPS", "Open World"], releaseYear: 2012 },
    { id: "142", title: "Deep Rock Galactic", type: "game", status: "dropped", rating: 6.7, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/548430/library_600x900.jpg", genres: ["Co-op", "FPS"], releaseYear: 2020 },
    { id: "143", title: "Alien: Isolation", type: "game", status: "completed", rating: 8.7, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/library_600x900.jpg", genres: ["Horror", "Survival"], releaseYear: 2014 },
    { id: "144", title: "Outlast", type: "game", status: "completed", rating: 9.3, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238320/library_600x900.jpg", genres: ["Horror"], releaseYear: 2013 },
    { id: "145", title: "Phasmophobia", type: "game", status: "dropped", rating: 3.2, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/739630/library_600x900.jpg", genres: ["Horror", "Co-op"], releaseYear: 2020 },
    { id: "146", title: "Valheim", type: "game", status: "dropped", rating: 6.9, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/892970/library_600x900.jpg", genres: ["Survival", "Open World"], releaseYear: 2021 },
    { id: "147", title: "The Forest", type: "game", status: "completed", rating: 7.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242760/library_600x900.jpg", genres: ["Survival", "Horror"], releaseYear: 2018 },
    { id: "148", title: "Sons of the Forest", type: "game", status: "dropped", rating: 6.2, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1326470/library_600x900.jpg", genres: ["Survival", "Horror"], releaseYear: 2023 },
    { id: "149", title: "Hearts of Iron IV", type: "game", status: "playing", rating: 5.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/394360/library_600x900.jpg", genres: ["Strategy", "Historical"], releaseYear: 2016 },
    { id: "150", title: "Black Myth: Wukong", type: "game", status: "playing", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/library_600x900.jpg", genres: ["Action RPG", "Mythology"], releaseYear: 2024 },
    { id: "151", title: "Nioh 2", type: "game", status: "dropped", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1301210/library_600x900.jpg", genres: ["Action RPG", "Souls-like"], releaseYear: 2021 },
    { id: "152", title: "Batman: Arkham Knight", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/208650/library_600x900.jpg", genres: ["Action", "Superhero"], releaseYear: 2015 },
    { id: "153", title: "God of War Ragnarök", type: "game", status: "completed", rating: 8.3, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/library_600x900.jpg", genres: ["Action", "Adventure"], releaseYear: 2022 },
    { id: "154", title: "Hogwarts Legacy", type: "game", status: "dropped", rating: 4.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/library_600x900.jpg", genres: ["RPG", "Open World"], releaseYear: 2023 },
    { id: "155", title: "Rise of the Tomb Raider", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/391220/library_600x900.jpg", genres: ["Action", "Adventure"], releaseYear: 2016 },
    { id: "156", title: "Shadow of the Tomb Raider", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/750920/library_600x900.jpg", genres: ["Action", "Adventure"], releaseYear: 2018 },
    { id: "157", title: "Tomb Raider (2013)", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/203160/library_600x900.jpg", genres: ["Action", "Adventure"], releaseYear: 2013 },
    { id: "158", title: "Red Dead Redemption", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2668510/library_600x900.jpg", genres: ["Open World", "Western"], releaseYear: 2010 },
    { id: "159", title: "Infamous Second Son", type: "game", status: "planned", rating: 0, image: "https://upload.wikimedia.org/wikipedia/en/b/b6/Infamous_Second_Son_cover.jpg", genres: ["Action", "Open World"], releaseYear: 2014 },
    { id: "160", title: "Half-Life", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/library_600x900.jpg", genres: ["FPS", "Sci-Fi"], releaseYear: 1998 },
    { id: "161", title: "Black Mesa", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/362890/library_600x900.jpg", genres: ["FPS", "Sci-Fi"], releaseYear: 2020 },
    { id: "162", title: "Call of Duty: Modern Warfare (2019)", type: "game", status: "dropped", rating: 3.5, image: "https://upload.wikimedia.org/wikipedia/en/e/e9/CallofDutyModernWarfare%282019%29.jpg", genres: ["FPS", "Military"], releaseYear: 2019 },
    { id: "163", title: "Call of Duty: Black Ops Cold War", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1985810/library_600x900.jpg", genres: ["FPS", "Military"], releaseYear: 2020 },
    { id: "164", title: "Green Hell", type: "game", status: "completed", rating: 4.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/815370/library_600x900.jpg", genres: ["Survival"], releaseYear: 2019 },
    { id: "165", title: "Raft", type: "game", status: "dropped", rating: 5.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/648800/library_600x900.jpg", genres: ["Survival", "Co-op"], releaseYear: 2022 },
    { id: "166", title: "Don't Starve Together", type: "game", status: "dropped", rating: 3.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/library_600x900.jpg", genres: ["Survival", "Co-op"], releaseYear: 2016 },
    { id: "167", title: "Hollow Knight", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/library_600x900.jpg", genres: ["Metroidvania", "Platformer"], releaseYear: 2017 },
    { id: "168", title: "Firewatch", type: "game", status: "completed", rating: 9.1, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/383870/library_600x900.jpg", genres: ["Narrative", "Walking Sim"], releaseYear: 2016 },
    { id: "169", title: "SOMA", type: "game", status: "completed", rating: 9.6, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/282140/library_600x900.jpg", genres: ["Horror", "Sci-Fi"], releaseYear: 2015, notes: "A haunting meditation on consciousness and identity. The ending is unforgettable." },
    { id: "170", title: "It Takes Two", type: "game", status: "completed", rating: 8.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1426210/library_600x900.jpg", genres: ["Co-op", "Platformer"], releaseYear: 2021 },
    { id: "171", title: "A Way Out", type: "game", status: "completed", rating: 9.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222700/library_600x900.jpg", genres: ["Co-op", "Action"], releaseYear: 2018 },
    { id: "172", title: "Little Nightmares", type: "game", status: "completed", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/424840/library_600x900.jpg", genres: ["Horror", "Puzzle"], releaseYear: 2017 },
    { id: "173", title: "Little Nightmares II", type: "game", status: "completed", rating: 8.2, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/860510/library_600x900.jpg", genres: ["Horror", "Puzzle"], releaseYear: 2021 },
    { id: "174", title: "Elden Ring: Shadow of the Erdtree", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2778580/library_600x900.jpg", genres: ["Action RPG", "Dark Fantasy"], releaseYear: 2024 },
    { id: "175", title: "Assassin's Creed I", type: "game", status: "completed", rating: 7.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/15100/library_600x900.jpg", genres: ["Action", "Stealth"], releaseYear: 2007 },
    { id: "176", title: "Assassin's Creed II", type: "game", status: "completed", rating: 9.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/33230/library_600x900.jpg", genres: ["Action", "Stealth"], releaseYear: 2009 },
    { id: "177", title: "Assassin's Creed Brotherhood", type: "game", status: "playing", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/48190/library_600x900.jpg", genres: ["Action", "Stealth"], releaseYear: 2010 },
    { id: "178", title: "Assassin's Creed III", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/208480/library_600x900.jpg", genres: ["Action", "Stealth"], releaseYear: 2012 },
    { id: "179", title: "Assassin's Creed Revelations", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/201870/library_600x900.jpg", genres: ["Action", "Stealth"], releaseYear: 2011 },
    { id: "180", title: "Lethal Company", type: "game", status: "playing", rating: 6.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1966720/library_600x900.jpg", genres: ["Horror", "Co-op"], releaseYear: 2023 },
    { id: "181", title: "Brawlhalla", type: "game", status: "dropped", rating: 4.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/329860/library_600x900.jpg", genres: ["Fighting"], releaseYear: 2017 },
    { id: "182", title: "Goat Simulator 3", type: "game", status: "completed", rating: 5.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2144740/library_600x900.jpg", genres: ["Comedy", "Sandbox"], releaseYear: 2022 },

    // ANIME
    { id: "901", title: "Attack on Titan", type: "anime", status: "completed", rating: 9.8, image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Shingeki_no_Kyojin_manga_volume_1.jpg", genres: ["Action", "Dark Fantasy"], releaseYear: 2013, notes: "Masterpiece of foreshadowing. Flawless narrative structure with one of the best endings in anime." },
    { id: "902", title: "Jujutsu Kaisen", type: "anime", status: "playing", rating: 8.5, image: "https://upload.wikimedia.org/wikipedia/en/4/46/Jujutsu_kaisen.jpg", genres: ["Action", "Supernatural"], releaseYear: 2020 },
    { id: "903", title: "Death Note", type: "anime", status: "completed", rating: 9.0, image: "https://upload.wikimedia.org/wikipedia/en/6/6f/Death_Note_Vol_1.jpg", genres: ["Psychological Thriller", "Mystery"], releaseYear: 2006, notes: "A psychological cat-and-mouse thriller that defines the genre. Light vs L is unmatched." },

    // TV SHOWS
    { id: "904", title: "Arcane", type: "tv", status: "completed", rating: 10.0, image: "https://upload.wikimedia.org/wikipedia/en/a/a6/Arcane_League_of_Legends_Season_1_poster.jpg", genres: ["Sci-Fi", "Action", "Animation"], releaseYear: 2021, notes: "The gold standard for video game adaptations. Animation is groundbreaking. Every frame is a painting." },

    // MOVIES
    { id: "801", title: "Interstellar", type: "movies", status: "completed", rating: 10.0, image: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg", genres: ["Sci-Fi", "Drama"], releaseYear: 2014, notes: "Visually stunning. Zimmer's score is transcendental. The docking scene is cinema perfection." },
    { id: "802", title: "Dune: Part Two", type: "movies", status: "completed", rating: 9.5, image: "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_Part_Two_poster.jpg", genres: ["Sci-Fi", "Epic"], releaseYear: 2024, notes: "Denis Villeneuve cements himself as the greatest living sci-fi director. Every frame is immaculate." }
];

// ─── DATA NORMALIZER ──────────────────────────────────────────────────────────
class DataNormalizer {
    static parse(arr) {
        return arr.map(item => ({
            id: String(item.id || Math.random().toString(36).substr(2, 9)),
            title: item.title || 'Unknown Title',
            type: String(item.type || 'game').toLowerCase(),
            status: this.normalizeStatus(item.status),
            rating: parseFloat(item.rating) || 0,
            image: item.image || getFallbackImage(item.title),
            genres: Array.isArray(item.genres) ? item.genres : [],
            releaseYear: item.releaseYear || '',
            notes: item.notes || ''
        }));
    }
    static normalizeStatus(s) {
        const v = String(s || '').toLowerCase();
        if (v === 'watching') return 'playing';
        if (['playing', 'completed', 'planned', 'dropped'].includes(v)) return v;
        return 'planned';
    }
}

// ─── TYPE → SECTION MAPPING ───────────────────────────────────────────────────
// HTML uses: view-dashboard, view-library (shared), view-socials
// Nav views: dashboard, games, movies, anime, tv, socials
// Library views map: games→game, movies→movies, anime→anime, tv→tv

const SECTION_CONFIG = {
    games:  { type: 'game',   title: 'Game Archive',    sub: 'Every game played, rated, and reviewed.' },
    movies: { type: 'movies', title: 'Film Library',     sub: 'Cinematic reviews and personal ratings.' },
    anime:  { type: 'anime',  title: 'Anime Series',     sub: 'Episodic animated narratives and reviews.' },
    tv:     { type: 'tv',     title: 'TV Shows',         sub: 'Live-action episodic content.' }
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
class MediaApp {
    constructor() {
        this.allData = DataNormalizer.parse(rawMediaData);

        this.state = {
            view: 'dashboard',           // current view key
            librarySection: 'games',     // which library we're browsing
            filterStatus: 'all',
            sortBy: 'default',
            searchQuery: ''
        };

        this._searchTimeout = null;
        this._modalOpen = false;

        this._initDOM();
        this._bindEvents();
        this._boot();
    }

    // ── DOM REFS ──────────────────────────────────────────────────────────────
    _initDOM() {
        this.dom = {
            loader:           document.getElementById('app-loader'),
            // Views
            viewDashboard:    document.getElementById('view-dashboard'),
            viewLibrary:      document.getElementById('view-library'),
            viewSocials:      document.getElementById('view-socials'),
            // Dashboard slots
            heroZone:         document.getElementById('hero-zone'),
            statsRow:         document.getElementById('stats-row'),
            recentGrid:       document.getElementById('recent-grid'),
            browseAllBtn:     document.querySelector('.browse-all-btn'),
            // Library slots
            libTitle:         document.getElementById('lib-title'),
            libSub:           document.getElementById('lib-sub'),
            libraryGrid:      document.getElementById('library-grid'),
            emptyState:       document.getElementById('empty-state'),
            resultCount:      document.getElementById('result-count'),
            sortSelect:       document.getElementById('sort-select'),
            filterPills:      document.querySelectorAll('.filter-pill'),
            // Search
            sidebarSearchInput: document.getElementById('sidebar-search-input'),
            sidebarSearchClear: document.getElementById('sidebar-search-clear'),
            overlaySearchInput: document.getElementById('overlay-search-input'),
            mobileSearchToggle: document.getElementById('mobile-search-toggle'),
            overlaySearchClose: document.getElementById('overlay-search-close'),
            searchOverlay:      document.getElementById('search-overlay'),
            // Sidebar nav items
            navItems:           document.querySelectorAll('.nav-item'),
            // Bottom nav items
            bnavItems:          document.querySelectorAll('.bnav-item'),
            // Modal
            modalWrap:          document.getElementById('modal-wrap'),
            modalBackdrop:      document.getElementById('modal-backdrop'),
            modalClose:         document.getElementById('modal-close'),
            modalBannerImg:     document.getElementById('modal-banner-img'),
            modalCoverImg:      document.getElementById('modal-cover-img'),
            modalTitle:         document.getElementById('modal-title'),
            modalStatusBadge:   document.getElementById('modal-status-badge'),
            modalRatingDisplay: document.getElementById('modal-rating-display'),
            modalRatingVal:     document.getElementById('modal-rating-val'),
            modalYearChip:      document.getElementById('modal-year-chip'),
            modalTags:          document.getElementById('modal-tags'),
            modalReviewText:    document.getElementById('modal-review-text'),
            modalActions:       document.getElementById('modal-actions'),
        };
    }

    // ── BOOT ──────────────────────────────────────────────────────────────────
    _boot() {
        const loader = this.dom.loader;
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.pointerEvents = 'none';
                setTimeout(() => loader.classList.add('hidden'), 500);
            }, 280);
        }
        this._navigateTo('dashboard');
    }

    // ── NAVIGATION ────────────────────────────────────────────────────────────
    _navigateTo(viewKey) {
        this.state.view = viewKey;

        // Update sidebar active states
        this.dom.navItems.forEach(el => {
            el.classList.toggle('active', el.dataset.view === viewKey);
        });

        // Update bottom nav active states
        this.dom.bnavItems.forEach(el => {
            el.classList.toggle('active', el.dataset.view === viewKey);
        });

        // Hide all views
        [this.dom.viewDashboard, this.dom.viewLibrary, this.dom.viewSocials].forEach(v => {
            if (v) {
                v.classList.add('hidden');
                v.style.display = 'none';
            }
        });

        if (viewKey === 'dashboard') {
            this._showView(this.dom.viewDashboard);
            this._renderDashboard();
        } else if (viewKey === 'socials') {
            this._showView(this.dom.viewSocials);
        } else if (SECTION_CONFIG[viewKey]) {
            this.state.librarySection = viewKey;
            // Reset filters/search when switching sections
            this.state.filterStatus = 'all';
            this.state.searchQuery = '';
            this.state.sortBy = 'default';
            if (this.dom.sidebarSearchInput) this.dom.sidebarSearchInput.value = '';
            if (this.dom.sidebarSearchClear) this.dom.sidebarSearchClear.classList.add('hidden');
            if (this.dom.sortSelect) this.dom.sortSelect.value = 'default';
            this.dom.filterPills.forEach(p => p.classList.toggle('active', p.dataset.status === 'all'));
            this._showView(this.dom.viewLibrary);
            this._renderLibrary();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    _showView(el) {
        if (!el) return;
        el.classList.remove('hidden');
        el.style.display = '';
    }

    // ── DASHBOARD ─────────────────────────────────────────────────────────────
    _renderDashboard() {
        this._renderStats();
        this._renderHero();
        this._renderRecentGrid();
    }

    _renderStats() {
        if (!this.dom.statsRow) return;
        const counts = { game: 0, anime: 0, movies: 0, tv: 0 };
        let totalRating = 0, ratedCount = 0;

        this.allData.forEach(item => {
            if (counts[item.type] !== undefined) counts[item.type]++;
            if (item.rating > 0) { totalRating += item.rating; ratedCount++; }
        });

        const avg = ratedCount > 0 ? (totalRating / ratedCount).toFixed(1) : '0.0';
        const shows = counts.anime + counts.movies + counts.tv;

        this.dom.statsRow.innerHTML = `
            <div class="stat-card">
                <div class="stat-icon" style="background:rgba(124,109,250,0.12);color:#7c6dfa">
                    <i class="ph-fill ph-game-controller"></i>
                </div>
                <div class="stat-details">
                    <span class="stat-label">Games</span>
                    <span class="stat-value">${counts.game}</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:rgba(34,217,122,0.12);color:#22d97a">
                    <i class="ph-fill ph-television-simple"></i>
                </div>
                <div class="stat-details">
                    <span class="stat-label">Shows &amp; Films</span>
                    <span class="stat-value">${shows}</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:rgba(251,191,36,0.12);color:#fbbf24">
                    <i class="ph-fill ph-star"></i>
                </div>
                <div class="stat-details">
                    <span class="stat-label">Avg Rating</span>
                    <span class="stat-value">${avg}</span>
                </div>
            </div>
        `;
    }

    _renderHero() {
        if (!this.dom.heroZone) return;
        const candidates = this.allData.filter(d => d.status === 'completed' && d.rating >= 9.5);
        const item = candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : this.allData[0];
        if (!item) return;

        const fallback = getFallbackImage(item.title);
        this.dom.heroZone.innerHTML = `
            <img class="hero-bg-img" src="${this._esc(item.image)}" alt=""
                 onerror="this.src='${fallback}'" loading="eager">
            <div class="hero-gradient"></div>
            <div class="hero-content" role="button" tabindex="0"
                 onclick="app.openModal('${item.id}')"
                 onkeydown="if(event.key==='Enter')app.openModal('${item.id}')">
                <span class="hero-chip">
                    <i class="ph-fill ph-star"></i> Curator's Choice
                </span>
                <h1 class="hero-title">${this._esc(item.title)}</h1>
                <p class="hero-desc">${this._esc(item.notes || 'A defining experience in the archive.')}</p>
                ${item.rating > 0 ? `<div class="hero-meta"><span class="hero-rating"><i class="ph-fill ph-star"></i> ${item.rating.toFixed(1)}</span></div>` : ''}
            </div>
        `;
    }

    _renderRecentGrid() {
        if (!this.dom.recentGrid) return;
        const recent = [...this.allData].reverse().slice(0, 12);
        this._buildGrid(recent, this.dom.recentGrid);
    }

    // ── LIBRARY ───────────────────────────────────────────────────────────────
    _renderLibrary() {
        const cfg = SECTION_CONFIG[this.state.librarySection];
        if (!cfg) return;

        if (this.dom.libTitle) this.dom.libTitle.textContent = cfg.title;
        if (this.dom.libSub)   this.dom.libSub.textContent   = cfg.sub;

        let items = this.allData.filter(d => d.type === cfg.type);

        // Status filter
        if (this.state.filterStatus !== 'all') {
            const f = this.state.filterStatus;
            items = items.filter(d => d.status === (f === 'active' ? 'playing' : f));
        }

        // Search filter
        if (this.state.searchQuery) {
            const q = this.state.searchQuery.toLowerCase();
            items = items.filter(d =>
                d.title.toLowerCase().includes(q) ||
                d.genres.some(g => g.toLowerCase().includes(q)) ||
                String(d.releaseYear).includes(q)
            );
        }

        // Sort
        switch (this.state.sortBy) {
            case 'rating-high':  items.sort((a,b) => b.rating - a.rating); break;
            case 'rating-low':   items.sort((a,b) => (a.rating||99) - (b.rating||99)); break;
            case 'title-asc':    items.sort((a,b) => a.title.localeCompare(b.title)); break;
            case 'title-desc':   items.sort((a,b) => b.title.localeCompare(a.title)); break;
            default: break;
        }

        if (this.dom.resultCount) {
            this.dom.resultCount.textContent = `${items.length} ${items.length === 1 ? 'entry' : 'entries'}`;
        }

        if (this.dom.libraryGrid) this.dom.libraryGrid.innerHTML = '';
        if (this.dom.emptyState) {
            this.dom.emptyState.classList.toggle('hidden', items.length > 0);
        }

        if (items.length > 0 && this.dom.libraryGrid) {
            this._buildGrid(items, this.dom.libraryGrid);
        }
    }

    // ── CARD BUILDER ─────────────────────────────────────────────────────────
    _buildGrid(items, container) {
        if (!container) return;
        const frag = document.createDocumentFragment();

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'media-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View details for ${item.title}`);

            const fallback = getFallbackImage(item.title);
            const statusLabel = this._statusLabel(item);
            const badgeClass = `badge-${item.status}`;
            const genreChip = item.genres.length ? `<span class="card-genre-chip">${this._esc(item.genres[0])}</span>` : '';
            const ratingHTML = item.rating > 0
                ? `<span class="card-rating"><i class="ph-fill ph-star"></i>${item.rating.toFixed(1)}</span>`
                : `<span class="card-rating unrated">Unrated</span>`;

            card.innerHTML = `
                <div class="card-img-zone">
                    <img src="${this._esc(item.image)}" alt="${this._esc(item.title)}"
                         loading="lazy"
                         onerror="this.onerror=null;this.src='${fallback}'">
                    <span class="card-status-badge ${badgeClass}">${statusLabel}</span>
                    <div class="card-img-overlay">${genreChip}</div>
                </div>
                <div class="card-body">
                    <h3 class="card-title" title="${this._esc(item.title)}">${this._esc(item.title)}</h3>
                    <div class="card-foot">
                        <span class="card-year">${item.releaseYear || ''}</span>
                        ${ratingHTML}
                    </div>
                </div>
            `;

            const open = () => this.openModal(item.id);
            card.addEventListener('click', open);
            card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });

            frag.appendChild(card);
        });

        container.appendChild(frag);
    }

    // ── MODAL ─────────────────────────────────────────────────────────────────
    openModal(id) {
        const item = this.allData.find(d => d.id === String(id));
        if (!item || !this.dom.modalWrap) return;

        const fallback = getFallbackImage(item.title);

        // Images
        this.dom.modalBannerImg.src = item.image;
        this.dom.modalBannerImg.onerror = () => { this.dom.modalBannerImg.src = fallback; };
        this.dom.modalCoverImg.src = item.image;
        this.dom.modalCoverImg.onerror = () => { this.dom.modalCoverImg.src = fallback; };

        // Title
        this.dom.modalTitle.textContent = item.title;

        // Status badge
        const badge = this.dom.modalStatusBadge;
        badge.textContent = this._statusLabel(item);
        badge.className = `modal-status-badge badge-${item.status}`;

        // Rating
        const rd = this.dom.modalRatingDisplay;
        if (item.rating > 0) {
            rd.classList.remove('unrated');
            this.dom.modalRatingVal.textContent = `${item.rating.toFixed(1)} / 10`;
        } else {
            rd.classList.add('unrated');
            this.dom.modalRatingVal.textContent = 'Unrated';
        }

        // Year
        const yc = this.dom.modalYearChip;
        yc.textContent = item.releaseYear ? String(item.releaseYear) : '';

        // Tags
        const tagsEl = this.dom.modalTags;
        tagsEl.innerHTML = `<span class="modal-tag tag-type">${item.type.toUpperCase()}</span>`;
        item.genres.forEach(g => {
            const span = document.createElement('span');
            span.className = 'modal-tag';
            span.textContent = g;
            tagsEl.appendChild(span);
        });

        // Review
        const rt = this.dom.modalReviewText;
        if (item.notes) {
            rt.classList.remove('no-review');
            rt.innerHTML = `<p>${this._esc(item.notes)}</p>`;
        } else {
            rt.classList.add('no-review');
            rt.innerHTML = '<p>No detailed review provided for this entry yet.</p>';
        }

        // Action buttons
        const ac = this.dom.modalActions;
        if (item.type === 'movies' || item.type === 'anime' || item.type === 'tv') {
            ac.innerHTML = `
                <a href="https://MOVIE-PLACEHOLDER.COM" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-watch">
                    <i class="ph-fill ph-play-circle"></i> Watch
                </a>
            `;
        } else if (item.type === 'game') {
            ac.innerHTML = `
                <a href="https://GAME-DOWNLOAD-PLACEHOLDER.COM" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-magnet">
                    <i class="ph-fill ph-magnet"></i> Magnet Download
                </a>
                <p class="modal-btn-note">Requires Free Download Manager</p>
            `;
        } else {
            ac.innerHTML = '';
        }

        // Show modal
        this.dom.modalWrap.removeAttribute('hidden');
        this.dom.modalWrap.classList.add('active');
        document.body.style.overflow = 'hidden';
        this._modalOpen = true;
    }

    _closeModal() {
        if (!this._modalOpen) return;
        this.dom.modalWrap.classList.remove('active');
        document.body.style.overflow = '';
        this._modalOpen = false;
        setTimeout(() => {
            this.dom.modalWrap.setAttribute('hidden', '');
            if (this.dom.modalBannerImg) this.dom.modalBannerImg.src = '';
            if (this.dom.modalCoverImg)  this.dom.modalCoverImg.src  = '';
        }, 320);
    }

    // ── SEARCH ────────────────────────────────────────────────────────────────
    _handleSearch(q) {
        this.state.searchQuery = q;

        if (this.dom.sidebarSearchClear) {
            this.dom.sidebarSearchClear.classList.toggle('hidden', !q);
        }

        clearTimeout(this._searchTimeout);
        this._searchTimeout = setTimeout(() => {
            // If we're on dashboard or socials, switch to appropriate library view
            if (this.state.view === 'dashboard' || this.state.view === 'socials') {
                this._navigateTo('games');
            } else {
                this._renderLibrary();
            }
        }, 280);
    }

    // ── EVENTS ────────────────────────────────────────────────────────────────
    _bindEvents() {
        // Sidebar nav
        this.dom.navItems.forEach(item => {
            item.addEventListener('click', () => this._navigateTo(item.dataset.view));
            item.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._navigateTo(item.dataset.view); }
            });
        });

        // Bottom nav
        this.dom.bnavItems.forEach(item => {
            item.addEventListener('click', () => this._navigateTo(item.dataset.view));
        });

        // Browse all button (dashboard)
        if (this.dom.browseAllBtn) {
            this.dom.browseAllBtn.addEventListener('click', () => this._navigateTo(this.dom.browseAllBtn.dataset.target || 'games'));
        }

        // Sidebar search
        if (this.dom.sidebarSearchInput) {
            this.dom.sidebarSearchInput.addEventListener('input', e => this._handleSearch(e.target.value.trim()));
        }
        if (this.dom.sidebarSearchClear) {
            this.dom.sidebarSearchClear.addEventListener('click', () => {
                if (this.dom.sidebarSearchInput) this.dom.sidebarSearchInput.value = '';
                this._handleSearch('');
            });
        }

        // Mobile search overlay
        if (this.dom.mobileSearchToggle) {
            this.dom.mobileSearchToggle.addEventListener('click', () => {
                if (this.dom.searchOverlay) {
                    this.dom.searchOverlay.classList.add('open');
                    setTimeout(() => { if (this.dom.overlaySearchInput) this.dom.overlaySearchInput.focus(); }, 80);
                }
            });
        }
        if (this.dom.overlaySearchClose) {
            this.dom.overlaySearchClose.addEventListener('click', () => {
                if (this.dom.searchOverlay) this.dom.searchOverlay.classList.remove('open');
            });
        }
        if (this.dom.overlaySearchInput) {
            this.dom.overlaySearchInput.addEventListener('input', e => {
                const q = e.target.value.trim();
                if (this.dom.sidebarSearchInput) this.dom.sidebarSearchInput.value = q;
                this._handleSearch(q);
                if (q) {
                    setTimeout(() => {
                        if (this.dom.searchOverlay) this.dom.searchOverlay.classList.remove('open');
                    }, 320);
                }
            });
        }

        // Filter pills
        this.dom.filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                this.dom.filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                this.state.filterStatus = pill.dataset.status;
                this._renderLibrary();
            });
        });

        // Sort select
        if (this.dom.sortSelect) {
            this.dom.sortSelect.addEventListener('change', e => {
                this.state.sortBy = e.target.value;
                this._renderLibrary();
            });
        }

        // Modal close
        if (this.dom.modalClose) {
            this.dom.modalClose.addEventListener('click', () => this._closeModal());
        }
        if (this.dom.modalBackdrop) {
            this.dom.modalBackdrop.addEventListener('click', () => this._closeModal());
        }
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && this._modalOpen) this._closeModal();
        });
    }

    // ── HELPERS ───────────────────────────────────────────────────────────────
    _statusLabel(item) {
        if (item.status === 'playing') return item.type === 'game' ? 'Playing' : 'Watching';
        return item.status.charAt(0).toUpperCase() + item.status.slice(1);
    }

    _esc(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}

// ─── BOOT ─────────────────────────────────────────────────────────────────────
const app = new MediaApp();

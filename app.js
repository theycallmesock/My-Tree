/**
 * THE CURATOR - ZERO PERSISTENCE ENGINE
 * Forces dynamic loading, fully preserves required items, fixes mobile bugs.
 */

// Fallback image generator to ensure layout NEVER breaks
const getFallbackImage = (title) => {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900"><rect fill="%2318181b" width="600" height="900"/><text fill="%2394a3b8" font-family="sans-serif" font-size="24" font-weight="bold" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Missing Art</text></svg>`;
};

// 1. MASTER DATABASE - ALL ORIGINAL DATA RETAINED
const rawMediaData = [
    // --- GAMES ---
    { id: "101", title: "Bloodborne", type: "game", status: "playing", rating: 9.5, image: "https://upload.wikimedia.org/wikipedia/en/6/68/Bloodborne_Cover_Wallpaper.jpg", genres: ["Souls-like", "Action RPG"], releaseYear: 2015, notes: "The atmosphere in Yharnam is unmatched. A masterpiece of environmental storytelling." },
    { id: "102", title: "God of War (2018)", type: "game", status: "completed", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/library_600x900.jpg", releaseYear: 2018, notes: "Incredible soft reboot. The Leviathan axe mechanics feel weighty and satisfying." },
    { id: "103", title: "The Last of Us Part I", type: "game", status: "playing", rating: 9.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/library_600x900.jpg", genres: ["Narrative", "Survival"] },
    { id: "104", title: "Ghost of Tsushima", type: "game", status: "dropped", rating: 6.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/library_600x900.jpg" },
    { id: "105", title: "Horizon Zero Dawn", type: "game", status: "dropped", rating: 5.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/library_600x900.jpg" },
    { id: "106", title: "Forza Horizon 5", type: "game", status: "completed", rating: 6.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/library_600x900.jpg", genres: ["Racing", "Open World"] },
    { id: "107", title: "The Witcher 3: Wild Hunt", type: "game", status: "completed", rating: 7.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/library_600x900.jpg", releaseYear: 2015 },
    { id: "108", title: "Red Dead Redemption 2", type: "game", status: "completed", rating: 9.3, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900.jpg", genres: ["Open World", "Narrative"], releaseYear: 2018, notes: "Arthur Morgan's journey is a masterpiece of storytelling. The open world feels remarkably alive." },
    { id: "109", title: "Grand Theft Auto V", type: "game", status: "completed", rating: 7.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg" },
    { id: "110", title: "Cyberpunk 2077", type: "game", status: "completed", rating: 9.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg", genres: ["RPG", "Cyberpunk"], releaseYear: 2020 },
    { id: "111", title: "The Elder Scrolls V: Skyrim", type: "game", status: "dropped", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/489830/library_600x900.jpg" },
    { id: "112", title: "Half-Life 2", type: "game", status: "completed", rating: 9.6, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/library_600x900.jpg" },
    { id: "113", title: "Portal 2", type: "game", status: "completed", rating: 8.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/library_600x900.jpg" },
    { id: "114", title: "Dishonored", type: "game", status: "completed", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/205100/library_600x900.jpg" },
    { id: "115", title: "Dark Souls", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570940/library_600x900.jpg", genres: ["Action RPG", "Dark Fantasy"] },
    { id: "116", title: "Dark Souls III", type: "game", status: "completed", rating: 9.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/library_600x900.jpg" },
    { id: "117", title: "Elden Ring", type: "game", status: "completed", rating: 9.9, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900.jpg", genres: ["Open World", "Action RPG"] },
    { id: "118", title: "Sekiro: Shadows Die Twice", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/814380/library_600x900.jpg" },
    { id: "119", title: "Baldur's Gate 3", type: "game", status: "dropped", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/library_600x900.jpg" },
    { id: "120", title: "World of Warcraft: Wotlk", type: "game", status: "completed", rating: 9.5, image: "https://upload.wikimedia.org/wikipedia/en/e/e5/World_of_Warcraft_Wrath_of_the_Lich_King_box_art.jpg", genres: ["MMORPG"] },
    { id: "121", title: "Genshin Impact", type: "game", status: "dropped", rating: 0, image: "https://upload.wikimedia.org/wikipedia/en/5/5d/Genshin_Impact_logo.png" },
    { id: "122", title: "Terraria", type: "game", status: "completed", rating: 7.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/library_600x900.jpg" },
    { id: "123", title: "Minecraft", type: "game", status: "completed", rating: 8.5, image: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png" },
    { id: "124", title: "Outer Wilds", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/library_600x900.jpg", genres: ["Exploration", "Puzzle"] },
    { id: "125", title: "StarCraft II", type: "game", status: "completed", rating: 8.0, image: "https://upload.wikimedia.org/wikipedia/en/2/20/StarCraft_II_-_Box_Art.jpg" },
    { id: "126", title: "Counter-Strike 2", type: "game", status: "playing", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/library_600x900.jpg", genres: ["FPS", "Competitive"] },
    { id: "127", title: "Valorant", type: "game", status: "playing", rating: 8.4, image: "https://upload.wikimedia.org/wikipedia/en/a/ab/Valorant_cover_art.jpg" },
    { id: "128", title: "League of Legends", type: "game", status: "playing", rating: 0, image: "https://upload.wikimedia.org/wikipedia/en/7/77/League_of_Legends_logo.png" },
    { id: "129", title: "Fortnite", type: "game", status: "playing", rating: 9.9, image: "https://upload.wikimedia.org/wikipedia/en/a/a8/FortniteCoverArt.jpg" },
    { id: "130", title: "Overwatch 2", type: "game", status: "dropped", rating: 1.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2356500/library_600x900.jpg" },
    { id: "131", title: "Rocket League", type: "game", status: "dropped", rating: 4.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252950/library_600x900.jpg" },
    { id: "132", title: "Tom Clancy's Rainbow Six Siege", type: "game", status: "dropped", rating: 6.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359550/library_600x900.jpg" },
    { id: "133", title: "Call of Duty: Warzone", type: "game", status: "dropped", rating: 6.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1962660/library_600x900.jpg" },
    { id: "134", title: "Super Mario 64", type: "game", status: "completed", rating: 8.0, image: "https://upload.wikimedia.org/wikipedia/en/6/6a/Super_Mario_64_box_cover.jpg", genres: ["Platformer", "Classic"] },
    { id: "135", title: "Dark Souls II: Scholar of the First Sin", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/335300/library_600x900.jpg" },
    { id: "136", title: "Lies of P", type: "game", status: "playing", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1627720/library_600x900.jpg" },
    { id: "137", title: "Nioh", type: "game", status: "dropped", rating: 3.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/485510/library_600x900.jpg" },
    { id: "138", title: "Sifu", type: "game", status: "completed", rating: 7.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2138710/library_600x900.jpg" },
    { id: "139", title: "Cyberpunk 2077: Phantom Liberty", type: "game", status: "completed", rating: 9.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2138330/library_600x900.jpg" },
    { id: "140", title: "Hell Let Loose", type: "game", status: "dropped", rating: 5.6, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/686810/library_600x900.jpg" },
    { id: "141", title: "Far Cry 3", type: "game", status: "completed", rating: 9.7, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220240/library_600x900.jpg" },
    { id: "142", title: "Deep Rock Galactic", type: "game", status: "dropped", rating: 6.7, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/548430/library_600x900.jpg" },
    { id: "143", title: "Alien: Isolation", type: "game", status: "completed", rating: 8.7, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/library_600x900.jpg" },
    { id: "144", title: "Outlast", type: "game", status: "completed", rating: 9.3, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238320/library_600x900.jpg", genres: ["Horror"] },
    { id: "145", title: "Phasmophobia", type: "game", status: "dropped", rating: 3.2, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/739630/library_600x900.jpg" },
    { id: "146", title: "Valheim", type: "game", status: "dropped", rating: 6.9, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/892970/library_600x900.jpg" },
    { id: "147", title: "The Forest", type: "game", status: "completed", rating: 7.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242760/library_600x900.jpg" },
    { id: "148", title: "Sons of the Forest", type: "game", status: "dropped", rating: 6.2, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1326470/library_600x900.jpg" },
    { id: "149", title: "Hearts of Iron IV", type: "game", status: "playing", rating: 5.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/394360/library_600x900.jpg" },
    { id: "150", title: "Black Myth: Wukong", type: "game", status: "playing", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/library_600x900.jpg" },
    { id: "151", title: "Nioh 2", type: "game", status: "dropped", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1301210/library_600x900.jpg" },
    { id: "152", title: "Batman: Arkham Knight", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/208650/library_600x900.jpg" },
    { id: "153", title: "God of War Ragnarök", type: "game", status: "completed", rating: 8.3, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/library_600x900.jpg" },
    { id: "154", title: "Hogwarts Legacy", type: "game", status: "dropped", rating: 4.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/library_600x900.jpg" },
    { id: "155", title: "Rise of the Tomb Raider", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/391220/library_600x900.jpg" },
    { id: "156", title: "Shadow of the Tomb Raider", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/750920/library_600x900.jpg" },
    { id: "157", title: "Tomb Raider (2013)", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/203160/library_600x900.jpg" },
    { id: "158", title: "Red Dead Redemption", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2668510/library_600x900.jpg" },
    { id: "159", title: "Infamous Second Son", type: "game", status: "planned", rating: 0, image: "https://upload.wikimedia.org/wikipedia/en/b/b6/Infamous_Second_Son_cover.jpg" },
    { id: "160", title: "Half-Life", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/library_600x900.jpg" },
    { id: "161", title: "Black Mesa", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/362890/library_600x900.jpg" },
    { id: "162", title: "Call of Duty: Modern Warfare (2019)", type: "game", status: "dropped", rating: 3.5, image: "https://upload.wikimedia.org/wikipedia/en/e/e9/CallofDutyModernWarfare%282019%29.jpg" },
    { id: "163", title: "Call of Duty: Black Ops Cold War", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1985810/library_600x900.jpg" },
    { id: "164", title: "Green Hell", type: "game", status: "completed", rating: 4.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/815370/library_600x900.jpg" },
    { id: "165", title: "Raft", type: "game", status: "dropped", rating: 5.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/648800/library_600x900.jpg" },
    { id: "166", title: "Don't Starve Together", type: "game", status: "dropped", rating: 3.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/library_600x900.jpg" },
    { id: "167", title: "Hollow Knight", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/library_600x900.jpg" },
    { id: "168", title: "Firewatch", type: "game", status: "completed", rating: 9.1, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/383870/library_600x900.jpg" },
    { id: "169", title: "SOMA", type: "game", status: "completed", rating: 9.6, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/282140/library_600x900.jpg" },
    { id: "170", title: "It Takes Two", type: "game", status: "completed", rating: 8.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1426210/library_600x900.jpg" },
    { id: "171", title: "A Way Out", type: "game", status: "completed", rating: 9.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222700/library_600x900.jpg" },
    { id: "172", title: "Little Nightmares", type: "game", status: "completed", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/424840/library_600x900.jpg" },
    { id: "173", title: "Little Nightmares II", type: "game", status: "completed", rating: 8.2, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/860510/library_600x900.jpg" },
    { id: "174", title: "Elden Ring: Shadow of the Erdtree", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2778580/library_600x900.jpg" },
    { id: "175", title: "Assassin's Creed I", type: "game", status: "completed", rating: 7.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/15100/library_600x900.jpg" },
    { id: "176", title: "Assassin's Creed II", type: "game", status: "completed", rating: 9.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/33230/library_600x900.jpg" },
    { id: "177", title: "Assassin's Creed Brotherhood", type: "game", status: "playing", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/48190/library_600x900.jpg" },
    { id: "178", title: "Assassin's Creed III", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/208480/library_600x900.jpg" },
    { id: "179", title: "Assassin's Creed Revelations", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/201870/library_600x900.jpg" },
    { id: "180", title: "Lethal Company", type: "game", status: "playing", rating: 6.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1966720/library_600x900.jpg" },
    { id: "181", title: "Brawlhalla", type: "game", status: "dropped", rating: 4.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/329860/library_600x900.jpg" },
    { id: "182", title: "Goat Simulator 3", type: "game", status: "completed", rating: 5.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2144740/library_600x900.jpg" },
    
    // --- ANIME / TV ---
    { id: "901", title: "Attack on Titan", type: "anime", status: "completed", rating: 9.8, image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Shingeki_no_Kyojin_manga_volume_1.jpg", genres: ["Action", "Dark Fantasy"], releaseYear: 2013, notes: "Masterpiece of foreshadowing. Flawless narrative structure." },
    { id: "902", title: "Jujutsu Kaisen", type: "anime", status: "playing", rating: 8.5, image: "https://upload.wikimedia.org/wikipedia/en/4/46/Jujutsu_kaisen.jpg", genres: ["Action", "Supernatural"] },
    { id: "903", title: "Death Note", type: "anime", status: "completed", rating: 9.0, image: "https://upload.wikimedia.org/wikipedia/en/6/6f/Death_Note_Vol_1.jpg", genres: ["Psychological Thriller"] },
    { id: "904", title: "Arcane", type: "tv", status: "completed", rating: 10.0, image: "https://upload.wikimedia.org/wikipedia/en/a/a6/Arcane_League_of_Legends_Season_1_poster.jpg", genres: ["Sci-Fi", "Action"], releaseYear: 2021, notes: "The gold standard for video game adaptations. Animation is groundbreaking." },
    
    // --- MOVIES ---
    { id: "801", title: "Interstellar", type: "movies", status: "completed", rating: 10.0, image: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg", genres: ["Sci-Fi", "Drama"], releaseYear: 2014, notes: "Visually stunning. Zimmer's score is transcendental." },
    { id: "802", title: "Dune: Part Two", type: "movies", status: "completed", rating: 9.5, image: "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_Part_Two_poster.jpg", genres: ["Sci-Fi", "Epic"], releaseYear: 2024 }
];

// 2. DATA NORMALIZER
class DataNormalizer {
    static parse(dataArray) {
        return dataArray.map(item => ({
            id: String(item.id || Math.random().toString(36).substr(2, 9)),
            title: item.title || "Unknown Title",
            type: (item.type || "unknown").toLowerCase(),
            status: this.normalizeStatus(item.status),
            rating: Number(item.rating) || 0,
            image: item.image || getFallbackImage("Missing Art"),
            genres: Array.isArray(item.genres) ? item.genres : [],
            releaseYear: item.releaseYear || "",
            notes: item.notes || ""
        }));
    }

    static normalizeStatus(status) {
        const s = String(status).toLowerCase();
        if (s === 'watching') return 'playing'; 
        if (['playing', 'completed', 'planned', 'dropped'].includes(s)) return s;
        return 'planned';
    }
}

// 3. APPLICATION CONTROLLER
class MediaApp {
    constructor() {
        this.data = DataNormalizer.parse(rawMediaData);
        this.state = {
            currentView: 'dashboard',
            libraryType: 'games',
            searchQuery: '',
            filterStatus: 'all',
            sortBy: 'newest'
        };
        
        this.DOM = {
            loader: document.getElementById('app-loader'),
            viewsContainer: document.getElementById('views-container'),
            search: document.getElementById('global-search'),
            clearSearch: document.getElementById('clear-search'),
            modal: document.getElementById('media-modal')
        };

        this.init();
    }

    init() {
        this.bindEvents();
        setTimeout(() => {
            this.DOM.loader.style.opacity = '0';
            setTimeout(() => this.DOM.loader.classList.add('hidden'), 500);
            this.switchView('dashboard');
        }, 300);
    }

    switchView(viewId) {
        this.state.currentView = viewId;
        
        document.querySelectorAll('.nav-links li').forEach(el => el.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links li[data-view="${viewId}"]`);
        if(activeLink) activeLink.classList.add('active');

        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        
        if (['games', 'anime', 'movies', 'tv'].includes(viewId)) {
            this.state.libraryType = viewId;
            document.getElementById('view-library').classList.add('active');
            
            this.state.filterStatus = 'all';
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.status === 'all');
            });
            this.state.searchQuery = '';
            this.DOM.search.value = '';
            this.DOM.clearSearch.classList.add('hidden');
            
            this.renderLibrary();
        } else {
            document.getElementById(`view-${viewId}`).classList.add('active');
            if (viewId === 'dashboard') this.renderDashboard();
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderDashboard() {
        const typeCount = { game: 0, anime: 0, movies: 0, tv: 0 };
        let totalRating = 0, ratedCount = 0;

        this.data.forEach(item => {
            if(typeCount[item.type] !== undefined) typeCount[item.type]++;
            if(item.rating > 0) {
                totalRating += item.rating;
                ratedCount++;
            }
        });

        const avgRating = ratedCount > 0 ? (totalRating / ratedCount).toFixed(1) : '0.0';
        const totalWatch = typeCount.anime + typeCount.movies + typeCount.tv;

        document.getElementById('dashboard-stats').innerHTML = `
            <div class="stat-card glass-panel">
                <div class="stat-icon" style="background: rgba(99,102,241,0.1); color: var(--accent);"><i class="ph-fill ph-game-controller"></i></div>
                <div class="stat-details"><h3>Games</h3><p>${typeCount.game}</p></div>
            </div>
            <div class="stat-card glass-panel">
                <div class="stat-icon" style="background: rgba(16,185,129,0.1); color: var(--status-completed);"><i class="ph-fill ph-television-simple"></i></div>
                <div class="stat-details"><h3>Shows & Films</h3><p>${totalWatch}</p></div>
            </div>
            <div class="stat-card glass-panel">
                <div class="stat-icon" style="background: rgba(251,191,36,0.1); color: #fbbf24;"><i class="ph-fill ph-star"></i></div>
                <div class="stat-details"><h3>Avg Rating</h3><p>${avgRating}</p></div>
            </div>
        `;

        const spotlightCandidates = this.data.filter(d => d.type === 'game' && d.status === 'completed' && d.rating >= 9.5);
        const spotlightItem = spotlightCandidates.length > 0 
            ? spotlightCandidates[Math.floor(Math.random() * spotlightCandidates.length)] 
            : this.data[0];

        if (spotlightItem) {
            document.getElementById('hero-spotlight').innerHTML = `
                <div class="hero-spotlight-inner" onclick="app.openModal('${spotlightItem.id}')">
                    <img src="${spotlightItem.image}" class="hero-bg" alt="Hero" onerror="this.src='${getFallbackImage()}'">
                    <div class="hero-overlay"></div>
                    <div class="hero-content">
                        <span class="hero-tag"><i class="ph-fill ph-star"></i> Curator's Choice</span>
                        <h1 class="hero-title">${spotlightItem.title}</h1>
                        <p class="hero-desc">${spotlightItem.notes || "A defining experience in the archive."}</p>
                    </div>
                </div>
            `;
        }

        const recentItems = [...this.data].reverse().slice(0, 10);
        this.renderGrid(recentItems, 'recent-grid');
    }

    renderLibrary() {
        const typeMap = {
            'games': { title: 'Game Archive', desc: 'Interactive experiences and reviews.' },
            'anime': { title: 'Anime Series', desc: 'Episodic animated narratives.' },
            'movies': { title: 'Film Library', desc: 'Cinematic reviews and ratings.' },
            'tv': { title: 'TV Shows', desc: 'Live action episodic narratives.' }
        };
        
        document.getElementById('library-title').textContent = typeMap[this.state.libraryType].title;
        document.getElementById('library-subtitle').textContent = typeMap[this.state.libraryType].desc;

        let filtered = this.data.filter(item => item.type === this.state.libraryType);
        
        if (this.state.filterStatus !== 'all') {
            filtered = filtered.filter(item => {
                if (this.state.filterStatus === 'active') return item.status === 'playing';
                return item.status === this.state.filterStatus;
            });
        }

        if (this.state.searchQuery) {
            const q = this.state.searchQuery.toLowerCase();
            filtered = filtered.filter(item => 
                item.title.toLowerCase().includes(q) || 
                item.genres.some(g => g.toLowerCase().includes(q)) ||
                (item.releaseYear && item.releaseYear.toString().includes(q))
            );
        }

        filtered.sort((a, b) => {
            switch(this.state.sortBy) {
                case 'rating-high': return b.rating - a.rating;
                case 'rating-low': return (a.rating === 0 ? 99 : a.rating) - (b.rating === 0 ? 99 : b.rating);
                case 'title-asc': return a.title.localeCompare(b.title);
                case 'title-desc': return b.title.localeCompare(a.title);
                default: return 0; 
            }
        });

        this.renderGrid(filtered, 'library-grid', true);
    }

    renderGrid(items, containerId, checkEmpty = false) {
        const container = document.getElementById(containerId);
        const emptyState = document.getElementById('empty-state');
        
        container.innerHTML = '';
        
        if (items.length === 0) {
            if (checkEmpty && emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (checkEmpty && emptyState) emptyState.classList.add('hidden');
        
        const fragment = document.createDocumentFragment();
        
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card fade-in';
            card.onclick = () => this.openModal(item.id);
            
            let statusText = item.status;
            if (item.status === 'playing') {
                statusText = item.type === 'game' ? 'Playing' : 'Watching';
            }
            
            card.innerHTML = `
                <div class="card-img-wrap">
                    <span class="card-status status-${item.status}">${statusText}</span>
                    <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='${getFallbackImage()}'">
                    <div class="card-overlay">
                        ${item.genres.length > 0 ? `<span class="card-primary-genre">${item.genres[0]}</span>` : ''}
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="card-title" title="${item.title}">${item.title}</h3>
                    <div class="card-meta">
                        <span class="card-year">${item.releaseYear || ''}</span>
                        <div class="card-rating">
                            ${item.rating > 0 ? `<i class="ph-fill ph-star"></i> ${item.rating.toFixed(1)}` : '<span class="unrated">Unrated</span>'}
                        </div>
                    </div>
                </div>
            `;
            fragment.appendChild(card);
        });

        container.appendChild(fragment);
    }

    openModal(id) {
        const item = this.data.find(d => d.id === id);
        if (!item) return;

        const bannerImg = document.getElementById('modal-banner');
        const coverImg = document.getElementById('modal-cover');
        
        bannerImg.src = item.image;
        coverImg.src = item.image;
        
        bannerImg.onerror = function() { this.src = getFallbackImage(); };
        coverImg.onerror = function() { this.src = getFallbackImage(); };

        document.getElementById('modal-title').textContent = item.title;
        
        let statusText = item.status;
        if(item.status === 'playing') statusText = item.type === 'game' ? 'Playing' : 'Watching';
        
        const statusEl = document.getElementById('modal-status');
        statusEl.textContent = statusText;
        statusEl.className = `status-badge status-${item.status}`;
        
        document.getElementById('modal-rating').textContent = item.rating > 0 ? `${item.rating.toFixed(1)} / 10` : 'Unrated';
        
        const yearEl = document.getElementById('modal-year');
        if (item.releaseYear) {
            yearEl.classList.remove('hidden');
            yearEl.querySelector('span').textContent = item.releaseYear;
        } else {
            yearEl.classList.add('hidden');
        }

        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = `<span class="hero-tag type-tag">${item.type.toUpperCase()}</span>`;
        item.genres.forEach(g => {
            tagsContainer.innerHTML += `<span class="hero-tag genre-tag">${g}</span>`;
        });

        const notesDisplay = document.getElementById('modal-notes');
        if (item.notes) {
            notesDisplay.innerHTML = `<p>${item.notes}</p>`;
        } else {
            notesDisplay.innerHTML = `<p class="empty-notes">No detailed review provided for this entry yet.</p>`;
        }

        const actionZone = document.getElementById('modal-action-zone');
        if (['movies', 'anime', 'tv'].includes(item.type)) {
            actionZone.innerHTML = `
                <a href="https://MOVIE-PLACEHOLDER.COM" target="_blank" rel="noopener noreferrer" class="action-btn primary full-width mt-1">
                    <i class="ph-fill ph-play-circle"></i> Watch
                </a>
            `;
        } else if (item.type === 'game') {
            actionZone.innerHTML = `
                <a href="https://GAME-DOWNLOAD-PLACEHOLDER.COM" target="_blank" rel="noopener noreferrer" class="action-btn magnet-btn full-width mt-1">
                    <i class="ph-fill ph-magnet"></i> Magnet Download
                </a>
                <p class="download-req-text">Requires Free Download Manager</p>
            `;
        } else {
            actionZone.innerHTML = '';
        }

        this.DOM.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.DOM.modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            document.getElementById('modal-banner').src = '';
            document.getElementById('modal-cover').src = '';
        }, 300);
    }

    bindEvents() {
        document.querySelectorAll('.nav-links li').forEach(link => {
            link.addEventListener('click', (e) => this.switchView(e.currentTarget.dataset.view));
        });

        document.querySelectorAll('.view-all-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchView(e.currentTarget.dataset.target));
        });

        let searchTimeout;
        this.DOM.search.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            this.state.searchQuery = e.target.value;
            this.DOM.clearSearch.classList.toggle('hidden', !this.state.searchQuery);

            searchTimeout = setTimeout(() => {
                if(this.state.currentView === 'dashboard' || this.state.currentView === 'socials') {
                    this.switchView('games'); 
                } else {
                    this.renderLibrary();
                }
            }, 300);
        });

        this.DOM.clearSearch.addEventListener('click', () => {
            this.DOM.search.value = '';
            this.state.searchQuery = '';
            this.DOM.clearSearch.classList.add('hidden');
            if (['games', 'anime', 'movies', 'tv'].includes(this.state.currentView)) this.renderLibrary();
        });

        document.querySelectorAll('#library-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('#library-filters .filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.state.filterStatus = e.target.dataset.status;
                this.renderLibrary();
            });
        });

        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.state.sortBy = e.target.value;
            this.renderLibrary();
        });

        document.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
        document.querySelector('.modal-backdrop').addEventListener('click', () => this.closeModal());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.DOM.modal.classList.contains('active')) this.closeModal();
        });
    }
}

const app = new MediaApp();

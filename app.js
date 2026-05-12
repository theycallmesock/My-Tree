/**
 * MEDIA SHOWCASE PLATFORM - CORE ENGINE
 * Version: 3.0.0
 * Architecture: MVC-inspired, State-Driven UI, Resilient Data Pipeline
 */

// ============================================================================
// 1. DATA PIPELINE & NORMALIZATION
// ============================================================================

// The immutable baseline dataset. We restore ALL items and expand to support Movies/TV.
const rawMediaData = [
    // --- GAMES ---
    { id: "101", title: "Bloodborne", type: "game", status: "playing", rating: 0, image: "https://upload.wikimedia.org/wikipedia/en/6/68/Bloodborne_Cover_Wallpaper.jpg", genres: ["Souls-like", "Action RPG"] },
    { id: "102", title: "God of War (2018)", type: "game", status: "completed", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/library_600x900.jpg", releaseYear: 2018 },
    { id: "103", title: "The Last of Us Part I", type: "game", status: "playing", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/library_600x900.jpg" },
    { id: "104", title: "Ghost of Tsushima", type: "game", status: "dropped", rating: 6.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/library_600x900.jpg" },
    { id: "105", title: "Horizon Zero Dawn", type: "game", status: "dropped", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/library_600x900.jpg" },
    { id: "106", title: "Forza Horizon 5", type: "game", status: "completed", rating: 6.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/library_600x900.jpg" },
    { id: "107", title: "The Witcher 3: Wild Hunt", type: "game", status: "completed", rating: 7.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/library_600x900.jpg" },
    { id: "108", title: "Red Dead Redemption 2", type: "game", status: "completed", rating: 9.3, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900.jpg", genres: ["Open World", "Narrative"] },
    { id: "109", title: "Grand Theft Auto V", type: "game", status: "completed", rating: 7.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg" },
    { id: "110", title: "Cyberpunk 2077", type: "game", status: "completed", rating: 9.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg" },
    { id: "111", title: "The Elder Scrolls V: Skyrim", type: "game", status: "dropped", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/489830/library_600x900.jpg" },
    { id: "112", title: "Half-Life 2", type: "game", status: "completed", rating: 9.6, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/library_600x900.jpg" },
    { id: "113", title: "Portal 2", type: "game", status: "completed", rating: 8.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/library_600x900.jpg" },
    { id: "114", title: "Dishonored", type: "game", status: "completed", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/205100/library_600x900.jpg" },
    { id: "115", title: "Dark Souls", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570940/library_600x900.jpg" },
    { id: "116", title: "Dark Souls III", type: "game", status: "completed", rating: 9.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/library_600x900.jpg" },
    { id: "117", title: "Elden Ring", type: "game", status: "completed", rating: 9.9, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900.jpg" },
    { id: "118", title: "Sekiro: Shadows Die Twice", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/814380/library_600x900.jpg" },
    { id: "119", title: "Baldur's Gate 3", type: "game", status: "dropped", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/library_600x900.jpg" },
    { id: "120", title: "World of Warcraft: Wotlk", type: "game", status: "completed", rating: 9.5, image: "https://upload.wikimedia.org/wikipedia/en/e/e5/World_of_Warcraft_Wrath_of_the_Lich_King_box_art.jpg" },
    { id: "121", title: "Genshin Impact", type: "game", status: "dropped", rating: 0, image: "https://upload.wikimedia.org/wikipedia/en/5/5d/Genshin_Impact_logo.png" },
    { id: "122", title: "Terraria", type: "game", status: "completed", rating: 7.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/library_600x900.jpg" },
    { id: "123", title: "Minecraft", type: "game", status: "completed", rating: 8.5, image: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png" },
    { id: "124", title: "Outer Wilds", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/library_600x900.jpg" },
    { id: "125", title: "StarCraft II", type: "game", status: "completed", rating: 8.0, image: "https://upload.wikimedia.org/wikipedia/en/2/20/StarCraft_II_-_Box_Art.jpg" },
    { id: "126", title: "Counter-Strike 2", type: "game", status: "playing", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/library_600x900.jpg" },
    { id: "127", title: "Valorant", type: "game", status: "playing", rating: 8.4, image: "https://upload.wikimedia.org/wikipedia/en/a/ab/Valorant_cover_art.jpg" },
    { id: "128", title: "League of Legends", type: "game", status: "playing", rating: 0, image: "https://upload.wikimedia.org/wikipedia/en/7/77/League_of_Legends_logo.png" },
    { id: "129", title: "Fortnite", type: "game", status: "playing", rating: 9.9, image: "https://upload.wikimedia.org/wikipedia/en/a/a8/FortniteCoverArt.jpg" },
    { id: "130", title: "Overwatch 2", type: "game", status: "dropped", rating: 1.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2356500/library_600x900.jpg" },
    { id: "131", title: "Rocket League", type: "game", status: "dropped", rating: 4.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252950/library_600x900.jpg" },
    { id: "132", title: "Tom Clancy's Rainbow Six Siege", type: "game", status: "dropped", rating: 6.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359550/library_600x900.jpg" },
    { id: "133", title: "Call of Duty: Warzone", type: "game", status: "dropped", rating: 6.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1962660/library_600x900.jpg" },
    { id: "134", title: "Super Mario 64", type: "game", status: "completed", rating: 8.0, image: "https://upload.wikimedia.org/wikipedia/en/6/6a/Super_Mario_64_box_cover.jpg" },
    { id: "135", title: "Dark Souls II: Scholar of the First Sin", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/335300/library_600x900.jpg" },
    { id: "136", title: "Lies of P", type: "game", status: "playing", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1627720/library_600x900.jpg" },
    { id: "137", title: "Nioh", type: "game", status: "dropped", rating: 3.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/485510/library_600x900.jpg" },
    { id: "138", title: "Sifu", type: "game", status: "completed", rating: 7.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2138710/library_600x900.jpg" },
    { id: "139", title: "Cyberpunk 2077: Phantom Liberty", type: "game", status: "completed", rating: 9.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2138330/library_600x900.jpg" },
    { id: "140", title: "Hell Let Loose", type: "game", status: "dropped", rating: 5.6, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/686810/library_600x900.jpg" },
    { id: "141", title: "Far Cry 3", type: "game", status: "completed", rating: 9.7, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220240/library_600x900.jpg" },
    { id: "142", title: "Deep Rock Galactic", type: "game", status: "dropped", rating: 6.7, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/548430/library_600x900.jpg" },
    { id: "143", title: "Alien: Isolation", type: "game", status: "completed", rating: 8.7, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/library_600x900.jpg" },
    { id: "144", title: "Outlast", type: "game", status: "completed", rating: 9.3, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238320/library_600x900.jpg" },
    { id: "145", title: "Phasmophobia", type: "game", status: "dropped", rating: 3.2, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/739630/library_600x900.jpg" },
    { id: "146", title: "Valheim", type: "game", status: "dropped", rating: 6.9, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/892970/library_600x900.jpg" },
    { id: "147", title: "The Forest", type: "game", status: "completed", rating: 7.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242760/library_600x900.jpg" },
    { id: "148", title: "Sons of the Forest", type: "game", status: "dropped", rating: 6.2, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1326470/library_600x900.jpg" },
    { id: "149", title: "Hearts of Iron IV", type: "game", status: "playing", rating: 5.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/394360/library_600x900.jpg" },
    { id: "150", title: "Black Myth: Wukong", type: "game", status: "playing", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/library_600x900.jpg" },
    { id: "153", title: "God of War Ragnarök", type: "game", status: "completed", rating: 8.3, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/library_600x900.jpg" },
    { id: "160", title: "Half-Life", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/library_600x900.jpg" },
    { id: "168", title: "Firewatch", type: "game", status: "completed", rating: 9.1, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/383870/library_600x900.jpg" },
    { id: "174", title: "Elden Ring: Shadow of the Erdtree", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2778580/library_600x900.jpg" },
    
    // --- ANIME / TV ---
    { id: "901", title: "Attack on Titan", type: "anime", status: "completed", rating: 9.8, image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Shingeki_no_Kyojin_manga_volume_1.jpg", genres: ["Action", "Dark Fantasy"], releaseYear: 2013 },
    { id: "902", title: "Jujutsu Kaisen", type: "anime", status: "playing", rating: 8.5, image: "https://upload.wikimedia.org/wikipedia/en/4/46/Jujutsu_kaisen.jpg", genres: ["Action", "Supernatural"] },
    { id: "903", title: "Death Note", type: "anime", status: "completed", rating: 9.0, image: "https://upload.wikimedia.org/wikipedia/en/6/6f/Death_Note_Vol_1.jpg", genres: ["Psychological Thriller"] },
    { id: "904", title: "Arcane", type: "anime", status: "completed", rating: 10.0, image: "https://upload.wikimedia.org/wikipedia/en/a/a6/Arcane_League_of_Legends_Season_1_poster.jpg", genres: ["Sci-Fi", "Action"] },
    
    // --- MOVIES ---
    { id: "801", title: "Interstellar", type: "movies", status: "completed", rating: 10.0, image: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg", genres: ["Sci-Fi", "Drama"], releaseYear: 2014 },
    { id: "802", title: "Dune: Part Two", type: "movies", status: "completed", rating: 9.5, image: "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_Part_Two_poster.jpg", genres: ["Sci-Fi", "Epic"], releaseYear: 2024 }
];

// Prevents crashes by ensuring every object has required fields
class DataNormalizer {
    static parse(dataArray) {
        return dataArray.map(item => ({
            id: String(item.id || Math.random().toString(36).substr(2, 9)),
            title: item.title || "Unknown Title",
            type: (item.type || "unknown").toLowerCase(),
            status: this.normalizeStatus(item.status),
            rating: Number(item.rating) || 0,
            image: item.image || "https://via.placeholder.com/300x450/18181b/ffffff?text=Image+Missing",
            genres: Array.isArray(item.genres) ? item.genres : [],
            releaseYear: item.releaseYear || "",
            notes: item.notes || ""
        }));
    }

    static normalizeStatus(status) {
        const s = String(status).toLowerCase();
        // Map 'watching' to 'playing' so we only deal with one core active status in logic
        if (s === 'watching') return 'playing'; 
        if (['playing', 'completed', 'planned', 'dropped'].includes(s)) return s;
        return 'planned'; // Safe fallback
    }
}

// ============================================================================
// 2. RESILIENT STORAGE ENGINE & MIGRATION
// ============================================================================

class StorageEngine {
    constructor() {
        this.CURRENT_KEY = 'showcase_db_v3';
        this.LEGACY_KEYS = ['media_showcase_userdata_v2', 'media_showcase_data', 'my_media_tracker'];
        
        this.migrateLegacyData();
        this.userData = this.load();
    }

    // Scans local storage for old structures and ports them over to prevent data loss
    migrateLegacyData() {
        let legacyDataFound = false;
        let mergedLegacy = {};

        this.LEGACY_KEYS.forEach(key => {
            try {
                const oldData = localStorage.getItem(key);
                if (oldData) {
                    const parsed = JSON.parse(oldData);
                    mergedLegacy = { ...mergedLegacy, ...parsed };
                    legacyDataFound = true;
                    // We don't delete legacy yet, just in case migration fails
                }
            } catch (e) {
                console.warn(`Failed to parse legacy key: ${key}`);
            }
        });

        if (legacyDataFound) {
            const currentData = this.load();
            // Merge prioritizing current data, but keeping legacy where current is empty
            const finalMerge = { ...mergedLegacy, ...currentData };
            localStorage.setItem(this.CURRENT_KEY, JSON.stringify(finalMerge));
            
            // Safe cleanup
            this.LEGACY_KEYS.forEach(key => localStorage.removeItem(key));
            console.log("Legacy data successfully migrated to v3 schema.");
        }
    }

    load() {
        try {
            const data = localStorage.getItem(this.CURRENT_KEY);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.error("Storage corruption detected. Initializing fresh DB.", e);
            return {};
        }
    }

    save() {
        localStorage.setItem(this.CURRENT_KEY, JSON.stringify(this.userData));
    }

    updateItem(id, updates) {
        if (!this.userData[id]) this.userData[id] = {};
        this.userData[id] = { ...this.userData[id], ...updates };
        this.save();
    }

    // Combines hardcoded baseline with user overrides
    hydrate(baseDataArray) {
        const normalizedBase = DataNormalizer.parse(baseDataArray);
        return normalizedBase.map(item => {
            if (this.userData[item.id]) {
                return { ...item, ...this.userData[item.id] }; 
            }
            return item;
        });
    }

    nuke() {
        localStorage.removeItem(this.CURRENT_KEY);
        this.userData = {};
        window.location.reload();
    }
}

// ============================================================================
// 3. UI UTILITIES
// ============================================================================

const Toast = {
    show(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if(!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'ph-check-circle' : (type === 'error' ? 'ph-warning-circle' : 'ph-info');
        toast.innerHTML = `<i class="ph-fill ${icon}"></i> <span>${message}</span>`;
        
        container.appendChild(toast);
        
        // Trigger reflow for animation
        void toast.offsetWidth;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300); // Wait for transition
        }, 3500);
    }
};

// ============================================================================
// 4. CORE APPLICATION CONTROLLER
// ============================================================================

class MediaApp {
    constructor() {
        this.storage = new StorageEngine();
        this.data = this.storage.hydrate(rawMediaData);
        
        this.state = {
            currentView: 'dashboard',
            libraryType: 'games', // 'games', 'anime', 'movies'
            searchQuery: '',
            filterStatus: 'all',
            sortBy: 'newest',
            activeModalId: null
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
        // Initialize Theme
        if(localStorage.getItem('showcase_theme') === 'light') {
            document.body.classList.add('light-mode');
            this.updateThemeToggleUI(true);
        }

        this.bindEvents();
        
        // Simulate Network Sync for premium feel
        setTimeout(() => {
            this.DOM.loader.classList.add('fade-out');
            setTimeout(() => this.DOM.loader.classList.add('hidden'), 500);
            this.switchView('dashboard');
        }, 800);
    }

    // --- ROUTING & STATE ---

    switchView(viewId) {
        this.state.currentView = viewId;
        
        // Update Sidebar UI
        document.querySelectorAll('.nav-links li').forEach(el => el.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links li[data-view="${viewId}"]`);
        if(activeLink) activeLink.classList.add('active');

        // Toggle Sections
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        
        if (['games', 'anime', 'movies'].includes(viewId)) {
            this.state.libraryType = viewId;
            document.getElementById('view-library').classList.add('active');
            
            // Reset filters on library switch
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
            if (viewId === 'profile') this.renderProfile();
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- RENDERERS ---

    renderDashboard() {
        // Calculate Stats
        const typeCount = { game: 0, anime: 0, movies: 0 };
        let totalRating = 0, ratedCount = 0;

        this.data.forEach(item => {
            if(typeCount[item.type] !== undefined) typeCount[item.type]++;
            if(item.rating > 0) {
                totalRating += item.rating;
                ratedCount++;
            }
        });

        const avgRating = ratedCount > 0 ? (totalRating / ratedCount).toFixed(1) : '0.0';

        document.getElementById('dashboard-stats').innerHTML = `
            <div class="stat-card glass-panel">
                <div class="stat-icon" style="background: rgba(99,102,241,0.1); color: var(--accent);"><i class="ph-fill ph-game-controller"></i></div>
                <div class="stat-details"><h3>Games</h3><p>${typeCount.game}</p></div>
            </div>
            <div class="stat-card glass-panel">
                <div class="stat-icon" style="background: rgba(16,185,129,0.1); color: var(--status-completed);"><i class="ph-fill ph-television-simple"></i></div>
                <div class="stat-details"><h3>Anime/TV</h3><p>${typeCount.anime}</p></div>
            </div>
            <div class="stat-card glass-panel">
                <div class="stat-icon" style="background: rgba(251,191,36,0.1); color: #fbbf24;"><i class="ph-fill ph-star"></i></div>
                <div class="stat-details"><h3>Avg Rating</h3><p>${avgRating}</p></div>
            </div>
        `;

        // Hero Spotlight (Highest rated completed game)
        const spotlightCandidates = this.data.filter(d => d.type === 'game' && d.status === 'completed' && d.rating >= 9);
        const spotlightItem = spotlightCandidates.length > 0 
            ? spotlightCandidates[Math.floor(Math.random() * spotlightCandidates.length)] 
            : this.data[0];

        if (spotlightItem) {
            document.getElementById('hero-spotlight').innerHTML = `
                <div class="hero-spotlight-inner" onclick="app.openModal('${spotlightItem.id}')">
                    <img src="${spotlightItem.image}" class="hero-bg" alt="Hero">
                    <div class="hero-overlay"></div>
                    <div class="hero-content">
                        <span class="hero-tag"><i class="ph-fill ph-star"></i> Masterpiece</span>
                        <h1 class="hero-title">${spotlightItem.title}</h1>
                        <p class="hero-desc">${spotlightItem.notes || "Experience the pinnacle of digital entertainment."}</p>
                    </div>
                </div>
            `;
        }

        // Recent Additions
        // Since we don't have real timestamps yet, we'll reverse the array to simulate newest added
        const recentItems = [...this.data].reverse().slice(0, 10);
        this.renderGrid(recentItems, 'recent-grid');
    }

    renderLibrary() {
        const typeMap = {
            'games': { title: 'Game Library', desc: 'Track your interactive experiences.' },
            'anime': { title: 'Anime & TV Library', desc: 'Track your shows and series.' },
            'movies': { title: 'Movie Library', desc: 'Track your cinematic experiences.' }
        };
        
        document.getElementById('library-title').textContent = typeMap[this.state.libraryType].title;
        document.getElementById('library-subtitle').textContent = typeMap[this.state.libraryType].desc;

        // Base Filter by Type
        let filtered = this.data.filter(item => item.type === this.state.libraryType);
        
        // Filter by Status
        if (this.state.filterStatus !== 'all') {
            filtered = filtered.filter(item => {
                if (this.state.filterStatus === 'active') return item.status === 'playing';
                return item.status === this.state.filterStatus;
            });
        }

        // Search Filter (Safe checking due to normalizer)
        if (this.state.searchQuery) {
            const q = this.state.searchQuery.toLowerCase();
            filtered = filtered.filter(item => 
                item.title.toLowerCase().includes(q) || 
                item.genres.some(g => g.toLowerCase().includes(q)) ||
                (item.releaseYear && item.releaseYear.toString().includes(q))
            );
        }

        // Sorting Engine
        filtered.sort((a, b) => {
            switch(this.state.sortBy) {
                case 'rating-high': return b.rating - a.rating;
                case 'rating-low': return (a.rating === 0 ? 99 : a.rating) - (b.rating === 0 ? 99 : b.rating);
                case 'title-asc': return a.title.localeCompare(b.title);
                case 'title-desc': return b.title.localeCompare(a.title);
                default: return 0; // newest relies on array order
            }
        });

        this.renderGrid(filtered, 'library-grid', true);
    }

    renderProfile() {
        // Nothing dynamic needed here yet besides static HTML, 
        // but we can prep for future stats.
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
            
            // Visual mapping for 'playing' -> 'Active/Watching/Playing'
            let statusText = item.status;
            if(item.status === 'playing') {
                statusText = item.type === 'game' ? 'Playing' : 'Watching';
            }
            
            card.innerHTML = `
                <div class="card-img-wrap">
                    <span class="card-status status-${item.status}">${statusText}</span>
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    <div class="card-overlay">
                        ${item.genres.length > 0 ? `<span class="card-primary-genre">${item.genres[0]}</span>` : ''}
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="card-title" title="${item.title}">${item.title}</h3>
                    <div class="card-meta">
                        <span class="card-year">${item.releaseYear || ''}</span>
                        <div class="card-rating">
                            ${item.rating > 0 ? `<i class="ph-fill ph-star"></i> ${item.rating}` : '<span class="unrated">Unrated</span>'}
                        </div>
                    </div>
                </div>
            `;
            fragment.appendChild(card);
        });

        container.appendChild(fragment);
    }

    // --- MODAL & DATA EDITING ---

    openModal(id) {
        const item = this.data.find(d => d.id === id);
        if (!item) return;

        this.state.activeModalId = id;

        // Populate View Mode
        document.getElementById('modal-banner').src = item.image;
        document.getElementById('modal-cover').src = item.image;
        document.getElementById('modal-title').textContent = item.title;
        
        let statusText = item.status;
        if(item.status === 'playing') statusText = item.type === 'game' ? 'Playing' : 'Watching';
        
        const statusEl = document.getElementById('modal-status');
        statusEl.textContent = statusText;
        statusEl.className = `status-badge status-${item.status}`;
        
        document.getElementById('modal-rating').textContent = item.rating > 0 ? `${item.rating} / 10` : 'Unrated';
        
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

        // Setup Editor
        document.getElementById('edit-rating').value = item.rating;
        document.getElementById('edit-status').value = item.status;
        
        const notesDisplay = document.getElementById('modal-notes');
        const notesEditor = document.getElementById('edit-notes-input');
        
        notesDisplay.innerHTML = item.notes ? `<p>${item.notes}</p>` : `<p class="empty-notes">No review recorded.</p>`;
        notesEditor.value = item.notes || '';
        
        // Reset editor visibility
        notesDisplay.classList.remove('hidden');
        document.getElementById('notes-editor-container').classList.add('hidden');
        document.getElementById('toggle-notes-edit').classList.remove('hidden');

        this.DOM.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    closeModal() {
        this.DOM.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.state.activeModalId = null;
    }

    saveEdits() {
        if(!this.state.activeModalId) return;
        
        const newRating = Number(document.getElementById('edit-rating').value);
        const newStatus = document.getElementById('edit-status').value;
        
        // Update Local Storage
        this.storage.updateItem(this.state.activeModalId, { rating: newRating, status: newStatus });
        
        // Update Runtime Memory
        const itemIndex = this.data.findIndex(d => d.id === this.state.activeModalId);
        if(itemIndex > -1) {
            this.data[itemIndex].rating = newRating;
            this.data[itemIndex].status = newStatus;
        }

        Toast.show('Changes saved successfully.');
        
        // Refresh UI
        this.openModal(this.state.activeModalId); 
        if(this.state.currentView === 'dashboard') this.renderDashboard();
        else if (['games', 'anime', 'movies'].includes(this.state.currentView)) this.renderLibrary();
    }

    saveNotes() {
        if(!this.state.activeModalId) return;
        const newNotes = document.getElementById('edit-notes-input').value.trim();
        
        this.storage.updateItem(this.state.activeModalId, { notes: newNotes });
        
        const itemIndex = this.data.findIndex(d => d.id === this.state.activeModalId);
        if(itemIndex > -1) this.data[itemIndex].notes = newNotes;

        Toast.show('Notes updated.');
        this.openModal(this.state.activeModalId); // Refresh modal view
    }

    // --- EVENT BINDING ---

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-links li').forEach(link => {
            link.addEventListener('click', (e) => this.switchView(e.currentTarget.dataset.view));
        });

        document.querySelectorAll('.view-all-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchView(e.currentTarget.dataset.target));
        });

        // Search logic with Debounce
        let searchTimeout;
        this.DOM.search.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            this.state.searchQuery = e.target.value;
            this.DOM.clearSearch.classList.toggle('hidden', !this.state.searchQuery);

            searchTimeout = setTimeout(() => {
                if(this.state.currentView === 'dashboard' || this.state.currentView === 'profile') {
                    this.switchView('games'); // Force library view on search
                } else {
                    this.renderLibrary();
                }
            }, 300);
        });

        this.DOM.clearSearch.addEventListener('click', () => {
            this.DOM.search.value = '';
            this.state.searchQuery = '';
            this.DOM.clearSearch.classList.add('hidden');
            if (['games', 'anime', 'movies'].includes(this.state.currentView)) this.renderLibrary();
        });

        // Filters
        document.querySelectorAll('#library-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('#library-filters .filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.state.filterStatus = e.target.dataset.status;
                this.renderLibrary();
            });
        });

        // Sort
        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.state.sortBy = e.target.value;
            this.renderLibrary();
        });

        // Modal triggers
        document.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
        document.querySelector('.modal-backdrop').addEventListener('click', () => this.closeModal());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.DOM.modal.classList.contains('active')) this.closeModal();
        });

        // Edit Triggers
        document.getElementById('save-edits-btn').addEventListener('click', () => this.saveEdits());
        
        document.getElementById('toggle-notes-edit').addEventListener('click', () => {
            document.getElementById('modal-notes').classList.add('hidden');
            document.getElementById('toggle-notes-edit').classList.add('hidden');
            document.getElementById('notes-editor-container').classList.remove('hidden');
        });

        document.getElementById('cancel-notes-btn').addEventListener('click', () => {
            document.getElementById('modal-notes').classList.remove('hidden');
            document.getElementById('toggle-notes-edit').classList.remove('hidden');
            document.getElementById('notes-editor-container').classList.add('hidden');
        });

        document.getElementById('save-notes-btn').addEventListener('click', () => this.saveNotes());

        // Theming
        document.getElementById('theme-toggle').addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('showcase_theme', isLight ? 'light' : 'dark');
            this.updateThemeToggleUI(isLight);
        });

        // Data Management UI
        document.getElementById('btn-export-data').addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.storage.userData));
            const a = document.createElement('a');
            a.href = dataStr;
            a.download = `showcase_backup_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            Toast.show('Backup downloaded.');
        });

        document.getElementById('import-data-upload').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const imported = JSON.parse(e.target.result);
                    this.storage.userData = { ...this.storage.userData, ...imported };
                    this.storage.save();
                    Toast.show('Data imported! Reloading...', 'success');
                    setTimeout(() => window.location.reload(), 1500);
                } catch (err) {
                    Toast.show('Failed to parse backup file.', 'error');
                }
            };
            reader.readAsText(file);
        });

        document.getElementById('btn-nuke-data').addEventListener('click', () => {
            if(confirm("Are you SURE you want to delete all local ratings and notes? This cannot be undone.")) {
                this.storage.nuke();
            }
        });
    }

    updateThemeToggleUI(isLight) {
        const toggle = document.getElementById('theme-toggle');
        toggle.querySelector('i').className = isLight ? 'ph ph-moon' : 'ph ph-sun';
        toggle.querySelector('span').textContent = isLight ? 'Dark Mode' : 'Light Mode';
    }
}

// Bootstrap Application
const app = new MediaApp();

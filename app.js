/**
 * Media Showcase Application - Production Build
 * Architecture: State-driven UI, Hybrid Data Persistence, Safe Rendering
 */

// 1. Data Schema - RESTORED TO FULL INTEGRITY
// Maps 'playing' and 'watching' under a unified 'active' conceptual flag, but retains original strings for rendering.
const baseData = [
    { id: "101", title: "Bloodborne", type: "game", status: "playing", rating: 0, image: "https://upload.wikimedia.org/wikipedia/en/6/68/Bloodborne_Cover_Wallpaper.jpg" },
    { id: "102", title: "God of War (2018)", type: "game", status: "completed", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/library_600x900.jpg" },
    { id: "103", title: "The Last of Us Part I", type: "game", status: "playing", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/library_600x900.jpg" },
    { id: "104", title: "Ghost of Tsushima", type: "game", status: "dropped", rating: 6.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/library_600x900.jpg" },
    { id: "105", title: "Horizon Zero Dawn", type: "game", status: "dropped", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/library_600x900.jpg" },
    { id: "106", title: "Forza Horizon 5", type: "game", status: "completed", rating: 6.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/library_600x900.jpg" },
    { id: "107", title: "The Witcher 3: Wild Hunt", type: "game", status: "completed", rating: 7.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/library_600x900.jpg" },
    { id: "108", title: "Red Dead Redemption 2", type: "game", status: "completed", rating: 9.3, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900.jpg" },
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
    { id: "126", title: "Counter-Strike 2 / CS:GO", type: "game", status: "playing", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/library_600x900.jpg" },
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
    { id: "151", title: "Nioh 2", type: "game", status: "dropped", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1301210/library_600x900.jpg" },
    { id: "152", title: "Batman: Arkham Knight", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/208650/library_600x900.jpg" },
    { id: "153", title: "God of War Ragnarök", type: "game", status: "completed", rating: 8.3, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/library_600x900.jpg" },
    { id: "154", title: "Hogwarts Legacy", type: "game", status: "dropped", rating: 4.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/library_600x900.jpg" },
    { id: "155", title: "Rise of the Tomb Raider", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/391220/library_600x900.jpg" },
    { id: "156", title: "Shadow of the Tomb Raider", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/750920/library_600x900.jpg" },
    { id: "157", title: "Tomb Raider (2013)", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/203160/library_600x900.jpg" },
    { id: "158", title: "Red Dead Redemption (1)", type: "game", status: "planned", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2668510/library_600x900.jpg" },
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
    
    // Anime Additions 
    { id: "901", title: "Attack on Titan", type: "anime", status: "completed", rating: 9.8, image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Shingeki_no_Kyojin_manga_volume_1.jpg", genres: ["Action", "Dark Fantasy"], releaseYear: 2013, notes: "Masterpiece of foreshadowing." },
    { id: "902", title: "Jujutsu Kaisen", type: "anime", status: "watching", rating: 8.5, image: "https://upload.wikimedia.org/wikipedia/en/4/46/Jujutsu_kaisen.jpg", genres: ["Action", "Supernatural"] },
    { id: "903", title: "Death Note", type: "anime", status: "completed", rating: 9.0, image: "https://upload.wikimedia.org/wikipedia/en/6/6f/Death_Note_Vol_1.jpg" }
];

// 2. Data Persistence Manager
// Merges baseline code data with localStorage overrides (ratings, status, notes)
class StorageManager {
    constructor() {
        this.STORAGE_KEY = 'media_showcase_userdata_v2';
        this.userData = this.load();
    }

    load() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.error("Local storage parsing failed", e);
            return {};
        }
    }

    save() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.userData));
    }

    getMergedData(baseDataArray) {
        return baseDataArray.map(item => {
            if (this.userData[item.id]) {
                return { ...item, ...this.userData[item.id] }; // Overwrite with local changes
            }
            return item;
        });
    }

    exportJSON() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.userData));
        const anchor = document.createElement('a');
        anchor.href = dataStr;
        anchor.download = `media_backup_${new Date().toISOString().split('T')[0]}.json`;
        anchor.click();
    }

    importJSON(file, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                this.userData = { ...this.userData, ...imported };
                this.save();
                callback(true);
            } catch (err) {
                callback(false);
            }
        };
        reader.readAsText(file);
    }
}

// 3. UI Utility - Toasts
const showToast = (message, type = 'success') => {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="ph-fill ${type === 'success' ? 'ph-check-circle' : 'ph-warning-circle'}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
};

// 4. Application Core
class MediaApp {
    constructor(data) {
        this.storage = new StorageManager();
        this.data = this.storage.getMergedData(data); // Ensures no data loss!
        
        this.state = {
            currentView: 'dashboard',
            libraryType: 'games',
            searchQuery: '',
            filterStatus: 'all',
            sortBy: 'newest'
        };
        
        this.elements = {
            loader: document.getElementById('app-loader'),
            searchInput: document.getElementById('global-search'),
            clearSearch: document.getElementById('clear-search'),
            themeToggle: document.getElementById('theme-toggle'),
            modal: document.getElementById('media-modal')
        };

        this.init();
    }

    init() {
        setTimeout(() => {
            this.elements.loader.style.opacity = '0';
            setTimeout(() => this.elements.loader.classList.add('hidden'), 500);
            this.updateDashboard();
            this.setupListeners();
        }, 600);
    }

    switchView(viewId) {
        this.state.currentView = viewId;
        
        // Update Nav
        document.querySelectorAll('.nav-links li').forEach(el => el.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links li[data-view="${viewId}"]`);
        if(activeLink) activeLink.classList.add('active');

        // Update View Visibility
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        
        if (viewId === 'anime' || viewId === 'games') {
            this.state.libraryType = viewId;
            document.getElementById('view-library').classList.add('active');
            this.updateLibraryView();
        } else {
            document.getElementById(`view-${viewId}`).classList.add('active');
            if (viewId === 'dashboard') this.updateDashboard();
            if (viewId === 'profile') this.updateProfile();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateDashboard() {
        const anime = this.data.filter(d => d.type === 'anime');
        const games = this.data.filter(d => d.type === 'game');
        const rated = this.data.filter(d => d.rating > 0);
        const avg = rated.length ? (rated.reduce((sum, item) => sum + Number(item.rating), 0) / rated.length).toFixed(1) : '0.0';

        document.getElementById('stat-anime').textContent = anime.length;
        document.getElementById('stat-games').textContent = games.length;
        document.getElementById('stat-rating').textContent = avg;

        // Spotlight
        const spotlightItem = [...games].sort((a,b) => b.rating - a.rating)[0];
        if (spotlightItem) {
            const heroHtml = `
                <div class="hero-spotlight" onclick="app.openModal('${spotlightItem.id}')">
                    <img src="${spotlightItem.image}" class="hero-bg" alt="Hero Background">
                    <div class="hero-overlay"></div>
                    <div class="hero-content">
                        <span class="hero-tag"><i class="ph-fill ph-star"></i> Masterpiece</span>
                        <h1 class="hero-title">${spotlightItem.title}</h1>
                        <p class="hero-desc">${spotlightItem.notes || "An unparalleled digital experience."}</p>
                    </div>
                </div>
            `;
            document.getElementById('hero-spotlight').innerHTML = heroHtml;
        }

        // Recent
        const recentItems = [...this.data].reverse().slice(0, 6);
        this.renderGrid(recentItems, 'recent-grid');
    }

    updateLibraryView() {
        const isAnime = this.state.libraryType === 'anime';
        document.getElementById('library-title').textContent = isAnime ? 'Anime Library' : 'Game Library';
        document.getElementById('library-subtitle').textContent = `Manage and track your ${isAnime ? 'shows' : 'games'}.`;

        let filtered = this.data.filter(item => item.type === this.state.libraryType);
        
        // Unified Status Filtering Logic
        if (this.state.filterStatus !== 'all') {
            filtered = filtered.filter(item => {
                if (this.state.filterStatus === 'active') {
                    return item.status === 'playing' || item.status === 'watching';
                }
                return item.status === this.state.filterStatus;
            });
        }

        if (this.state.searchQuery) {
            const q = this.state.searchQuery.toLowerCase();
            filtered = filtered.filter(item => 
                item.title.toLowerCase().includes(q) || 
                (item.genres && item.genres.some(g => g.toLowerCase().includes(q)))
            );
        }

        filtered.sort((a, b) => {
            if (this.state.sortBy === 'rating-high') return (b.rating || 0) - (a.rating || 0);
            if (this.state.sortBy === 'rating-low') return (a.rating === 0 ? 99 : a.rating) - (b.rating === 0 ? 99 : b.rating);
            if (this.state.sortBy === 'title-asc') return a.title.localeCompare(b.title);
            return 0; // newest relies on original array order
        });

        this.renderGrid(filtered, 'library-grid');
    }

    updateProfile() {
        const activeItems = this.data.filter(d => d.status === 'playing' || d.status === 'watching');
        this.renderGrid(activeItems, 'active-grid');
    }

    renderGrid(items, containerId) {
        const container = document.getElementById(containerId);
        const emptyState = document.getElementById('empty-state');
        
        if (items.length === 0) {
            container.innerHTML = '';
            if (emptyState && containerId === 'library-grid') emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');
        const fragment = document.createDocumentFragment();
        const fallbackImg = 'https://via.placeholder.com/300x450/18181b/ffffff?text=Image+Missing';
        
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'card';
            div.onclick = () => this.openModal(item.id);
            
            // Unified status rendering
            const renderStatus = item.status === 'playing' || item.status === 'watching' ? 'Active' : item.status;
            const statusClass = item.status === 'playing' || item.status === 'watching' ? 'status-active' : `status-${item.status}`;
            
            div.innerHTML = `
                <div class="card-img-wrap">
                    <span class="card-status ${statusClass}">${renderStatus}</span>
                    <img src="${item.image || fallbackImg}" alt="${item.title}" loading="lazy" onerror="this.src='${fallbackImg}'">
                    <div class="card-overlay">
                        ${item.genres ? `<span style="color:white; font-size: 0.75rem; font-weight:700;">${item.genres[0]}</span>` : ''}
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-title" title="${item.title}">${item.title}</div>
                    <div class="card-meta">
                        <span>${item.releaseYear || ''}</span>
                        <div class="card-rating">
                            ${item.rating > 0 ? `<i class="ph-fill ph-star"></i> ${item.rating}` : '<span style="color:var(--text-muted)">Unrated</span>'}
                        </div>
                    </div>
                </div>
            `;
            fragment.appendChild(div);
        });

        container.innerHTML = '';
        container.appendChild(fragment);
    }

    openModal(id) {
        const item = this.data.find(d => d.id === id);
        if (!item) return;

        const fallbackImg = 'https://via.placeholder.com/300x450/18181b/ffffff?text=Image+Missing';

        document.getElementById('modal-banner').src = item.image || fallbackImg;
        document.getElementById('modal-banner').onerror = function() { this.src = fallbackImg; };
        document.getElementById('modal-cover').src = item.image || fallbackImg;
        document.getElementById('modal-title').textContent = item.title;
        
        const statusEl = document.getElementById('modal-status');
        const renderStatus = item.status === 'playing' || item.status === 'watching' ? 'Active' : item.status;
        const statusClass = item.status === 'playing' || item.status === 'watching' ? 'status-active' : `status-${item.status}`;
        statusEl.textContent = renderStatus;
        statusEl.className = `status-badge ${statusClass}`;
        
        document.getElementById('modal-rating').textContent = item.rating > 0 ? `${item.rating} / 10` : 'Unrated';
        
        const yearEl = document.getElementById('modal-year');
        if (item.releaseYear) {
            yearEl.classList.remove('hidden');
            yearEl.querySelector('span').textContent = item.releaseYear;
        } else {
            yearEl.classList.add('hidden');
        }

        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = `<span class="hero-tag" style="background: var(--bg-surface-hover); color: var(--text-main); border: 1px solid var(--border-color);">${item.type.toUpperCase()}</span>`;
        if (item.genres) {
            item.genres.forEach(g => {
                tagsContainer.innerHTML += `<span class="hero-tag" style="background: var(--bg-base); color: var(--text-muted); border: 1px solid var(--border-color); margin-left: 0.5rem;">${g}</span>`;
            });
        }

        const notesEl = document.getElementById('modal-notes');
        notesEl.innerHTML = item.notes ? `<p>${item.notes}</p>` : `<p style="opacity: 0.5; font-style: italic;">No thoughts or review recorded for this entry yet.</p>`;

        this.elements.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    closeModal() {
        this.elements.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    setupListeners() {
        document.querySelectorAll('.nav-links li').forEach(link => {
            link.addEventListener('click', (e) => this.switchView(e.currentTarget.dataset.view));
        });

        document.querySelectorAll('.view-all-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchView(e.currentTarget.dataset.target));
        });

        // Debounce Search
        let searchTimeout;
        this.elements.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            this.state.searchQuery = e.target.value;
            
            this.elements.clearSearch.classList.toggle('hidden', !this.state.searchQuery);

            searchTimeout = setTimeout(() => {
                if(this.state.currentView !== 'dashboard' && this.state.currentView !== 'profile') {
                    this.updateLibraryView();
                } else {
                    this.switchView('games'); 
                }
            }, 300);
        });

        this.elements.clearSearch.addEventListener('click', () => {
            this.elements.searchInput.value = '';
            this.state.searchQuery = '';
            this.elements.clearSearch.classList.add('hidden');
            this.updateLibraryView();
        });

        // Filter & Sort
        document.querySelectorAll('#library-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('#library-filters .filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.state.filterStatus = e.target.dataset.status;
                this.updateLibraryView();
            });
        });

        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.state.sortBy = e.target.value;
            this.updateLibraryView();
        });

        // Modals
        document.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
        document.querySelector('.modal-backdrop').addEventListener('click', () => this.closeModal());
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.modal.classList.contains('active')) this.closeModal();
        });

        // Theming
        this.elements.themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            this.elements.themeToggle.querySelector('i').className = isLight ? 'ph ph-moon' : 'ph ph-sun';
            this.elements.themeToggle.querySelector('span').textContent = isLight ? 'Dark Mode' : 'Light Mode';
        });

        // Data Management Links
        document.getElementById('btn-export-data').addEventListener('click', () => {
            this.storage.exportJSON();
            showToast('Backup Exported Successfully', 'success');
        });

        document.getElementById('import-data-upload').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            this.storage.importJSON(file, (success) => {
                if (success) {
                    showToast('Data Imported! Reloading...', 'success');
                    setTimeout(() => window.location.reload(), 1500);
                } else {
                    showToast('Failed to parse JSON file.', 'error');
                }
            });
        });
    }
}

// Bootstrap
const app = new MediaApp(baseData);

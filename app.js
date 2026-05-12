/**
 * Media Showcase Application
 * Architecture: State-driven UI, Component rendering, Event Delegation
 */

// 1. Data Schema (Preserved all items, added optional fields like releaseYear/genres to demo extensibility)
const mediaData = [
    { id: "101", title: "Bloodborne", type: "game", status: "playing", rating: 0, image: "https://upload.wikimedia.org/wikipedia/en/6/68/Bloodborne_Cover_Wallpaper.jpg", genres: ["Souls-like", "Action RPG"], releaseYear: 2015, notes: "The atmosphere in Yharnam is unmatched. Still struggling with Father Gascoigne." },
    { id: "102", title: "God of War (2018)", type: "game", status: "completed", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/library_600x900.jpg", genres: ["Action Adventure"], releaseYear: 2018, notes: "Incredible soft reboot. The Leviathan axe mechanics feel weighty and satisfying." },
    { id: "103", title: "The Last of Us Part I", type: "game", status: "playing", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/library_600x900.jpg", notes: "" },
    { id: "104", title: "Ghost of Tsushima", type: "game", status: "dropped", rating: 6.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/library_600x900.jpg", notes: "" },
    { id: "105", title: "Horizon Zero Dawn", type: "game", status: "dropped", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/library_600x900.jpg", notes: "" },
    { id: "106", title: "Forza Horizon 5", type: "game", status: "completed", rating: 6.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/library_600x900.jpg", notes: "" },
    { id: "107", title: "The Witcher 3: Wild Hunt", type: "game", status: "completed", rating: 7.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/library_600x900.jpg", notes: "" },
    { id: "108", title: "Red Dead Redemption 2", type: "game", status: "completed", rating: 9.3, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900.jpg", genres: ["Open World", "Story Rich"], releaseYear: 2018, notes: "Arthur Morgan's journey is a masterpiece of storytelling." },
    { id: "109", title: "Grand Theft Auto V", type: "game", status: "completed", rating: 7.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg", notes: "" },
    { id: "110", title: "Cyberpunk 2077", type: "game", status: "completed", rating: 9.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg", notes: "" },
    { id: "111", title: "The Elder Scrolls V: Skyrim", type: "game", status: "dropped", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/489830/library_600x900.jpg", notes: "" },
    { id: "112", title: "Half-Life 2", type: "game", status: "completed", rating: 9.6, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/library_600x900.jpg", notes: "" },
    { id: "113", title: "Portal 2", type: "game", status: "completed", rating: 8.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/library_600x900.jpg", notes: "" },
    { id: "114", title: "Dishonored", type: "game", status: "completed", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/205100/library_600x900.jpg", notes: "" },
    { id: "115", title: "Dark Souls", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570940/library_600x900.jpg", notes: "" },
    { id: "116", title: "Dark Souls III", type: "game", status: "completed", rating: 9.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/library_600x900.jpg", notes: "" },
    { id: "117", title: "Elden Ring", type: "game", status: "completed", rating: 9.9, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900.jpg", notes: "" },
    { id: "118", title: "Sekiro: Shadows Die Twice", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/814380/library_600x900.jpg", notes: "" },
    { id: "119", title: "Baldur's Gate 3", type: "game", status: "dropped", rating: 0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/library_600x900.jpg", notes: "" },
    { id: "120", title: "World of Warcraft: Wotlk", type: "game", status: "completed", rating: 9.5, image: "https://upload.wikimedia.org/wikipedia/en/e/e5/World_of_Warcraft_Wrath_of_the_Lich_King_box_art.jpg", notes: "" },
    { id: "121", title: "Genshin Impact", type: "game", status: "dropped", rating: 0, image: "https://upload.wikimedia.org/wikipedia/en/5/5d/Genshin_Impact_logo.png", notes: "" },
    { id: "122", title: "Terraria", type: "game", status: "completed", rating: 7.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/library_600x900.jpg", notes: "" },
    { id: "123", title: "Minecraft", type: "game", status: "completed", rating: 8.5, image: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png", notes: "" },
    { id: "124", title: "Outer Wilds", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/library_600x900.jpg", notes: "" },
    { id: "125", title: "StarCraft II", type: "game", status: "completed", rating: 8.0, image: "https://upload.wikimedia.org/wikipedia/en/2/20/StarCraft_II_-_Box_Art.jpg", notes: "" },
    { id: "126", title: "Counter-Strike 2 / CS:GO", type: "game", status: "playing", rating: 8.5, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/library_600x900.jpg", notes: "" },
    { id: "127", title: "Valorant", type: "game", status: "playing", rating: 8.4, image: "https://upload.wikimedia.org/wikipedia/en/a/ab/Valorant_cover_art.jpg", notes: "" },
    { id: "128", title: "League of Legends", type: "game", status: "playing", rating: 0, image: "https://upload.wikimedia.org/wikipedia/en/7/77/League_of_Legends_logo.png", notes: "" },
    { id: "129", title: "Fortnite", type: "game", status: "playing", rating: 9.9, image: "https://upload.wikimedia.org/wikipedia/en/a/a8/FortniteCoverArt.jpg", notes: "" },
    { id: "130", title: "Overwatch 2", type: "game", status: "dropped", rating: 1.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2356500/library_600x900.jpg", notes: "" },
    { id: "134", title: "Super Mario 64", type: "game", status: "completed", rating: 8.0, image: "https://upload.wikimedia.org/wikipedia/en/6/6a/Super_Mario_64_box_cover.jpg", notes: "" },
    { id: "138", title: "Sifu", type: "game", status: "completed", rating: 7.8, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2138710/library_600x900.jpg", notes: "" },
    { id: "139", title: "Cyberpunk 2077: Phantom Liberty", type: "game", status: "completed", rating: 9.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2138330/library_600x900.jpg", notes: "" },
    { id: "144", title: "Outlast", type: "game", status: "completed", rating: 9.3, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238320/library_600x900.jpg", notes: "" },
    { id: "153", title: "God of War Ragnarök", type: "game", status: "completed", rating: 8.3, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/library_600x900.jpg", notes: "" },
    { id: "160", title: "Half-Life", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/library_600x900.jpg", notes: "" },
    { id: "168", title: "Firewatch", type: "game", status: "completed", rating: 9.1, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/383870/library_600x900.jpg", notes: "" },
    { id: "174", title: "Elden Ring: Shadow of the Erdtree", type: "game", status: "completed", rating: 10.0, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2778580/library_600x900.jpg", notes: "" },
    
    // Demonstration of Anime scalability
    { id: "901", title: "Attack on Titan", type: "anime", status: "completed", rating: 9.8, image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Shingeki_no_Kyojin_manga_volume_1.jpg", genres: ["Action", "Dark Fantasy"], releaseYear: 2013, notes: "Masterpiece of foreshadowing." },
    { id: "902", title: "Jujutsu Kaisen", type: "anime", status: "watching", rating: 8.5, image: "https://upload.wikimedia.org/wikipedia/en/4/46/Jujutsu_kaisen.jpg", genres: ["Action", "Supernatural"], notes: "" },
    { id: "903", title: "Death Note", type: "anime", status: "completed", rating: 9.0, image: "https://upload.wikimedia.org/wikipedia/en/6/6f/Death_Note_Vol_1.jpg", notes: "" }
];

// 2. Application Core Class
class MediaApp {
    constructor(data) {
        this.data = data;
        this.state = {
            currentView: 'dashboard',
            libraryType: 'games', // 'games' or 'anime'
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
        // Simulate loading for premium feel
        setTimeout(() => {
            this.elements.loader.style.opacity = '0';
            setTimeout(() => this.elements.loader.classList.add('hidden'), 500);
            this.updateDashboard();
            this.setupListeners();
        }, 800);
    }

    // --- State Management & Routing ---
    switchView(viewId) {
        this.state.currentView = viewId;
        
        // Handle Sidebar UI
        document.querySelectorAll('.nav-links li').forEach(el => el.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links li[data-view="${viewId}"]`);
        if(activeLink) activeLink.classList.add('active');

        // Handle View Visibility
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

    // --- Renderers ---
    updateDashboard() {
        // Stats
        const anime = this.data.filter(d => d.type === 'anime');
        const games = this.data.filter(d => d.type === 'game');
        const rated = this.data.filter(d => d.rating > 0);
        const avg = rated.length ? (rated.reduce((sum, item) => sum + item.rating, 0) / rated.length).toFixed(1) : '0.0';

        document.getElementById('stat-anime').textContent = anime.length;
        document.getElementById('stat-games').textContent = games.length;
        document.getElementById('stat-rating').textContent = avg;

        // Dynamic Hero Spotlight (Highest rated recent game)
        const spotlightItem = [...games].sort((a,b) => b.rating - a.rating)[0];
        if (spotlightItem) {
            const heroHtml = `
                <div class="hero-spotlight" onclick="app.openModal('${spotlightItem.id}')">
                    <img src="${spotlightItem.image}" class="hero-bg" alt="Hero Background">
                    <div class="hero-overlay"></div>
                    <div class="hero-content">
                        <span class="hero-tag"><i class="ph-fill ph-star"></i> Top Rated Masterpiece</span>
                        <h1 class="hero-title">${spotlightItem.title}</h1>
                        <p class="hero-desc">${spotlightItem.notes || "Experience the pinnacle of interactive entertainment."}</p>
                    </div>
                </div>
            `;
            document.getElementById('hero-spotlight').innerHTML = heroHtml;
        }

        // Recent Grid
        const recentItems = [...this.data].reverse().slice(0, 6);
        this.renderGrid(recentItems, 'recent-grid');
    }

    updateLibraryView() {
        const isAnime = this.state.libraryType === 'anime';
        document.getElementById('library-title').textContent = isAnime ? 'Anime Library' : 'Game Library';
        document.getElementById('library-subtitle').textContent = `Manage and track your ${isAnime ? 'shows' : 'games'}.`;

        // Filter & Sort Data
        let filtered = this.data.filter(item => item.type === this.state.libraryType);
        
        // Apply Status Filter
        if (this.state.filterStatus !== 'all') {
            filtered = filtered.filter(item => item.status === this.state.filterStatus);
        }

        // Apply Search
        if (this.state.searchQuery) {
            const q = this.state.searchQuery.toLowerCase();
            filtered = filtered.filter(item => 
                item.title.toLowerCase().includes(q) || 
                (item.genres && item.genres.some(g => g.toLowerCase().includes(q)))
            );
        }

        // Apply Sort
        filtered.sort((a, b) => {
            if (this.state.sortBy === 'rating-high') return b.rating - a.rating;
            if (this.state.sortBy === 'rating-low') return (a.rating || Number.MAX_VALUE) - (b.rating || Number.MAX_VALUE);
            if (this.state.sortBy === 'title-asc') return a.title.localeCompare(b.title);
            return 0; // 'newest' assumes original array order is chronological
        });

        this.renderGrid(filtered, 'library-grid');
    }

    updateProfile() {
        const activeItems = this.data.filter(d => d.status === 'playing' || d.status === 'watching');
        this.renderGrid(activeItems, 'active-grid');
    }

    // --- Component Generation ---
    renderGrid(items, containerId) {
        const container = document.getElementById(containerId);
        const emptyState = document.getElementById('empty-state');
        
        if (items.length === 0) {
            container.innerHTML = '';
            if (emptyState && containerId === 'library-grid') emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        // Use DocumentFragment for performance
        const fragment = document.createDocumentFragment();
        
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'card';
            div.onclick = () => this.openModal(item.id);
            
            const fallbackImg = 'https://via.placeholder.com/300x450/18181b/ffffff?text=No+Cover';
            
            div.innerHTML = `
                <div class="card-img-wrap">
                    <span class="card-status status-${item.status}">${item.status}</span>
                    <img src="${item.image || fallbackImg}" alt="${item.title}" loading="lazy">
                    <div class="card-overlay">
                        ${item.genres ? `<span style="color:var(--accent); font-size: 0.75rem; font-weight:700;">${item.genres[0]}</span>` : ''}
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

    // --- Modal Logic ---
    openModal(id) {
        const item = this.data.find(d => d.id === id);
        if (!item) return;

        const fallbackImg = 'https://via.placeholder.com/300x450/18181b/ffffff?text=No+Cover';

        // Populate Data
        document.getElementById('modal-banner').src = item.image || fallbackImg;
        document.getElementById('modal-cover').src = item.image || fallbackImg;
        document.getElementById('modal-title').textContent = item.title;
        
        const statusEl = document.getElementById('modal-status');
        statusEl.textContent = item.status;
        statusEl.className = `status-badge status-${item.status}`;
        
        document.getElementById('modal-rating').textContent = item.rating > 0 ? `${item.rating} / 10` : 'Unrated';
        
        const yearEl = document.getElementById('modal-year');
        if (item.releaseYear) {
            yearEl.classList.remove('hidden');
            yearEl.querySelector('span').textContent = item.releaseYear;
        } else {
            yearEl.classList.add('hidden');
        }

        // Tags
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = `<span class="hero-tag" style="background: var(--bg-surface-hover); color: var(--text-main); border: 1px solid var(--border-color);">${item.type.toUpperCase()}</span>`;
        if (item.genres) {
            item.genres.forEach(g => {
                tagsContainer.innerHTML += `<span class="hero-tag" style="background: var(--bg-base); color: var(--text-muted); border: 1px solid var(--border-color);">${g}</span>`;
            });
        }

        // Notes
        const notesEl = document.getElementById('modal-notes');
        notesEl.innerHTML = item.notes ? `<p>${item.notes}</p>` : `<p style="opacity: 0.5; font-style: italic;">No thoughts or review recorded for this entry yet.</p>`;

        this.elements.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    closeModal() {
        this.elements.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // --- Events ---
    setupListeners() {
        // Navigation
        document.querySelectorAll('.nav-links li').forEach(link => {
            link.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });

        // Search with Debounce
        let searchTimeout;
        this.elements.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            this.state.searchQuery = e.target.value;
            
            if (this.state.searchQuery) {
                this.elements.clearSearch.classList.remove('hidden');
            } else {
                this.elements.clearSearch.classList.add('hidden');
            }

            searchTimeout = setTimeout(() => {
                if(this.state.currentView !== 'dashboard' && this.state.currentView !== 'profile') {
                    this.updateLibraryView();
                } else {
                    // Auto switch to games library if searching from dashboard
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

        // Filters
        document.querySelectorAll('#library-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('#library-filters .filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.state.filterStatus = e.target.dataset.status;
                this.updateLibraryView();
            });
        });

        // Sort
        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.state.sortBy = e.target.value;
            this.updateLibraryView();
        });

        // Modal close
        document.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
        document.querySelector('.modal-backdrop').addEventListener('click', () => this.closeModal());

        // Theme Toggle
        this.elements.themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            this.elements.themeToggle.querySelector('i').className = isLight ? 'ph ph-moon' : 'ph ph-sun';
            this.elements.themeToggle.querySelector('span').textContent = isLight ? 'Dark Mode' : 'Light Mode';
        });
    }
}

// Initialize Application
const app = new MediaApp(mediaData);

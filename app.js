// Sample Default Data to demonstrate the UI
const defaultData = [
    { id: '1', title: 'Cyberpunk: Edgerunners', type: 'anime', status: 'completed', rating: 10, image: 'https://m.media-amazon.com/images/M/MV5BODcwOTE1NDktZjA0ZC00NTNmLTgwOGMtOWQ5YzNkNzc1ZTJjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', notes: 'Absolute masterpiece.' },
    { id: '2', title: 'Hollow Knight', type: 'game', status: 'completed', rating: 9, image: 'https://cdn.akamai.steamstatic.com/steam/apps/367520/capsule_616x353.jpg', notes: 'Best metroidvania.' },
    { id: '3', title: 'Elden Ring', type: 'game', status: 'playing', rating: 10, image: 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png', notes: 'Still stuck on Malenia.' },
    { id: '4', title: 'Jujutsu Kaisen', type: 'anime', status: 'watching', rating: 8, image: 'https://m.media-amazon.com/images/M/MV5BNGY4MTg3NzgtNjAwMC00ZGNhLThkZjctNjk0MDZkOWM5NWIxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', notes: 'Great animation.' }
];

// Initialize Data
let mediaData = JSON.parse(localStorage.getItem('trackr_data')) || defaultData;
let currentView = 'dashboard';

// DOM Elements
const views = document.querySelectorAll('.view');
const navLinks = document.querySelectorAll('.nav-links li');
const modal = document.getElementById('media-modal');
const form = document.getElementById('media-form');
const searchInput = document.getElementById('global-search');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
    setupNavigation();
    setupModalEvents();
    setupFilters();
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        renderGrids(query);
    });

    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });

    document.getElementById('export-btn').addEventListener('click', exportJSON);
    document.getElementById('import-btn').addEventListener('change', importJSON);
});

function saveData() {
    localStorage.setItem('trackr_data', JSON.stringify(mediaData));
    renderApp();
}

function renderApp() {
    updateStats();
    renderGrids(searchInput.value.toLowerCase());
}

// Navigation
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            views.forEach(v => v.classList.remove('active'));
            currentView = link.dataset.view;
            document.getElementById(`view-${currentView}`).classList.add('active');
            
            searchInput.value = ''; // Reset search on nav
            renderGrids();
        });
    });
}

// Statistics
function updateStats() {
    const animes = mediaData.filter(d => d.type === 'anime');
    const games = mediaData.filter(d => d.type === 'game');
    
    document.getElementById('stat-anime').textContent = animes.length;
    document.getElementById('stat-games').textContent = games.length;
    
    const rated = mediaData.filter(d => d.rating > 0);
    const avg = rated.length ? (rated.reduce((sum, item) => sum + parseInt(item.rating), 0) / rated.length).toFixed(1) : 0;
    document.getElementById('stat-rating').innerHTML = `${avg} <i class="ph-fill ph-star" style="color: gold;"></i>`;
}

// Render Cards based on Filters and Search
function renderGrids(searchQuery = '') {
    const recentGrid = document.getElementById('recent-grid');
    const animeGrid = document.getElementById('anime-grid');
    const gameGrid = document.getElementById('game-grid');
    const activeGrid = document.getElementById('active-grid');

    const animeFilter = document.querySelector('#anime-filters .active').dataset.status;
    const gameFilter = document.querySelector('#game-filters .active').dataset.status;

    // Helper to generate Card HTML
    const createCard = (item) => `
        <div class="card" onclick="openModal('${item.id}')">
            <div class="card-img-wrap">
                <span class="card-status status-${item.status}">${item.status.replace('watching', 'watching').replace('playing', 'playing')}</span>
                <img src="${item.image || 'https://via.placeholder.com/200x300?text=No+Cover'}" alt="${item.title}" loading="lazy">
            </div>
            <div class="card-content">
                <div class="card-title">${item.title}</div>
                <div class="card-rating"><i class="ph-fill ph-star"></i> ${item.rating}/10</div>
            </div>
        </div>
    `;

    let filteredData = mediaData.filter(item => item.title.toLowerCase().includes(searchQuery));

    if(recentGrid && currentView === 'dashboard') {
        recentGrid.innerHTML = filteredData.slice().reverse().slice(0, 5).map(createCard).join('');
    }

    if(animeGrid && currentView === 'anime') {
        const animes = filteredData.filter(d => d.type === 'anime' && (animeFilter === 'all' || d.status === animeFilter));
        animeGrid.innerHTML = animes.map(createCard).join('') || '<p style="grid-column: 1/-1; color: var(--text-secondary);">No anime found.</p>';
    }

    if(gameGrid && currentView === 'games') {
        const games = filteredData.filter(d => d.type === 'game' && (gameFilter === 'all' || d.status === gameFilter));
        gameGrid.innerHTML = games.map(createCard).join('') || '<p style="grid-column: 1/-1; color: var(--text-secondary);">No games found.</p>';
    }

    if(activeGrid && currentView === 'profile') {
        const activeItems = filteredData.filter(d => d.status === 'watching' || d.status === 'playing');
        activeGrid.innerHTML = activeItems.map(createCard).join('');
    }
}

// Filter Logic
function setupFilters() {
    document.querySelectorAll('.filters .filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const parent = e.target.closest('.filters');
            parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderGrids(searchInput.value.toLowerCase());
        });
    });
}

// Modal & Form Logic
function setupModalEvents() {
    document.getElementById('add-new-btn').addEventListener('click', () => openModal());
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });

    // Live rating update
    document.getElementById('entry-rating').addEventListener('input', (e) => {
        document.getElementById('rating-val').textContent = e.target.value;
    });

    form.addEventListener('submit', handleFormSubmit);
    
    document.getElementById('btn-delete').addEventListener('click', () => {
        const id = document.getElementById('entry-id').value;
        if(confirm("Are you sure you want to delete this entry?")) {
            mediaData = mediaData.filter(item => item.id !== id);
            saveData();
            closeModal();
        }
    });
}

function openModal(id = null) {
    modal.classList.add('active');
    const deleteBtn = document.getElementById('btn-delete');
    
    if (id) {
        document.getElementById('modal-title').textContent = 'Edit Entry';
        const item = mediaData.find(d => d.id === id);
        document.getElementById('entry-id').value = item.id;
        document.getElementById('entry-title').value = item.title;
        document.getElementById('entry-type').value = item.type;
        document.getElementById('entry-status').value = item.status;
        document.getElementById('entry-rating').value = item.rating;
        document.getElementById('rating-val').textContent = item.rating;
        document.getElementById('entry-image').value = item.image;
        document.getElementById('entry-notes').value = item.notes || '';
        deleteBtn.classList.remove('hidden');
    } else {
        document.getElementById('modal-title').textContent = 'Add New Entry';
        form.reset();
        document.getElementById('entry-id').value = '';
        document.getElementById('rating-val').textContent = '5';
        // Auto select type based on current view
        if(currentView === 'anime') document.getElementById('entry-type').value = 'anime';
        if(currentView === 'games') document.getElementById('entry-type').value = 'game';
        deleteBtn.classList.add('hidden');
    }
}

function closeModal() {
    modal.classList.remove('active');
}

function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('entry-id').value || Date.now().toString();
    const newItem = {
        id: id,
        title: document.getElementById('entry-title').value,
        type: document.getElementById('entry-type').value,
        status: document.getElementById('entry-status').value,
        rating: document.getElementById('entry-rating').value,
        image: document.getElementById('entry-image').value,
        notes: document.getElementById('entry-notes').value
    };

    const existingIndex = mediaData.findIndex(item => item.id === id);
    if (existingIndex > -1) {
        mediaData[existingIndex] = newItem;
    } else {
        mediaData.push(newItem);
    }

    saveData();
    closeModal();
}

// Export / Import JSON Logic
function exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mediaData));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "trackr_backup.json");
    dlAnchorElem.click();
}

function importJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const importedData = JSON.parse(event.target.result);
            if(Array.isArray(importedData)) {
                mediaData = importedData;
                saveData();
                alert("Data imported successfully!");
            }
        } catch (err) {
            alert("Invalid JSON file.");
        }
    };
    reader.readAsText(file);
}

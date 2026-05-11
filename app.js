const mediaData = [
    {
        "id": "101",
        "title": "Bloodborne",
        "type": "game",
        "status": "playing",
        "rating": 0,
        "image": "https://upload.wikimedia.org/wikipedia/en/6/68/Bloodborne_Cover_Wallpaper.jpg",
        "notes": ""
    },
    {
        "id": "102",
        "title": "God of War (2018)",
        "type": "game",
        "status": "completed",
        "rating": 8.5,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "103",
        "title": "The Last of Us Part I",
        "type": "game",
        "status": "playing",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "104",
        "title": "Ghost of Tsushima",
        "type": "game",
        "status": "dropped",
        "rating": 6.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "105",
        "title": "Horizon Zero Dawn",
        "type": "game",
        "status": "dropped",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "106",
        "title": "Forza Horizon 5",
        "type": "game",
        "status": "completed",
        "rating": 6.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "107",
        "title": "The Witcher 3: Wild Hunt",
        "type": "game",
        "status": "completed",
        "rating": 7.8,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "108",
        "title": "Red Dead Redemption 2",
        "type": "game",
        "status": "completed",
        "rating": 9.3,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "109",
        "title": "Grand Theft Auto V",
        "type": "game",
        "status": "completed",
        "rating": 7.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "110",
        "title": "Cyberpunk 2077",
        "type": "game",
        "status": "completed",
        "rating": 9.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "111",
        "title": "The Elder Scrolls V: Skyrim",
        "type": "game",
        "status": "dropped",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/489830/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "112",
        "title": "Half-Life 2",
        "type": "game",
        "status": "completed",
        "rating": 9.6,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "113",
        "title": "Portal 2",
        "type": "game",
        "status": "completed",
        "rating": 8.8,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "114",
        "title": "Dishonored",
        "type": "game",
        "status": "completed",
        "rating": 8.5,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/205100/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "115",
        "title": "Dark Souls",
        "type": "game",
        "status": "completed",
        "rating": 10.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570940/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "116",
        "title": "Dark Souls III",
        "type": "game",
        "status": "completed",
        "rating": 9.8,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "117",
        "title": "Elden Ring",
        "type": "game",
        "status": "completed",
        "rating": 9.9,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "118",
        "title": "Sekiro: Shadows Die Twice",
        "type": "game",
        "status": "completed",
        "rating": 10.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/814380/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "119",
        "title": "Baldur's Gate 3",
        "type": "game",
        "status": "dropped",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "120",
        "title": "World of Warcraft: Wotlk",
        "type": "game",
        "status": "completed",
        "rating": 9.5,
        "image": "https://upload.wikimedia.org/wikipedia/en/e/e5/World_of_Warcraft_Wrath_of_the_Lich_King_box_art.jpg",
        "notes": ""
    },
    {
        "id": "121",
        "title": "Genshin Impact",
        "type": "game",
        "status": "dropped",
        "rating": 0,
        "image": "https://upload.wikimedia.org/wikipedia/en/5/5d/Genshin_Impact_logo.png",
        "notes": ""
    },
    {
        "id": "122",
        "title": "Terraria",
        "type": "game",
        "status": "completed",
        "rating": 7.5,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "123",
        "title": "Minecraft",
        "type": "game",
        "status": "completed",
        "rating": 8.5,
        "image": "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
        "notes": ""
    },
    {
        "id": "124",
        "title": "Outer Wilds",
        "type": "game",
        "status": "completed",
        "rating": 10.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "125",
        "title": "StarCraft II",
        "type": "game",
        "status": "completed",
        "rating": 8.0,
        "image": "https://upload.wikimedia.org/wikipedia/en/2/20/StarCraft_II_-_Box_Art.jpg",
        "notes": ""
    },
    {
        "id": "126",
        "title": "Counter-Strike 2 / CS:GO",
        "type": "game",
        "status": "playing",
        "rating": 8.5,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "127",
        "title": "Valorant",
        "type": "game",
        "status": "playing",
        "rating": 8.4,
        "image": "https://upload.wikimedia.org/wikipedia/en/a/ab/Valorant_cover_art.jpg",
        "notes": ""
    },
    {
        "id": "128",
        "title": "League of Legends",
        "type": "game",
        "status": "playing",
        "rating": 0,
        "image": "https://upload.wikimedia.org/wikipedia/en/7/77/League_of_Legends_logo.png",
        "notes": ""
    },
    {
        "id": "129",
        "title": "Fortnite",
        "type": "game",
        "status": "playing",
        "rating": 9.9,
        "image": "https://upload.wikimedia.org/wikipedia/en/a/a8/FortniteCoverArt.jpg",
        "notes": ""
    },
    {
        "id": "130",
        "title": "Overwatch 2",
        "type": "game",
        "status": "dropped",
        "rating": 1.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2356500/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "131",
        "title": "Rocket League",
        "type": "game",
        "status": "dropped",
        "rating": 4.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252950/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "132",
        "title": "Tom Clancy's Rainbow Six Siege",
        "type": "game",
        "status": "dropped",
        "rating": 6.5,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359550/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "133",
        "title": "Call of Duty: Warzone",
        "type": "game",
        "status": "dropped",
        "rating": 6.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1962660/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "134",
        "title": "Super Mario 64",
        "type": "game",
        "status": "completed",
        "rating": 8.0,
        "image": "https://upload.wikimedia.org/wikipedia/en/6/6a/Super_Mario_64_box_cover.jpg",
        "notes": ""
    },
    {
        "id": "135",
        "title": "Dark Souls II: Scholar of the First Sin",
        "type": "game",
        "status": "planned",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/335300/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "136",
        "title": "Lies of P",
        "type": "game",
        "status": "playing",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1627720/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "137",
        "title": "Nioh",
        "type": "game",
        "status": "dropped",
        "rating": 3.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/485510/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "138",
        "title": "Sifu",
        "type": "game",
        "status": "completed",
        "rating": 7.8,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2138710/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "139",
        "title": "Cyberpunk 2077: Phantom Liberty",
        "type": "game",
        "status": "completed",
        "rating": 9.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2138330/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "140",
        "title": "Hell Let Loose",
        "type": "game",
        "status": "dropped",
        "rating": 5.6,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/686810/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "141",
        "title": "Far Cry 3",
        "type": "game",
        "status": "completed",
        "rating": 9.7,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220240/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "142",
        "title": "Deep Rock Galactic",
        "type": "game",
        "status": "dropped",
        "rating": 6.7,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/548430/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "143",
        "title": "Alien: Isolation",
        "type": "game",
        "status": "completed",
        "rating": 8.7,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "144",
        "title": "Outlast",
        "type": "game",
        "status": "completed",
        "rating": 9.3,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238320/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "145",
        "title": "Phasmophobia",
        "type": "game",
        "status": "dropped",
        "rating": 3.2,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/739630/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "146",
        "title": "Valheim",
        "type": "game",
        "status": "dropped",
        "rating": 6.9,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/892970/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "147",
        "title": "The Forest",
        "type": "game",
        "status": "completed",
        "rating": 7.8,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242760/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "148",
        "title": "Sons of the Forest",
        "type": "game",
        "status": "dropped",
        "rating": 6.2,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1326470/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "149",
        "title": "Hearts of Iron IV",
        "type": "game",
        "status": "playing",
        "rating": 5.8,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/394360/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "150",
        "title": "Black Myth: Wukong",
        "type": "game",
        "status": "playing",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "151",
        "title": "Nioh 2",
        "type": "game",
        "status": "dropped",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1301210/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "152",
        "title": "Batman: Arkham Knight",
        "type": "game",
        "status": "planned",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/208650/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "153",
        "title": "God of War Ragnarök",
        "type": "game",
        "status": "completed",
        "rating": 8.3,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "154",
        "title": "Hogwarts Legacy",
        "type": "game",
        "status": "dropped",
        "rating": 4.5,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "155",
        "title": "Rise of the Tomb Raider",
        "type": "game",
        "status": "planned",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/391220/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "156",
        "title": "Shadow of the Tomb Raider",
        "type": "game",
        "status": "planned",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/750920/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "157",
        "title": "Tomb Raider (2013)",
        "type": "game",
        "status": "planned",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/203160/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "158",
        "title": "Red Dead Redemption (1)",
        "type": "game",
        "status": "planned",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2668510/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "159",
        "title": "Infamous Second Son",
        "type": "game",
        "status": "planned",
        "rating": 0,
        "image": "https://upload.wikimedia.org/wikipedia/en/b/b6/Infamous_Second_Son_cover.jpg",
        "notes": ""
    },
    {
        "id": "160",
        "title": "Half-Life",
        "type": "game",
        "status": "completed",
        "rating": 10.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "161",
        "title": "Black Mesa",
        "type": "game",
        "status": "planned",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/362890/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "162",
        "title": "Call of Duty: Modern Warfare (2019)",
        "type": "game",
        "status": "dropped",
        "rating": 3.5,
        "image": "https://upload.wikimedia.org/wikipedia/en/e/e9/CallofDutyModernWarfare%282019%29.jpg",
        "notes": ""
    },
    {
        "id": "163",
        "title": "Call of Duty: Black Ops Cold War",
        "type": "game",
        "status": "planned",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1985810/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "164",
        "title": "Green Hell",
        "type": "game",
        "status": "completed",
        "rating": 4.5,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/815370/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "165",
        "title": "Raft",
        "type": "game",
        "status": "dropped",
        "rating": 5.5,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/648800/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "166",
        "title": "Don't Starve Together",
        "type": "game",
        "status": "dropped",
        "rating": 3.5,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "167",
        "title": "Hollow Knight",
        "type": "game",
        "status": "planned",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "168",
        "title": "Firewatch",
        "type": "game",
        "status": "completed",
        "rating": 9.1,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/383870/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "169",
        "title": "SOMA",
        "type": "game",
        "status": "completed",
        "rating": 9.6,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/282140/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "170",
        "title": "It Takes Two",
        "type": "game",
        "status": "completed",
        "rating": 8.8,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1426210/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "171",
        "title": "A Way Out",
        "type": "game",
        "status": "completed",
        "rating": 9.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222700/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "172",
        "title": "Little Nightmares",
        "type": "game",
        "status": "completed",
        "rating": 8.5,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/424840/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "173",
        "title": "Little Nightmares II",
        "type": "game",
        "status": "completed",
        "rating": 8.2,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/860510/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "174",
        "title": "Elden Ring: Shadow of the Erdtree",
        "type": "game",
        "status": "completed",
        "rating": 10.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2778580/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "175",
        "title": "Assassin's Creed I",
        "type": "game",
        "status": "completed",
        "rating": 7.8,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/15100/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "176",
        "title": "Assassin's Creed II",
        "type": "game",
        "status": "completed",
        "rating": 9.0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/33230/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "177",
        "title": "Assassin's Creed Brotherhood",
        "type": "game",
        "status": "playing",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/48190/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "178",
        "title": "Assassin's Creed III",
        "type": "game",
        "status": "planned",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/208480/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "179",
        "title": "Assassin's Creed Revelations",
        "type": "game",
        "status": "planned",
        "rating": 0,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/201870/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "180",
        "title": "Lethal Company",
        "type": "game",
        "status": "playing",
        "rating": 6.5,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1966720/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "181",
        "title": "Brawlhalla",
        "type": "game",
        "status": "dropped",
        "rating": 4.5,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/329860/library_600x900.jpg",
        "notes": ""
    },
    {
        "id": "182",
        "title": "Goat Simulator 3",
        "type": "game",
        "status": "completed",
        "rating": 5.5,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2144740/library_600x900.jpg",
        "notes": ""
    }
];

let currentView = 'dashboard';

const views = document.querySelectorAll('.view');
const navLinks = document.querySelectorAll('.nav-links li');
const modal = document.getElementById('media-modal');
const searchInput = document.getElementById('global-search');

function initApp() {
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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function renderApp() {
    updateStats();
    renderGrids(searchInput.value.toLowerCase());
}

function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            views.forEach(v => v.classList.remove('active'));
            currentView = link.dataset.view;
            document.getElementById(`view-${currentView}`).classList.add('active');
            
            searchInput.value = '';
            renderGrids();
        });
    });
}

function updateStats() {
    const animes = mediaData.filter(d => d.type === 'anime');
    const games = mediaData.filter(d => d.type === 'game');
    
    document.getElementById('stat-anime').textContent = animes.length;
    document.getElementById('stat-games').textContent = games.length;
    
    const rated = mediaData.filter(d => d.rating > 0);
    const avg = rated.length ? (rated.reduce((sum, item) => sum + parseInt(item.rating), 0) / rated.length).toFixed(1) : 0;
    document.getElementById('stat-rating').innerHTML = `${avg} <i class="ph-fill ph-star" style="color: gold;"></i>`;
}

function renderGrids(searchQuery = '') {
    const recentGrid = document.getElementById('recent-grid');
    const animeGrid = document.getElementById('anime-grid');
    const gameGrid = document.getElementById('game-grid');
    const activeGrid = document.getElementById('active-grid');

    const animeFilter = document.querySelector('#anime-filters .active').dataset.status;
    const gameFilter = document.querySelector('#game-filters .active').dataset.status;

    const createCard = (item) => `
        <div class="card" onclick="openModal('${item.id}')">
            <div class="card-img-wrap">
                <span class="card-status status-${item.status}">${item.status.replace('watching', 'watching').replace('playing', 'playing')}</span>
                <img src="${item.image || 'https://via.placeholder.com/200x300?text=No+Cover'}" alt="${item.title}" loading="lazy">
            </div>
            <div class="card-content">
                <div class="card-title">${item.title}</div>
                <div class="card-rating">
                    ${item.rating > 0 ? `<i class="ph-fill ph-star"></i> ${item.rating}/10` : 'Unrated'}
                </div>
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
        activeGrid.innerHTML = activeItems.map(createCard).join('') || '<p style="grid-column: 1/-1; color: var(--text-secondary);">Nothing currently active.</p>';
    }
}

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

function setupModalEvents() {
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
}

function openModal(id) {
    const item = mediaData.find(d => d.id === id);
    if (!item) return;

    document.getElementById('view-image').src = item.image || 'https://via.placeholder.com/200x300?text=No+Cover';
    document.getElementById('view-title').textContent = item.title;
    
    document.getElementById('view-type').textContent = item.type === 'game' ? 'Video Game' : 'Anime';
    
    const statusEl = document.getElementById('view-status');
    statusEl.textContent = item.status.toUpperCase();
    statusEl.className = `tag status-${item.status}`;
    
    document.getElementById('view-rating').textContent = item.rating > 0 ? item.rating : 'N/A';
    document.getElementById('view-notes').textContent = item.notes ? item.notes : 'No thoughts or review left for this entry yet.';

    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

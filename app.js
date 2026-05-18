/**
 * THE CURATOR — Rebuilt SPA
 * GitHub Pages static deployment
 * Dark cinematic media archive with full navigation, search, filtering, and detail modals
 */

'use strict';

// ═══════════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════════

const MEDIA_DATA = [
  // ── GAMES ─────────────────────────────────────────────────────────────────
  { id:"101", title:"Bloodborne",                              type:"game", status:"playing",   rating:0,    url:"https://store.playstation.com/en-us/product/UP9000-CUSA00207_00-BLOODBORNE0000000", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/2229190/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/2229190/header.jpg", genres:["Action RPG","Souls-like"], year:2015, notes:"" },
  { id:"102", title:"God of War (2018)",                       type:"game", status:"completed", rating:8.5,  url:"https://store.steampowered.com/app/1593500/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg", genres:["Action","Adventure"], year:2018, notes:"" },
  { id:"103", title:"The Last of Us Part I",                   type:"game", status:"playing",   rating:0,    url:"https://store.steampowered.com/app/1888930/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/header.jpg", genres:["Action","Narrative"], year:2022, notes:"" },
  { id:"104", title:"Ghost of Tsushima",                       type:"game", status:"dropped",   rating:6.0,  url:"https://store.steampowered.com/app/2215430/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/2215430/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/2215430/header.jpg", genres:["Open World","Action"], year:2020, notes:"" },
  { id:"105", title:"Horizon Zero Dawn",                       type:"game", status:"dropped",   rating:0,    url:"https://store.steampowered.com/app/1151640/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/header.jpg", genres:["Open World","RPG"], year:2017, notes:"" },
  { id:"106", title:"Forza Horizon 5",                         type:"game", status:"completed", rating:6.0,  url:"https://store.steampowered.com/app/1551360/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg", genres:["Racing","Open World"], year:2021, notes:"" },
  { id:"107", title:"The Witcher 3: Wild Hunt",                type:"game", status:"completed", rating:7.8,  url:"https://store.steampowered.com/app/292030/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg", genres:["RPG","Open World"], year:2015, notes:"" },
  { id:"108", title:"Red Dead Redemption 2",                   type:"game", status:"completed", rating:9.3,  url:"https://store.steampowered.com/app/1174180/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg", genres:["Open World","Narrative"], year:2018, notes:"" },
  { id:"109", title:"Grand Theft Auto V",                      type:"game", status:"completed", rating:7.0,  url:"https://store.steampowered.com/app/271590/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg", genres:["Open World","Action"], year:2013, notes:"" },
  { id:"110", title:"Cyberpunk 2077",                          type:"game", status:"completed", rating:9.0,  url:"https://store.steampowered.com/app/1091500/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg", genres:["RPG","Cyberpunk"], year:2020, notes:"" },
  { id:"111", title:"The Elder Scrolls V: Skyrim",             type:"game", status:"dropped",   rating:0,    url:"https://store.steampowered.com/app/489830/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/489830/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg", genres:["RPG","Open World"], year:2011, notes:"" },
  { id:"112", title:"Half-Life 2",                             type:"game", status:"completed", rating:9.6,  url:"https://store.steampowered.com/app/220/",     image:"https://cdn.cloudflare.steamstatic.com/steam/apps/220/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/220/header.jpg", genres:["FPS","Sci-Fi"], year:2004, notes:"" },
  { id:"113", title:"Portal 2",                                type:"game", status:"completed", rating:8.8,  url:"https://store.steampowered.com/app/620/",     image:"https://cdn.cloudflare.steamstatic.com/steam/apps/620/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg", genres:["Puzzle","Co-op"], year:2011, notes:"" },
  { id:"114", title:"Dishonored",                              type:"game", status:"completed", rating:8.5,  url:"https://store.steampowered.com/app/205100/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/205100/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/205100/header.jpg", genres:["Stealth","Immersive Sim"], year:2012, notes:"" },
  { id:"115", title:"Dark Souls",                              type:"game", status:"completed", rating:10.0, url:"https://store.steampowered.com/app/570940/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/570940/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/570940/header.jpg", genres:["Action RPG","Souls-like"], year:2011, notes:"" },
  { id:"116", title:"Dark Souls III",                          type:"game", status:"completed", rating:9.8,  url:"https://store.steampowered.com/app/374320/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/374320/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg", genres:["Action RPG","Souls-like"], year:2016, notes:"" },
  { id:"117", title:"Elden Ring",                              type:"game", status:"completed", rating:9.9,  url:"https://store.steampowered.com/app/1245620/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg", genres:["Action RPG","Open World"], year:2022, notes:"" },
  { id:"118", title:"Sekiro: Shadows Die Twice",               type:"game", status:"completed", rating:10.0, url:"https://store.steampowered.com/app/814380/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg", genres:["Action","Stealth"], year:2019, notes:"" },
  { id:"119", title:"Baldur's Gate 3",                         type:"game", status:"dropped",   rating:0,    url:"https://store.steampowered.com/app/1086940/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg", genres:["CRPG","Strategy"], year:2023, notes:"" },
  { id:"120", title:"World of Warcraft: Wrath of the Lich King", type:"game", status:"completed", rating:9.5, url:"https://worldofwarcraft.blizzard.com/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/2835570/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/2835570/header.jpg", genres:["MMORPG","Fantasy"], year:2008, notes:"" },
  { id:"121", title:"Genshin Impact",                          type:"game", status:"dropped",   rating:0,    url:"https://genshin.hoyoverse.com/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/header.jpg", genres:["Action RPG","Gacha"], year:2020, notes:"" },
  { id:"122", title:"Terraria",                                type:"game", status:"completed", rating:7.5,  url:"https://store.steampowered.com/app/105600/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/105600/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg", genres:["Sandbox","Survival"], year:2011, notes:"" },
  { id:"123", title:"Minecraft",                               type:"game", status:"completed", rating:8.5,  url:"https://www.minecraft.net/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/header.jpg", genres:["Sandbox","Survival"], year:2011, notes:"" },
  { id:"124", title:"Outer Wilds",                             type:"game", status:"completed", rating:10.0, url:"https://store.steampowered.com/app/753640/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/753640/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/753640/header.jpg", genres:["Exploration","Puzzle"], year:2019, notes:"" },
  { id:"125", title:"StarCraft II",                            type:"game", status:"completed", rating:8.0,  url:"https://starcraft2.blizzard.com/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/2816190/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/2816190/header.jpg", genres:["RTS","Sci-Fi"], year:2010, notes:"" },
  { id:"126", title:"Counter-Strike 2",                        type:"game", status:"playing",   rating:8.5,  url:"https://store.steampowered.com/app/730/",     image:"https://cdn.cloudflare.steamstatic.com/steam/apps/730/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg", genres:["FPS","Tactical Shooter"], year:2023, notes:"" },
  { id:"127", title:"Valorant",                                type:"game", status:"playing",   rating:8.4,  url:"https://playvalorant.com/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/2589480/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/2589480/header.jpg", genres:["FPS","Hero Shooter"], year:2020, notes:"" },
  { id:"128", title:"League of Legends",                       type:"game", status:"playing",   rating:0,    url:"https://www.leagueoflegends.com/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/2300530/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/2300530/header.jpg", genres:["MOBA","Strategy"], year:2009, notes:"" },
  { id:"129", title:"Fortnite",                                type:"game", status:"playing",   rating:9.9,  url:"https://www.fortnite.com/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1677740/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1677740/header.jpg", genres:["Battle Royale","Shooter"], year:2017, notes:"" },
  { id:"130", title:"Overwatch 2",                             type:"game", status:"dropped",   rating:1.0,  url:"https://store.steampowered.com/app/2357570/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/2357570/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/2357570/header.jpg", genres:["Hero Shooter","FPS"], year:2022, notes:"" },
  { id:"131", title:"Rocket League",                           type:"game", status:"dropped",   rating:4.0,  url:"https://store.steampowered.com/app/252950/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/252950/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg", genres:["Sports","Driving"], year:2015, notes:"" },
  { id:"132", title:"Rainbow Six Siege",                       type:"game", status:"dropped",   rating:6.5,  url:"https://store.steampowered.com/app/359550/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/359550/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/359550/header.jpg", genres:["FPS","Tactical Shooter"], year:2015, notes:"" },
  { id:"133", title:"Call of Duty: Warzone",                   type:"game", status:"dropped",   rating:6.0,  url:"https://www.callofduty.com/warzone", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg", genres:["Battle Royale","FPS"], year:2020, notes:"" },
  { id:"134", title:"Super Mario 64",                          type:"game", status:"completed", rating:8.0,  url:"https://www.nintendo.com/store/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/header.jpg", genres:["Platformer","Adventure"], year:1996, notes:"" },
  { id:"135", title:"Dark Souls II: Scholar of the First Sin", type:"game", status:"planned",   rating:0,    url:"https://store.steampowered.com/app/335300/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/335300/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/335300/header.jpg", genres:["Action RPG","Souls-like"], year:2015, notes:"" },
  { id:"136", title:"Lies of P",                               type:"game", status:"playing",   rating:0,    url:"https://store.steampowered.com/app/1627720/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1627720/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1627720/header.jpg", genres:["Action RPG","Souls-like"], year:2023, notes:"" },
  { id:"137", title:"Nioh",                                    type:"game", status:"dropped",   rating:3.0,  url:"https://store.steampowered.com/app/485510/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/485510/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/485510/header.jpg", genres:["Action RPG","Souls-like"], year:2017, notes:"" },
  { id:"138", title:"Sifu",                                    type:"game", status:"completed", rating:7.8,  url:"https://store.steampowered.com/app/2138710/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/2138710/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/2138710/header.jpg", genres:["Action","Beat 'em up"], year:2022, notes:"" },
  { id:"139", title:"Cyberpunk 2077: Phantom Liberty",         type:"game", status:"completed", rating:9.0,  url:"https://store.steampowered.com/app/2138330/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/2138330/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/2138330/header.jpg", genres:["RPG","Cyberpunk"], year:2023, notes:"" },
  { id:"140", title:"Hell Let Loose",                          type:"game", status:"dropped",   rating:5.6,  url:"https://store.steampowered.com/app/686810/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/686810/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/686810/header.jpg", genres:["FPS","Tactical Shooter"], year:2021, notes:"" },
  { id:"141", title:"Far Cry 3",                               type:"game", status:"completed", rating:9.7,  url:"https://store.steampowered.com/app/220240/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/220240/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/220240/header.jpg", genres:["FPS","Open World"], year:2012, notes:"" },
  { id:"142", title:"Deep Rock Galactic",                      type:"game", status:"dropped",   rating:6.7,  url:"https://store.steampowered.com/app/548430/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/548430/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/548430/header.jpg", genres:["Co-op","FPS"], year:2020, notes:"" },
  { id:"143", title:"Alien: Isolation",                        type:"game", status:"completed", rating:8.7,  url:"https://store.steampowered.com/app/214490/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/214490/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/214490/header.jpg", genres:["Horror","Stealth"], year:2014, notes:"" },
  { id:"144", title:"Outlast",                                 type:"game", status:"completed", rating:9.3,  url:"https://store.steampowered.com/app/238320/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/238320/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/238320/header.jpg", genres:["Horror","Survival"], year:2013, notes:"" },
  { id:"145", title:"Phasmophobia",                            type:"game", status:"dropped",   rating:3.2,  url:"https://store.steampowered.com/app/739630/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/739630/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/739630/header.jpg", genres:["Horror","Co-op"], year:2020, notes:"" },
  { id:"146", title:"Valheim",                                 type:"game", status:"dropped",   rating:6.9,  url:"https://store.steampowered.com/app/892970/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/892970/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/892970/header.jpg", genres:["Survival","Sandbox"], year:2021, notes:"" },
  { id:"147", title:"The Forest",                              type:"game", status:"completed", rating:7.8,  url:"https://store.steampowered.com/app/242760/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/242760/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/242760/header.jpg", genres:["Survival","Horror"], year:2014, notes:"" },
  { id:"148", title:"Sons of the Forest",                      type:"game", status:"dropped",   rating:6.2,  url:"https://store.steampowered.com/app/1326470/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1326470/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1326470/header.jpg", genres:["Survival","Horror"], year:2024, notes:"" },
  { id:"149", title:"Hearts of Iron IV",                       type:"game", status:"playing",   rating:5.8,  url:"https://store.steampowered.com/app/394360/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/394360/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/394360/header.jpg", genres:["Grand Strategy","Simulation"], year:2016, notes:"" },
  { id:"150", title:"Black Myth: Wukong",                      type:"game", status:"playing",   rating:0,    url:"https://store.steampowered.com/app/2358720/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/header.jpg", genres:["Action RPG","Mythology"], year:2024, notes:"" },
  { id:"151", title:"Nioh 2",                                  type:"game", status:"dropped",   rating:0,    url:"https://store.steampowered.com/app/1301210/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1301210/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1301210/header.jpg", genres:["Action RPG","Souls-like"], year:2020, notes:"" },
  { id:"152", title:"Batman: Arkham Knight",                   type:"game", status:"planned",   rating:0,    url:"https://store.steampowered.com/app/208650/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/208650/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/208650/header.jpg", genres:["Action","Open World"], year:2015, notes:"" },
  { id:"153", title:"God of War Ragnarök",                     type:"game", status:"completed", rating:8.3,  url:"https://store.steampowered.com/app/2322010/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/header.jpg", genres:["Action","Adventure"], year:2022, notes:"" },
  { id:"154", title:"Hogwarts Legacy",                         type:"game", status:"dropped",   rating:4.5,  url:"https://store.steampowered.com/app/990080/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg", genres:["Action RPG","Open World"], year:2023, notes:"" },
  { id:"155", title:"Rise of the Tomb Raider",                 type:"game", status:"planned",   rating:0,    url:"https://store.steampowered.com/app/391220/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/391220/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/391220/header.jpg", genres:["Action","Adventure"], year:2015, notes:"" },
  { id:"156", title:"Shadow of the Tomb Raider",               type:"game", status:"planned",   rating:0,    url:"https://store.steampowered.com/app/750920/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/750920/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/750920/header.jpg", genres:["Action","Adventure"], year:2018, notes:"" },
  { id:"157", title:"Tomb Raider (2013)",                      type:"game", status:"planned",   rating:0,    url:"https://store.steampowered.com/app/203160/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/203160/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/203160/header.jpg", genres:["Action","Adventure"], year:2013, notes:"" },
  { id:"158", title:"Red Dead Redemption",                     type:"game", status:"planned",   rating:0,    url:"https://store.steampowered.com/app/2668510/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/2668510/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/2668510/header.jpg", genres:["Open World","Action"], year:2010, notes:"" },
  { id:"159", title:"Infamous Second Son",                     type:"game", status:"planned",   rating:0,    url:"https://store.playstation.com/en-us/product/UP9000-CUSA01623_00-INFAMOUSSECONDSON", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg", genres:["Action","Open World"], year:2014, notes:"" },
  { id:"160", title:"Half-Life",                               type:"game", status:"completed", rating:10.0, url:"https://store.steampowered.com/app/70/",      image:"https://cdn.cloudflare.steamstatic.com/steam/apps/70/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/70/header.jpg", genres:["FPS","Sci-Fi"], year:1998, notes:"" },
  { id:"161", title:"Black Mesa",                              type:"game", status:"planned",   rating:0,    url:"https://store.steampowered.com/app/362890/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/362890/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/362890/header.jpg", genres:["FPS","Sci-Fi"], year:2020, notes:"" },
  { id:"162", title:"Call of Duty: Modern Warfare (2019)",     type:"game", status:"dropped",   rating:3.5,  url:"https://www.callofduty.com/modernwarfare", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/393080/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/393080/header.jpg", genres:["FPS","Multiplayer"], year:2019, notes:"" },
  { id:"163", title:"Call of Duty: Black Ops Cold War",        type:"game", status:"planned",   rating:0,    url:"https://www.callofduty.com/blackopscoldwar", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg", genres:["FPS","Multiplayer"], year:2020, notes:"" },
  { id:"164", title:"Green Hell",                              type:"game", status:"completed", rating:4.5,  url:"https://store.steampowered.com/app/815370/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/815370/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/815370/header.jpg", genres:["Survival","Open World"], year:2019, notes:"" },
  { id:"165", title:"Raft",                                    type:"game", status:"dropped",   rating:5.5,  url:"https://store.steampowered.com/app/648800/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/648800/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/648800/header.jpg", genres:["Survival","Co-op"], year:2022, notes:"" },
  { id:"166", title:"Don't Starve Together",                   type:"game", status:"dropped",   rating:3.5,  url:"https://store.steampowered.com/app/322330/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/322330/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/322330/header.jpg", genres:["Survival","Co-op"], year:2016, notes:"" },
  { id:"167", title:"Hollow Knight",                           type:"game", status:"planned",   rating:0,    url:"https://store.steampowered.com/app/367520/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/367520/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg", genres:["Metroidvania","Action"], year:2017, notes:"" },
  { id:"168", title:"Firewatch",                               type:"game", status:"completed", rating:9.1,  url:"https://store.steampowered.com/app/383870/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/383870/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/383870/header.jpg", genres:["Narrative","Adventure"], year:2016, notes:"" },
  { id:"169", title:"SOMA",                                    type:"game", status:"completed", rating:9.6,  url:"https://store.steampowered.com/app/282140/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/282140/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/282140/header.jpg", genres:["Horror","Sci-Fi"], year:2015, notes:"A haunting meditation on consciousness and identity. The ending is unforgettable." },
  { id:"170", title:"It Takes Two",                            type:"game", status:"completed", rating:8.8,  url:"https://store.steampowered.com/app/1426210/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/header.jpg", genres:["Co-op","Platformer"], year:2021, notes:"" },
  { id:"171", title:"A Way Out",                               type:"game", status:"completed", rating:9.0,  url:"https://store.steampowered.com/app/1222700/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1222700/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1222700/header.jpg", genres:["Co-op","Action"], year:2018, notes:"" },
  { id:"172", title:"Little Nightmares",                       type:"game", status:"completed", rating:8.5,  url:"https://store.steampowered.com/app/424840/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/424840/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/424840/header.jpg", genres:["Horror","Platformer"], year:2017, notes:"" },
  { id:"173", title:"Little Nightmares II",                    type:"game", status:"completed", rating:8.2,  url:"https://store.steampowered.com/app/860510/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/860510/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/860510/header.jpg", genres:["Horror","Platformer"], year:2021, notes:"" },
  { id:"174", title:"Elden Ring: Shadow of the Erdtree",       type:"game", status:"completed", rating:10.0, url:"https://store.steampowered.com/app/2778580/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/2778580/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/2778580/header.jpg", genres:["Action RPG","Dark Fantasy"], year:2024, notes:"" },
  { id:"175", title:"Assassin's Creed",                        type:"game", status:"completed", rating:7.8,  url:"https://store.steampowered.com/app/15100/",   image:"https://cdn.cloudflare.steamstatic.com/steam/apps/15100/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/15100/header.jpg", genres:["Action","Stealth"], year:2007, notes:"" },
  { id:"176", title:"Assassin's Creed II",                     type:"game", status:"completed", rating:9.0,  url:"https://store.steampowered.com/app/33230/",   image:"https://cdn.cloudflare.steamstatic.com/steam/apps/33230/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/33230/header.jpg", genres:["Action","Open World"], year:2009, notes:"" },
  { id:"177", title:"Assassin's Creed Brotherhood",            type:"game", status:"playing",   rating:0,    url:"https://store.steampowered.com/app/48190/",   image:"https://cdn.cloudflare.steamstatic.com/steam/apps/48190/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/48190/header.jpg", genres:["Action","Open World"], year:2010, notes:"" },
  { id:"178", title:"Assassin's Creed III",                    type:"game", status:"planned",   rating:0,    url:"https://store.steampowered.com/app/208480/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/208480/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/208480/header.jpg", genres:["Action","Open World"], year:2012, notes:"" },
  { id:"179", title:"Assassin's Creed Revelations",            type:"game", status:"planned",   rating:0,    url:"https://store.steampowered.com/app/201870/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/201870/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/201870/header.jpg", genres:["Action","Open World"], year:2011, notes:"" },
  { id:"180", title:"Lethal Company",                          type:"game", status:"playing",   rating:6.5,  url:"https://store.steampowered.com/app/1966720/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/1966720/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/1966720/header.jpg", genres:["Horror","Co-op"], year:2023, notes:"" },
  { id:"181", title:"Brawlhalla",                              type:"game", status:"dropped",   rating:4.5,  url:"https://store.steampowered.com/app/329860/",  image:"https://cdn.cloudflare.steamstatic.com/steam/apps/329860/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/329860/header.jpg", genres:["Fighting","Multiplayer"], year:2014, notes:"" },
  { id:"182", title:"Goat Simulator 3",                        type:"game", status:"completed", rating:5.5,  url:"https://store.steampowered.com/app/2144740/", image:"https://cdn.cloudflare.steamstatic.com/steam/apps/2144740/library_600x900.jpg", banner:"https://cdn.cloudflare.steamstatic.com/steam/apps/2144740/header.jpg", genres:["Sandbox","Comedy"], year:2022, notes:"" },

  // ── ANIME ─────────────────────────────────────────────────────────────────
  { id:"901", title:"Attack on Titan",  type:"anime", status:"completed", rating:9.8, url:"https://www.crunchyroll.com/series/GR751KNZY/attack-on-titan", image:"https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg", banner:"https://image.tmdb.org/t/p/original/sHm84HNvFBaRq3DhFPRQLEVfS4p.jpg", genres:["Action","Dark Fantasy"], year:2013, notes:"Masterpiece of foreshadowing. Flawless narrative structure with one of the best endings in anime." },
  { id:"902", title:"Jujutsu Kaisen",   type:"anime", status:"playing",   rating:8.5, url:"https://www.crunchyroll.com/series/GRDV0019R/jujutsu-kaisen",  image:"https://image.tmdb.org/t/p/w500/lHu1wtNaczFLHCsErJb4bxYWlFd.jpg", banner:"https://image.tmdb.org/t/p/original/70DP4YxkFJvtUE7RKfGQpgkYjP5.jpg", genres:["Action","Supernatural"], year:2020, notes:"" },
  { id:"903", title:"Death Note",       type:"anime", status:"completed", rating:9.0, url:"https://www.crunchyroll.com/series/G6NQ5DWZ6/death-note",      image:"https://image.tmdb.org/t/p/w500/iigTFcVRGPKoilD0gXBHqNKUl2p.jpg", banner:"https://image.tmdb.org/t/p/original/5oATbzMNOaYPBj8x9lBVRcOtv8.jpg", genres:["Psychological Thriller","Mystery"], year:2006, notes:"A psychological cat-and-mouse thriller that defines the genre. Light vs L is unmatched." },

  // ── TV SHOWS ──────────────────────────────────────────────────────────────
  { id:"904", title:"Arcane",           type:"tv",    status:"completed", rating:10,  url:"https://www.netflix.com/title/81435684", image:"https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg", banner:"https://image.tmdb.org/t/p/original/rkB4LyZHo1NHXk04D5NbA1O6WdC.jpg", genres:["Sci-Fi","Action"], year:2021, notes:"The gold standard for video game adaptations. Animation is groundbreaking. Every frame is a painting." },

  // ── MOVIES ────────────────────────────────────────────────────────────────
  { id:"801", title:"Interstellar",     type:"movie", status:"completed", rating:10,  url:"https://www.imdb.com/title/tt0816692/", image:"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", banner:"https://image.tmdb.org/t/p/original/xJHokMbljvjIGRadGZ04HUcQpsQ.jpg", genres:["Sci-Fi","Drama"], year:2014, notes:"Visually stunning. Zimmer's score is transcendental. The docking scene is cinema perfection." },
  { id:"802", title:"Dune: Part Two",   type:"movie", status:"completed", rating:9.5, url:"https://www.imdb.com/title/tt15239678/", image:"https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", banner:"https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vtec02Npc044K.jpg", genres:["Sci-Fi","Epic"], year:2024, notes:"Denis Villeneuve cements himself as the greatest living sci-fi director. Every frame is immaculate." },
];

// ─── NAV CONFIG ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { view: 'home',     icon: 'ph-house-simple',  label: 'Home',     mobile: true },
  { view: 'games',    icon: 'ph-game-controller',label: 'Games',   mobile: true },
  { view: 'movies',   icon: 'ph-film-strip',     label: 'Movies',  mobile: true },
  { view: 'anime',    icon: 'ph-star-four',      label: 'Anime',   mobile: true },
  { view: 'tv',       icon: 'ph-monitor-play',   label: 'TV',      mobile: true },
  { view: 'stats',    icon: 'ph-chart-bar',      label: 'Stats',   mobile: false },
  { view: 'favorites',icon: 'ph-heart',          label: 'Favs',    mobile: false },
  { view: 'socials',  icon: 'ph-link-simple',    label: 'Socials', mobile: true },
];

const SIDEBAR_BROWSE = [
  { view: 'home',   icon: 'ph-house-simple',   label: 'Home' },
  { view: 'games',  icon: 'ph-game-controller',label: 'Games' },
  { view: 'movies', icon: 'ph-film-strip',      label: 'Movies' },
  { view: 'anime',  icon: 'ph-star-four',       label: 'Anime' },
  { view: 'tv',     icon: 'ph-monitor-play',    label: 'TV Shows' },
];

const LIBRARY_CONFIG = {
  games:  { type: 'game',  title: 'Game Archive',    sub: 'Every game played, rated, and reviewed.', eyebrow: 'GAMING' },
  movies: { type: 'movie', title: 'Film Library',    sub: 'Cinematic reviews and personal ratings.', eyebrow: 'CINEMA' },
  anime:  { type: 'anime', title: 'Anime Series',    sub: 'Episodic animated narratives.',           eyebrow: 'ANIME' },
  tv:     { type: 'tv',    title: 'TV Shows',        sub: 'Live-action episodic content.',            eyebrow: 'TELEVISION' },
};

const SOCIALS = [
  { name:'YouTube',  sub:'Video Content',   icon:'ph-fill ph-youtube-logo', color:'#FF0000', url:'#' },
  { name:'Discord',  sub:'Community Server',icon:'ph-fill ph-discord-logo', color:'#5865F2', url:'#' },
  { name:'GitHub',   sub:'Open Source',     icon:'ph-fill ph-github-logo',  color:'#e6edf3', url:'#' },
  { name:'Steam',    sub:'Gaming Profile',  icon:'ph-fill ph-steam-logo',   color:'#66c0f4', url:'#' },
  { name:'Twitch',   sub:'Live Streams',    icon:'ph-fill ph-twitch-logo',  color:'#9146FF', url:'#' },
  { name:'X / Twitter',sub:'Updates',       icon:'ph-fill ph-twitter-logo', color:'#1D9BF0', url:'#' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function statusLabel(item) {
  const map = { playing: item.type === 'game' ? 'Playing' : 'Watching', completed:'Completed', planned:'Planned', dropped:'Dropped' };
  return map[item.status] || 'Unknown';
}

function typeLabel(type) {
  const map = { game:'Game', movie:'Movie', anime:'Anime', tv:'TV Show' };
  return map[type] || type;
}

function ratingStars(rating) {
  const filled = Math.round(rating / 2);
  return Array.from({length:5}, (_,i) =>
    `<i class="ph${i < filled ? '-fill' : ''} ph-star"></i>`
  ).join('');
}

function fallbackSvg(title='') {
  const t = esc(title || 'No Image'); 
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900"><rect fill="#12121f" width="600" height="900"/><text fill="#4a4a6a" font-family="sans-serif" font-size="16" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">${t}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function imgWithFallback(src, title, el) {
  if (!src) { el.src = fallbackSvg(title); return; }
  el.onerror = () => { el.src = fallbackSvg(title); };
  el.src = src;
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP CLASS
// ═══════════════════════════════════════════════════════════════════════════════

class CuratorApp {
  constructor() {
    this.data = this._normalizeData(MEDIA_DATA);
    this.state = {
      view: 'home',
      librarySection: 'games',
      filterStatus: 'all',
      sortBy: 'default',
      layout: 'grid',
    };
    this._heroIndex = 0;
    this._heroTimer = null;
    this._modalOpen = false;
    this._heroItems = [];
    this._searchDebounce = null;

    this._buildNav();
    this._bindGlobalEvents();
    this._boot();
  }

  _normalizeData(arr) {
    return arr.map(d => ({
      id: String(d.id),
      title: d.title || 'Unknown',
      type: String(d.type || 'game'),
      status: this._normStatus(d.status),
      rating: parseFloat(d.rating) || 0,
      url: d.url || null,
      image: d.image || '',
      banner: d.banner || d.image || '', // <-- Added banner support (falls back to cover image)
      genres: Array.isArray(d.genres) ? d.genres : [],
      year: d.year || '',
      notes: d.notes || '',
    }));
  }

  _normStatus(s) {
    s = String(s||'').toLowerCase();
    if (s === 'watching') return 'playing';
    return ['playing','completed','planned','dropped'].includes(s) ? s : 'planned';
  }

  _buildNav() {
    const sidebarList = document.getElementById('sidebar-nav-list');
    if (sidebarList) {
      sidebarList.innerHTML = SIDEBAR_BROWSE.map(n => `
        <li class="sidebar-nav-item" data-view="${n.view}" role="listitem" tabindex="0">
          <i class="ph ${n.icon}"></i><span>${n.label}</span>
        </li>
      `).join('');
    }

    const drawerList = document.getElementById('drawer-nav-list');
    if (drawerList) {
      drawerList.innerHTML = NAV_ITEMS.map(n => `
        <li class="drawer-nav-item" data-view="${n.view}">
          <i class="ph ${n.icon}"></i><span>${n.label}</span>
        </li>
      `).join('');
    }

    const bnav = document.getElementById('bottom-nav');
    if (bnav) {
      bnav.innerHTML = NAV_ITEMS.filter(n => n.mobile).map(n => `
        <button class="bnav-item" data-view="${n.view}" aria-label="${n.label}">
          <i class="ph ${n.icon}"></i><span>${n.label}</span>
        </button>
      `).join('');
    }

    const sg = document.getElementById('socials-grid');
    if (sg) {
      sg.innerHTML = SOCIALS.map(s => `
        <a href="${s.url}" class="social-tile" target="_blank" rel="noopener noreferrer">
          <span class="social-icon" style="--scolor:${s.color}"><i class="${s.icon}"></i></span>
          <div class="social-info"><strong>${esc(s.name)}</strong><span>${esc(s.sub)}</span></div>
          <i class="ph ph-arrow-up-right social-arrow"></i>
        </a>
      `).join('');
    }
  }

  _boot() {
    const loader = document.getElementById('app-loader');
    setTimeout(() => {
      loader && loader.classList.add('fade-out');
      setTimeout(() => loader && loader.classList.add('hidden'), 500);
    }, 300);

    const hash = location.hash.replace('#','');
    const validViews = ['home','games','movies','anime','tv','stats','favorites','socials'];
    this._navigateTo(validViews.includes(hash) ? hash : 'home');
  }

  _navigateTo(viewKey) {
    this.state.view = viewKey;
    location.hash = viewKey; // Fixed: Standardized hash routing for all pages

    document.querySelectorAll('[data-view]').forEach(el => {
      el.classList.toggle('active', el.dataset.view === viewKey);
    });

    this._closeDrawer();

    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));

    const isLibrary = ['games','movies','anime','tv'].includes(viewKey);
    const viewId = isLibrary ? 'view-library' : `view-${viewKey}`;
    const viewEl = document.getElementById(viewId);
    if (viewEl) viewEl.classList.remove('hidden');

    if (viewKey === 'home') {
      this._renderHome();
    } else if (isLibrary) {
      this.state.librarySection = viewKey;
      this.state.filterStatus = 'all';
      this.state.sortBy = 'default';
      this.state.layout = 'grid';
      this._resetLibraryControls();
      this._renderLibrary();
    } else if (viewKey === 'stats') {
      this._renderStats();
    } else if (viewKey === 'favorites') {
      this._renderFavorites();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  _resetLibraryControls() {
    const sortSel = document.getElementById('sort-select');
    if (sortSel) sortSel.value = 'default';
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.toggle('active', p.dataset.status === 'all'));
    document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.layout === 'grid'));
    const grid = document.getElementById('library-grid');
    if (grid) { grid.classList.remove('list-layout'); }
  }

  _renderHome() {
    this._renderHero();
    this._renderTicker();
    this._renderRecentGrid();
    this._renderTopRatedGrid();

    document.querySelectorAll('.section-more-btn').forEach(btn => {
      btn.onclick = () => this._navigateTo(btn.dataset.target || 'games');
    });
  }

 _renderHero() {
  const zone = document.getElementById('hero-zone');
  if (!zone) return;

  this._heroItems = this.data
    .filter(d => d.rating >= 8.5)
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  if (!this._heroItems.length) { zone.innerHTML = ''; return; }

  const slidesHtml = this._heroItems.map((item) => `
    <div class="hero-slide" style="background-image: url('${item.banner || item.image}')">
      <div class="hero-gradient"></div>
      <div class="hero-content">
        <div class="hero-type-badge bounce-in">
          <i class="ph ph-${item.type === 'game' ? 'game-controller' : item.type === 'movie' ? 'film-strip' : item.type === 'anime' ? 'star-four' : 'monitor-play'}"></i>
          ${typeLabel(item.type)}
        </div>
        <h1 class="hero-title slide-up">${esc(item.title)}</h1>
        <div class="hero-genres slide-up-delay-1">${item.genres.slice(0,3).map(g=>`<span class="hero-genre-pill">${esc(g)}</span>`).join('')}</div>
        ${item.notes ? `<p class="hero-notes slide-up-delay-2">${esc(item.notes)}</p>` : ''}
        <div class="hero-actions slide-up-delay-3">
          <button class="hero-btn hero-btn-primary" data-id="${item.id}">
            <i class="ph ph-info"></i> View Details
          </button>
          ${item.rating > 0 ? `<div class="hero-rating-chip"><i class="ph-fill ph-star"></i>${item.rating.toFixed(1)}</div>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  const dotsHtml = this._heroItems.map((_,i) =>
    `<span class="hero-dot${i===0?' active':''}" data-i="${i}"></span>`
  ).join('');

  zone.innerHTML = `
    <div class="hero-slider-viewport">
      <div class="hero-slider-track" id="hero-slider-track">
        ${slidesHtml}
      </div>
    </div>
    <button class="hero-nav-arrow hero-prev" id="hero-prev" aria-label="Previous Slide"><i class="ph ph-caret-left"></i></button>
    <button class="hero-nav-arrow hero-next" id="hero-next" aria-label="Next Slide"><i class="ph ph-caret-right"></i></button>
    <div class="hero-dots">${dotsHtml}</div>
  `;

  zone.querySelectorAll('.hero-btn-primary').forEach(btn => {
    btn.onclick = () => this._openModal(btn.dataset.id);
  });
  zone.querySelectorAll('.hero-dot').forEach(dot => {
    dot.onclick = () => this._setHero(parseInt(dot.dataset.i));
  });
  document.getElementById('hero-prev').onclick = () => this._setHero(this._heroIndex - 1);
  document.getElementById('hero-next').onclick = () => this._setHero(this._heroIndex + 1);

  this._heroIndex = 0;
  this._updateHeroUI();
  clearInterval(this._heroTimer);
  this._heroTimer = setInterval(() => this._setHero(this._heroIndex + 1), 6000);
}

  _setHero(idx) {
    if (!this._heroItems.length) return;
    
    // Clear existing timer so manual clicks don't result in double-skips
    clearInterval(this._heroTimer);
    
    // Handle infinite wrap-around logic
    idx = ((idx % this._heroItems.length) + this._heroItems.length) % this._heroItems.length;
    this._heroIndex = idx;
    
    this._updateHeroUI();

    // Restart the auto-slide timer
    this._heroTimer = setInterval(() => this._setHero(this._heroIndex + 1), 6000);
  }

  _updateHeroUI() {
  const track = document.getElementById('hero-slider-track');
  if (track) {
    track.style.transform = `translateX(-${this._heroIndex * 100}%)`;
  }

  document.querySelectorAll('.hero-dot').forEach((d, i) => {
    d.classList.toggle('active', i === this._heroIndex);
  });

  const slides = document.querySelectorAll('.hero-slide');
  slides.forEach(slide => slide.classList.remove('animate-active'));

  setTimeout(() => {
    const activeSlide = slides[this._heroIndex];
    if (activeSlide) activeSlide.classList.add('animate-active');
  }, 100);
}

  _renderTicker() {
    const ticker = document.getElementById('stats-ticker');
    if (!ticker) return;
    const total = this.data.length;
    const completed = this.data.filter(d => d.status === 'completed').length;
    const rated = this.data.filter(d => d.rating > 0);
    const avgRating = rated.length ? (rated.reduce((a,d)=>a+d.rating,0)/rated.length).toFixed(1) : '—';
    const games = this.data.filter(d => d.type === 'game').length;
    const shows = this.data.filter(d => ['anime','tv','movie'].includes(d.type)).length;
    const perfect = this.data.filter(d => d.rating === 10).length;

    ticker.innerHTML = [
      { val: total,      label: 'Total Entries' },
      { val: completed,  label: 'Completed' },
      { val: avgRating,  label: 'Avg Rating' },
      { val: games,      label: 'Games' },
      { val: shows,      label: 'Films & Shows' },
      { val: perfect,    label: 'Perfect 10s' },
    ].map(s => `
      <div class="stats-ticker-item">
        <div class="stats-ticker-value">${s.val}</div>
        <div class="stats-ticker-label">${s.label}</div>
      </div>
    `).join('');
  }

  _renderRecentGrid() {
    const grid = document.getElementById('recent-grid');
    if (!grid) return;
    const items = [...this.data].slice(0, 12);
    grid.innerHTML = items.map(item => this._cardHtml(item)).join('');
    this._bindCardClicks(grid);
  }

  _renderTopRatedGrid() {
    const grid = document.getElementById('toprated-grid');
    if (!grid) return;
    const items = [...this.data]
      .filter(d => d.rating >= 9)
      .sort((a,b) => b.rating - a.rating)
      .slice(0, 10);
    grid.innerHTML = items.map(item => this._cardHtml(item)).join('');
    this._bindCardClicks(grid);
  }

  _renderLibrary() {
    const cfg = LIBRARY_CONFIG[this.state.librarySection];
    if (!cfg) return;

    document.getElementById('library-eyebrow').textContent = cfg.eyebrow;
    document.getElementById('library-title').textContent   = cfg.title;
    document.getElementById('library-sub').textContent     = cfg.sub;

    const pillsWrap = document.getElementById('filter-pills');
    if (pillsWrap) {
      const statuses = ['all','playing','completed','planned','dropped'];
      pillsWrap.innerHTML = statuses.map(s => `
        <button class="filter-pill${s === this.state.filterStatus ? ' active' : ''}" data-status="${s}">
          ${s === 'all' ? 'All' : s === 'playing' ? (cfg.type === 'game' ? 'Playing' : 'Watching') : s.charAt(0).toUpperCase()+s.slice(1)}
        </button>
      `).join('');
      pillsWrap.querySelectorAll('.filter-pill').forEach(pill => {
        pill.onclick = () => {
          this.state.filterStatus = pill.dataset.status;
          pillsWrap.querySelectorAll('.filter-pill').forEach(p => p.classList.toggle('active', p === pill));
          this._renderLibraryGrid();
        };
      });
    }

    this._renderLibraryGrid();
  }

  _renderLibraryGrid() {
    const cfg = LIBRARY_CONFIG[this.state.librarySection];
    let items = this.data.filter(d => d.type === cfg.type);

    if (this.state.filterStatus !== 'all') {
      items = items.filter(d => d.status === this.state.filterStatus);
    }

    switch (this.state.sortBy) {
      case 'rating-high': items.sort((a,b) => b.rating - a.rating); break;
      case 'rating-low':  items.sort((a,b) => a.rating - b.rating); break;
      case 'title-asc':   items.sort((a,b) => a.title.localeCompare(b.title)); break;
      case 'title-desc':  items.sort((a,b) => b.title.localeCompare(a.title)); break;
      case 'year-new':    items.sort((a,b) => (b.year||0) - (a.year||0)); break;
      case 'year-old':    items.sort((a,b) => (a.year||0) - (b.year||0)); break;
    }

    document.getElementById('library-count-display').textContent = items.length;
    const resultCount = document.getElementById('result-count');
    if (resultCount) resultCount.innerHTML = `Showing <span>${items.length}</span> ${items.length === 1 ? 'entry' : 'entries'}`;

    const grid  = document.getElementById('library-grid');
    const empty = document.getElementById('empty-state');
    if (!grid) return;

    if (!items.length) {
      grid.innerHTML = '';
      empty?.classList.remove('hidden');
      return;
    }
    empty?.classList.add('hidden');

    const isListLayout = this.state.layout === 'list';
    grid.classList.toggle('list-layout', isListLayout);
    grid.innerHTML = isListLayout
      ? items.map(item => this._listCardHtml(item)).join('')
      : items.map(item => this._cardHtml(item)).join('');

    this._bindCardClicks(grid);
  }

  _renderStats() {
    const container = document.getElementById('stats-content');
    if (!container) return;

    const total = this.data.length;
    const completed = this.data.filter(d => d.status === 'completed').length;
    const playing   = this.data.filter(d => d.status === 'playing').length;
    const planned   = this.data.filter(d => d.status === 'planned').length;
    const dropped   = this.data.filter(d => d.status === 'dropped').length;
    const rated     = this.data.filter(d => d.rating > 0);
    const avgRating = rated.length ? (rated.reduce((a,d)=>a+d.rating,0)/rated.length).toFixed(2) : '—';
    const maxRating = rated.length ? Math.max(...rated.map(d=>d.rating)) : 0; 
    const reviewed  = this.data.filter(d => d.notes).length;
    const perfect   = this.data.filter(d => d.rating === 10).length;

    const genreMap = {};
    this.data.forEach(d => d.genres.forEach(g => { genreMap[g] = (genreMap[g]||0)+1; }));
    const topGenres = Object.entries(genreMap).sort((a,b)=>b[1]-a[1]).slice(0,8);
    const maxGenreCount = topGenres[0]?.[1] || 1;

    const ratingDist = Array.from({length:10},(_,i)=>({score:i+1,count:0}));
    rated.forEach(d => {
      const bucket = Math.min(Math.round(d.rating),10) - 1;
      if (bucket >= 0) ratingDist[bucket].count++;
    });
    const maxDistCount = Math.max(...ratingDist.map(r=>r.count), 1);

    const gameCount  = this.data.filter(d=>d.type==='game').length;
    const movieCount = this.data.filter(d=>d.type==='movie').length;
    const animeCount = this.data.filter(d=>d.type==='anime').length;
    const tvCount    = this.data.filter(d=>d.type==='tv').length;

    container.innerHTML = `
      <div class="stat-card">
        <div class="stat-card-label">Total Entries</div>
        <div class="stat-card-value">${total}</div>
        <div class="stat-card-sub">${completed} completed · ${playing} active · ${planned} planned · ${dropped} dropped</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Average Rating</div>
        <div class="stat-card-value">${avgRating}</div>
        <div class="stat-card-sub">${rated.length} rated entries · ${perfect} perfect 10s</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Reviews Written</div>
        <div class="stat-card-value">${reviewed}</div>
        <div class="stat-card-sub">${((reviewed/total)*100).toFixed(0)}% of entries have a review</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">By Type</div>
        <div class="stat-card-value">${gameCount}</div>
        <div class="stat-card-sub">Games · ${movieCount} Movies · ${animeCount} Anime · ${tvCount} TV Shows</div>
      </div>
      <div class="stat-card" style="grid-column: span 2;">
        <div class="stat-card-label">Top Genres</div>
        <div class="genre-bars">
          ${topGenres.map(([g,c]) => `
            <div class="genre-bar-row">
              <div class="genre-bar-label"><span>${g}</span><span>${c}</span></div>
              <div class="genre-bar-track"><div class="genre-bar-fill" style="width:${(c/maxGenreCount*100).toFixed(1)}%"></div></div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="stat-card" style="grid-column: span 2;">
        <div class="stat-card-label">Rating Distribution</div>
        <div class="rating-dist">
          ${ratingDist.map(r => `
            <div class="rating-dist-bar" title="${r.score}: ${r.count} entries" style="height:${(r.count/maxDistCount*100).toFixed(1)}%"></div>
          `).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:0.65rem;color:var(--text-muted);font-family:var(--font-mono);">
          ${ratingDist.map(r=>`<span>${r.score}</span>`).join('')}
        </div>
      </div>
    `;
  }

  _renderFavorites() {
    const grid = document.getElementById('favorites-grid');
    if (!grid) return;
    const favs = [...this.data].filter(d => d.rating >= 9).sort((a,b) => b.rating - a.rating);
    grid.innerHTML = favs.map(item => this._cardHtml(item)).join('');
    this._bindCardClicks(grid);
  }

  _cardHtml(item) {
    const ratingHtml = item.rating > 0
      ? `<span class="media-card-rating"><i class="ph-fill ph-star"></i>${item.rating.toFixed(1)}</span>`
      : `<span class="media-card-rating unrated">—</span>`;
    return `
      <article class="media-card fade-in" data-id="${item.id}" role="button" tabindex="0" aria-label="${esc(item.title)}">
        <div class="media-card-poster-wrap">
          <img class="media-card-poster" src="${item.image || fallbackSvg(item.title)}" alt="${esc(item.title)}" loading="lazy" onerror="this.src='${fallbackSvg(item.title)}'">
          <div class="media-card-status-dot dot-${item.status}"></div>
          <div class="media-card-overlay">
            <div class="media-card-quick"><i class="ph ph-info"></i> View Details</div>
          </div>
        </div>
        <div class="media-card-info">
          <div class="media-card-title">${esc(item.title)}</div>
          <div class="media-card-meta">
            <span class="media-card-year">${item.year || '—'}</span>
            ${ratingHtml}
          </div>
        </div>
      </article>
    `;
  }

  _listCardHtml(item) {
    const statusClass = `chip-${item.status}`;
    const ratingHtml = item.rating > 0
      ? `<div class="list-card-rating"><i class="ph-fill ph-star"></i>${item.rating.toFixed(1)}</div>`
      : `<div class="list-card-rating" style="color:var(--text-muted)">—</div>`;
    return `
      <article class="media-card list-card fade-in" data-id="${item.id}" role="button" tabindex="0" aria-label="${esc(item.title)}">
        <div class="media-card-poster-wrap">
          <img class="media-card-poster" src="${item.image || fallbackSvg(item.title)}" alt="${esc(item.title)}" loading="lazy" onerror="this.src='${fallbackSvg(item.title)}'">
        </div>
        <div class="list-card-body">
          <div class="list-card-title">${esc(item.title)}</div>
          <div class="list-card-sub">${item.genres.slice(0,2).join(' · ')} · ${item.year || '?'}</div>
        </div>
        <span class="modal-status-chip ${statusClass}">${statusLabel(item)}</span>
        ${ratingHtml}
      </article>
    `;
  }

  _bindCardClicks(container) {
    container.querySelectorAll('[data-id]').forEach(el => {
      el.onclick = () => this._openModal(el.dataset.id);
      el.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._openModal(el.dataset.id); } };
    });
  }

  _openModal(id) {
    const item = this.data.find(d => d.id === id);
    if (!item) return;

    const wrap = document.getElementById('modal-wrap');
    if (!wrap) return;

    // Inside _openModal(id)
    imgWithFallback(item.banner, item.title, document.getElementById('modal-banner-img')); // <-- Changed to item.banner
    imgWithFallback(item.image, item.title, document.getElementById('modal-cover-img'));

    document.getElementById('modal-type-badge').textContent = typeLabel(item.type).toUpperCase();
    document.getElementById('modal-title').textContent = item.title;

    const statusEl = document.getElementById('modal-status-chip');
    statusEl.textContent = statusLabel(item);
    statusEl.className = `modal-status-chip chip-${item.status}`;

    document.getElementById('modal-year').textContent = item.year ? String(item.year) : '';

    const ratingBlock = document.getElementById('modal-rating-block');
    const ratingScore = document.getElementById('modal-rating-score');
    const ratingStarsEl = document.getElementById('modal-rating-stars');
    if (item.rating > 0) {
      ratingBlock.style.display = '';
      ratingScore.textContent = item.rating.toFixed(1);
      ratingStarsEl.innerHTML = ratingStars(item.rating);
    } else {
      ratingScore.textContent = 'NR';
      ratingStarsEl.innerHTML = '';
    }

    document.getElementById('modal-genres').innerHTML = item.genres.map(g => `<span class="genre-tag">${esc(g)}</span>`).join('');

    const reviewBody = document.getElementById('modal-review-body');
    if (item.notes) {
      reviewBody.classList.remove('no-review');
      reviewBody.innerHTML = `<p>${esc(item.notes)}</p>`;
    } else {
      reviewBody.classList.add('no-review');
      reviewBody.innerHTML = '<p>No review written yet for this entry.</p>';
    }

    const metaTable = document.getElementById('modal-meta-table');
    const metaRows = [
      ['Type', typeLabel(item.type)],
      ['Year', item.year || '—'],
      ['Status', statusLabel(item)],
      ...(item.genres.length ? [['Genres', item.genres.join(', ')]] : []),
    ];
    metaTable.innerHTML = metaRows.map(([k,v]) => `
      <span class="meta-key">${k}</span>
      <span class="meta-val">${esc(String(v))}</span>
    `).join('');

    // Fixed: Ensure the UI components are completely implemented based on realistic properties
    const actions = document.getElementById('modal-actions');
    if (item.url) {
        const actionText = item.type === 'game' ? 'View Details' : 'Watch Online';
        const icon = item.type === 'game' ? 'ph-download-simple' : 'ph-play-circle';
        const btnClass = item.type === 'game' ? 'modal-btn-download' : 'modal-btn-watch';
        actions.innerHTML = `
            <a href="${item.url}" class="modal-btn ${btnClass}" target="_blank" rel="noopener noreferrer">
                <i class="ph ${item.type === 'game' ? '' : 'ph-fill'} ${icon}"></i> ${actionText}
            </a>
        `;
    } else {
        actions.innerHTML = `<p class="modal-btn-note">No external link available.</p>`;
    }

    wrap.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
        wrap.classList.add('active');
        // Set focus to the modal for screenreaders / keyboard accessibility
        setTimeout(() => document.getElementById('modal-close')?.focus(), 100);
    });
    this._modalOpen = true;
  }

  _closeModal() {
    if (!this._modalOpen) return;
    const wrap = document.getElementById('modal-wrap');
    if (!wrap) return;
    wrap.classList.remove('active');
    document.body.style.overflow = '';
    this._modalOpen = false;
    setTimeout(() => {
      wrap.setAttribute('hidden', '');
      const b = document.getElementById('modal-banner-img');
      const c = document.getElementById('modal-cover-img');
      if (b) b.src = '';
      if (c) c.src = '';
    }, 350);
  }

  _handleSearch(query) {
    const q = query.toLowerCase().trim();
    const results = document.getElementById('search-results');
    const clearBtn = document.getElementById('search-clear-btn');
    if (!results) return;

    clearBtn?.classList.toggle('hidden', !q);

    if (!q) {
      results.innerHTML = '';
      return;
    }

    const matches = this.data
      .filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.genres.some(g => g.toLowerCase().includes(q)) ||
        String(d.year).includes(q) ||
        typeLabel(d.type).toLowerCase().includes(q)
      )
      .slice(0, 10);

    if (!matches.length) {
      results.innerHTML = `<div class="search-empty">No results for "<strong>${esc(query)}</strong>"</div>`;
      return;
    }

    results.innerHTML = matches.map(item => `
      <div class="search-result-item" data-id="${item.id}" tabindex="0">
        <img class="search-result-thumb" src="${item.image || fallbackSvg(item.title)}" alt="${esc(item.title)}" loading="lazy" onerror="this.src='${fallbackSvg(item.title)}'">
        <div class="search-result-info">
          <div class="search-result-title">${esc(item.title)}</div>
          <div class="search-result-meta">${typeLabel(item.type)} · ${item.year || '?'} · ${item.genres.slice(0,2).join(', ')}</div>
        </div>
        ${item.rating > 0 ? `<span class="search-result-rating">${item.rating.toFixed(1)}</span>` : ''}
      </div>
    `).join('');

    results.querySelectorAll('[data-id]').forEach(el => {
      const openResult = () => {
        this._closeSearch();
        this._openModal(el.dataset.id);
      };
      el.onclick = openResult;
      el.onkeydown = e => { if (e.key === 'Enter') openResult(); };
    });
  }

  _openSearch() {
    const overlay = document.getElementById('search-overlay');
    overlay?.classList.add('open');
    overlay?.setAttribute('aria-hidden', 'false');
    setTimeout(() => document.getElementById('global-search-input')?.focus(), 80);
  }

  _closeSearch() {
    const overlay = document.getElementById('search-overlay');
    overlay?.classList.remove('open');
    overlay?.setAttribute('aria-hidden', 'true');
    const input = document.getElementById('global-search-input');
    if (input) input.value = '';
    const results = document.getElementById('search-results');
    if (results) results.innerHTML = '';
    document.getElementById('search-clear-btn')?.classList.add('hidden');
  }

  _openDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    drawer?.classList.add('open');
    drawer?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  _closeDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    drawer?.classList.remove('open');
    drawer?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  _bindGlobalEvents() {
    document.addEventListener('click', e => {
      const navItem = e.target.closest('[data-view]');
      if (navItem && !navItem.closest('.modal-wrap')) {
        this._navigateTo(navItem.dataset.view);
      }
    });

    document.getElementById('mobile-menu-btn')?.addEventListener('click', () => this._openDrawer());
    document.getElementById('drawer-close')?.addEventListener('click', () => this._closeDrawer());
    document.getElementById('drawer-backdrop')?.addEventListener('click', () => this._closeDrawer());
    document.getElementById('mobile-search-btn')?.addEventListener('click', () => this._openSearch());

    document.getElementById('global-search-input')?.addEventListener('input', e => {
      clearTimeout(this._searchDebounce);
      this._searchDebounce = setTimeout(() => this._handleSearch(e.target.value), 200);
    });
    
    document.getElementById('search-clear-btn')?.addEventListener('click', () => {
      const inp = document.getElementById('global-search-input');
      if (inp) { inp.value = ''; inp.focus(); }
      document.getElementById('search-results').innerHTML = '';
      document.getElementById('search-clear-btn').classList.add('hidden');
    });
    
    document.getElementById('search-close-btn')?.addEventListener('click', () => this._closeSearch());
    document.getElementById('search-overlay-scrim')?.addEventListener('click', () => this._closeSearch());

    document.getElementById('sidebar-search-input')?.addEventListener('input', e => {
      const q = e.target.value.trim();
      if (q) {
        this._openSearch();
        const globalInput = document.getElementById('global-search-input');
        if (globalInput) {
          globalInput.value = q;
          this._handleSearch(q);
        }
        e.target.value = ''; 
      }
    });

    document.getElementById('modal-close')?.addEventListener('click', () => this._closeModal());
    document.getElementById('modal-backdrop')?.addEventListener('click', () => this._closeModal());

    document.getElementById('sort-select')?.addEventListener('change', e => {
      this.state.sortBy = e.target.value;
      this._renderLibraryGrid();
    });

    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.layout = btn.dataset.layout;
        this._renderLibraryGrid();
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (this._modalOpen) this._closeModal();
        else this._closeSearch();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this._openSearch();
      }
    });

    window.addEventListener('hashchange', () => {
      const hash = location.hash.replace('#','');
      const valid = ['home','games','movies','anime','tv','stats','favorites','socials'];
      if (hash && valid.includes(hash) && hash !== this.state.view) {
        this._navigateTo(hash);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.curator = new CuratorApp();
});

let playlist = new Playlist();
let player = new Player(playlist);
const victoryObj = {
    title : "Victory",
    artist : "Two Steps From Hell",
    duration : "5:29",
    audioSrc : "audio/victory.mp3",
    thumbnailImgSrc : "img/victory_thumbnailImg.jpg",
    mainImgSrc : "img/victory_mainImg.jpg"
}
const starSkyObj = {
    title : "Star Sky",
    artist : "Two Steps From Hell",
    duration : "5:35",
    audioSrc : "audio/starSky.mp3",
    thumbnailImgSrc : "img/starSky_thumbnailImg.jpg",
    mainImgSrc : "img/starSky_mainImg.jpg"
}
const onlyMyRailgunObj = {
    title : "Only My Railgun!",
    artist : "To Aru Gakuen No Railgun",
    duration : "4:12",
    audioSrc : "audio/onlyMyRailgun.mp3",
    thumbnailImgSrc : "img/toAruGakuenNoRailgun_thumbnailImg.png",
    mainImgSrc : "img/toAruGakuenNoRailgun_mainImg.png"
}
const lemonObj = {
    title : "Lemon",
    artist : "Yonezu Kenshi",
    duration : "4:16",
    audioSrc : "audio/lemon.mp3",
    mainImgSrc : "img/lemon.jpg",
    thumbnailImgSrc : "img/lemon.jpg"
}
const victory = new Song(victoryObj);
const starSky = new Song(starSkyObj);
const onlyMyRailgun = new Song(onlyMyRailgunObj);
const lemon = new Song(lemonObj);
playlist.addSong(victory);
playlist.addSong(starSky);
playlist.addSong(onlyMyRailgun);
playlist.addSong(lemon);
let playlistElement = playlist.createPlaylist();
player.appendPlaylist(playlistElement);
let control = new Control(playlist, player);
let visualizer = new Visualizer(control, playlist);

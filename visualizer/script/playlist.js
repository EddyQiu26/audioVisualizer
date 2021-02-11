class Playlist {
    constructor(){
        this.songs = [];
        this.playlistElement = document.createElement("div");
        this.togglePlayIcon = document.getElementById("togglePlayIcon");
        this.audioElement = document.querySelector("audio");
        this.playerPlaylist = document.getElementsByClassName("playerPlaylist")[0];
        this.playerSongElement = document.getElementsByClassName("playerSongElement");
        this.currentPlayingSongIndex = 0;
        this.previousSongPlayedIndex = 0;
        this.playing = false;
    }
    addSong = (newSong) => {
        this.songs.push(newSong);
    }
    createPlayerSongElement = (song) => {
        let songElement = document.createElement("div");
        let songElementImgContainer = document.createElement("div");
        let songElementImg = document.createElement("img");
        songElementImg.src = song.thumbnailImgSrc;
        let songInfoContainer = document.createElement("div");
        let artistElement = document.createElement("div");
        artistElement.textContent = song.artist;
        let titleElement = document.createElement("div");
        titleElement.textContent = song.title;
        songElementImgContainer.appendChild(songElementImg);
        songInfoContainer.appendChild(titleElement);
        songInfoContainer.appendChild(artistElement);
        songElement.appendChild(songElementImgContainer);
        songElement.appendChild(songInfoContainer);
        songElement.classList.add("playerSongElement");
        songElementImgContainer.classList.add("playerSongImgContainer");
        songElementImg.classList.add("playerSongImgElement");
        songInfoContainer.classList.add("songInfoContainer");
        artistElement.classList.add("playerArtistElement");
        titleElement.classList.add("playerTitleElement");
        return songElement;
    }
    createPlaylist = () => {
        this.playlistElement.classList.add("playerPlaylist");
        for(let i = 0; i < this.songs.length; i++){
            let song = this.createPlayerSongElement(this.songs[i]);
            this.playlistElement.appendChild(song);
        }
        return this.playlistElement;
    }
    nextSong = () =>  {
        this.playing = true;
        if(this.currentPlayingSongIndex == this.songs.length - 1){
            this.currentPlayingSongIndex = 0;
            this.previousSongPlayedIndex = this.songs.length - 1;
        } else {
            this.previousSongPlayedIndex = this.currentPlayingSongIndex;
            this.currentPlayingSongIndex++;
        }
        this.audioElement.src = this.songs[this.currentPlayingSongIndex].audioSrc;
        this.updateIcon();
        this.audioElement.play();
    }
    previousSong = () => {
        this.playing = true;
        if(this.currentPlayingSongIndex == 0){
            this.previousSongPlayedIndex = 0;
            this.currentPlayingSongIndex = this.songs.length - 1;
        } else {
            this.previousSongPlayedIndex = this.currentPlayingSongIndex;
            this.currentPlayingSongIndex--;
        }
        this.audioElement.src = this.songs[this.currentPlayingSongIndex].audioSrc;
        this.updateIcon();
        this.audioElement.play();
    }
    togglePlay = () => {
        if(this.audioElement.src == ""){
            this.audioElement.src = this.songs[this.currentPlayingSongIndex].audioSrc;
            this.playing = true;
            this.audioElement.play();
        } else {
            if(this.playing){
                this.playing = false;
                this.audioElement.pause();
            } else {
                this.playing = true;
                this.audioElement.play();
            }
        }
        this.updateIcon();
    }
    updateIcon = () => {
        if(this.playing){
            this.togglePlayIcon.textContent = "pause";
        } else {
            this.togglePlayIcon.textContent = "play_arrow";
        }
    }
    togglePlayingSongClass = () => {
        this.playerSongElement[this.previousSongPlayedIndex].classList.remove("currentSongPlaying");
        this.playerSongElement[this.currentPlayingSongIndex].classList.add("currentSongPlaying");
    }
}
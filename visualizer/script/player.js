class Player {
    constructor(playlist) {
        this.playlist = playlist;
        this.playlistContainer = document.getElementsByClassName("playlistContainer")[0];
        this.titleElement = document.getElementById("title");
        this.artistElement = document.getElementById("artist");
        this.progressMark = document.getElementsByClassName("progressMark")[0];
        this.durationProgressBar = document.getElementsByClassName("durationProgressBar")[0];
        this.durationField = document.getElementsByClassName("duration")[0];
        this.audioElement = document.querySelector('audio');
    }   
    appendPlaylist = (playlistElement) => {
        this.playlistContainer.appendChild(playlistElement);
    }
    updateSongImg = () => {
        let songImg = document.getElementsByClassName("songImg");
        for(let i = 0; i < songImg.length; i++){
            songImg[i].src = (playlist.songs[playlist.currentPlayingSongIndex].mainImgSrc);
        }
    }
    updateArtist = () => {
        this.artistElement.textContent = playlist.songs[playlist.currentPlayingSongIndex].artist;
    }
    updateTitle = () =>{
        this.titleElement.textContent = playlist.songs[playlist.currentPlayingSongIndex].title;
    }
    updateProgressBarAndMark = (e) => {
        if(this.audioElement.currentSrc !== ""){
            if(this.audioElement.paused){
                if((e.clientX-906) <= 0){
                    this.progressMark.style.left = "-3px";
                    this.durationProgressBar.style.width = "0px";
                } else if((e.clientX-909 >= 361)){
                    this.progressMark.style.left = "361px";
                    this.durationProgressBar.style.width = "100%"
                } else {
                    this.progressMark.style.left = (e.clientX-906)-3 + "px";
                    this.durationProgressBar.style.width = ((e.clientX - 906)/364*100) + "%";
                }
                this.audioElement.currentTime = (e.clientX - 906)*(this.audioElement.duration) / 361;
                this.audioElement.play();
                playlist.playing = true;
                playlist.updateIcon();
            } else {
                if((e.clientX-906) <= 0){
                    this.progressMark.style.left = "-3px";
                    this.durationProgressBar.style.width = "0px";
                } else if((e.clientX-909 >= 361)){
                    this.progressMark.style.left = "361px";
                    this.durationProgressBar.style.width = "100%"
                } else {
                    this.progressMark.style.left = (e.clientX-906)-3 + "px";
                    this.durationProgressBar.style.width = ((e.clientX - 906)/364*100) + "%";
                }
                this.audioElement.currentTime = (e.clientX - 906)*(this.audioElement.duration) / 361;
            }
        }
    }
    updateSongDuration = () => {
        this.durationField.textContent = playlist.songs[playlist.currentPlayingSongIndex].duration;
    }
    updateProgressBarAndMarkPosition = () => {
        this.progressMark.style.left = ((this.audioElement.currentTime * 361) / (this.audioElement.duration) - 3) + "px";
        this.durationProgressBar.style.width = ((this.audioElement.currentTime * 100) / (this.audioElement.duration)) + "%";
    }
}
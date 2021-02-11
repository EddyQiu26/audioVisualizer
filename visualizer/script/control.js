class Control {
    constructor(playlist, player){
        this.playlist = playlist;
        this.player = player;
        this.mainSongImg = document.getElementsByClassName("songImg")[0];
        this.player = document.getElementsByClassName("playerContainer")[0];
        this.previousBtn = document.getElementById("previous");
        this.togglePlayBtn = document.getElementById("togglePlay");
        this.nextBtn = document.getElementById("next");
        this.togglePlaylistBtn = document.getElementById("togglePlaylist");
        this.durationBar = document.getElementsByClassName("durationBar")[0];
        this.progressMark = document.getElementsByClassName("progressMark")[0];
        this.durationProgressBar = document.getElementsByClassName("durationProgressBar")[0];
        this.audioElement = document.querySelector("audio");
        this.timeElapsed = document.getElementsByClassName("timeElapsed")[0];
        this.playerSongElements = document.getElementsByClassName("playerSongElement");
        this.playerPlaylist = $(".playerPlaylist");
        this.canvas = document.querySelector("canvas");
        this.songImgDiv = document.getElementsByClassName("songImgDiv")[0];
        this.playNextSong();
        this.toggleOpenPlayer();
        this.registerEvents();
        this.deRegisterEvents();
        this.updateCurrentSongTime();
    }
    addRotateAnimation = () => {
        if(!this.canvas.classList.contains("rotateAnimation")){
            this.canvas.classList.add("rotateAnimation");
            // this.songImgDiv.classList.add("rotateAnimation");
        }
    }
    removeRotateAnimation = () => {
        this.canvas.classList.remove("rotateAnimation");
        // this.songImgDiv.classList.remove("rotateAnimation");
    }
    toggleRotateAnimationState = () => {
        if(this.canvas.style.animationPlayState == "running"){
            this.canvas.style.animationPlayState = "paused";
        } else {
            this.canvas.style.animationPlayState = "running";
        }
    }
    updateCurrentSongTime = () => {
        let currentSongTime = 0;
        let min = 0;
        let sec = 0;
        this.audioElement.addEventListener("timeupdate", () => {
            currentSongTime = this.audioElement.currentTime;
            min = Math.floor(currentSongTime / 60);
            sec = Math.floor(currentSongTime % 60);
            if(sec < 10){
                this.timeElapsed.textContent = min + ":0" + sec;
            } else {
                this.timeElapsed.textContent = min + ":" + sec;
            }
            player.updateProgressBarAndMarkPosition();
        })
    }
    toggleOpenPlayer = () => {
        let visualizerContainer = document.getElementsByClassName("visualizerContainer")[0];
        this.mainSongImg.addEventListener("click", () => {
            if(!visualizerContainer.classList.contains("showPlayer")){
                visualizerContainer.classList.add("showPlayer");
            } else {
                visualizerContainer.classList.remove("showPlayer");
            }
        })
    }
    togglePlaylist = ()=> {
        this.togglePlaylistBtn.addEventListener("click", this.togglePlaylistEventFn);
    }
    removePlaylistFn = () => {
        this.togglePlaylistBtn.removeEventListener("click", this.togglePlaylistEventFn);
    }
    togglePlaylistEventFn = () => {
        let playerPlaylistElement = document.getElementsByClassName("playerPlaylist")[0];
        let playerContainer = document.getElementsByClassName("playerContainer")[0];
        let playlistContainer = document.getElementsByClassName("playlistContainer")[0];
        if(playerPlaylistElement.classList.contains("expandPlaylist")){
            playerPlaylistElement.classList.remove("expandPlaylist");
            playlistContainer.classList.add("hide");
        } else {
            playerPlaylistElement.style.height =  (document.getElementsByClassName("playerSongImgDiv")[0].clientWidth) -30 + "px";
            playerPlaylistElement.classList.add("expandPlaylist");
            playlistContainer.classList.remove("hide");
            playerContainer.scrollTop = playerContainer.scrollHeight;
        }
        
    }
    next = () =>{
        this.nextBtn.addEventListener("click", this.nextFn);
    }
    removeNextFn = () => {
        this.nextBtn.removeEventListener("click", this.nextFn);
    }
    nextFn = ()=> {
        playlist.nextSong();
        player.updateSongImg();
        player.updateTitle();
        player.updateArtist();
        player.updateSongDuration();
        playlist.togglePlayingSongClass();
        this.addRotateAnimation();
    }
    previous = () => {
        this.previousBtn.addEventListener("click", this.previousFn);
    }
    removePreviousFn = () => {
        this.previousBtn.removeEventListener("click", this.previousFn);
    }
    previousFn = () => {
        playlist.previousSong();
        player.updateSongImg();
        player.updateTitle();
        player.updateArtist();
        player.updateSongDuration();
        playlist.togglePlayingSongClass();
        this.addRotateAnimation();
    }
    togglePlay = () => {
        this.togglePlayBtn.addEventListener("click", this.togglePlayFn);
    }
    removeTogglePlayFn = () => {
        this.nextBtn.removeEventListener("click", this.togglePlayFn);
    }
    togglePlayFn = () => {
        playlist.togglePlay();
        player.updateSongImg();
        player.updateTitle();
        player.updateArtist();
        player.updateSongDuration();
        playlist.togglePlayingSongClass();
        this.toggleRotateAnimationState();
        this.addRotateAnimation();
    }
    playNextSong = () => {
        this.audioElement.addEventListener("ended", this.nextFn);
    }
    listenForMouseEnterDurationBar = () => {
        this.durationBar.addEventListener("mouseenter", this.listenForMouseDownOnProgressMark);
    }
    listenForMouseOutFromDurationBar = () => {
        this.durationBar.addEventListener("mouseout", this.removeMouseMoveOnDurationBarEvent);
    }
    listenForMouseClickOnDurationBar = () => {
        this.durationBar.addEventListener("click", player.updateProgressBarAndMark);
    }
    listenForMouseDownOnProgressMark = () => {
        this.progressMark.addEventListener("mousedown", this.listenForMouseMoveOnDurationBar);
    } 
    listenForMouseMoveOnDurationBar = () => {
        this.durationBar.addEventListener("mousemove", player.updateProgressBarAndMark);
    }
    listenForMouseUpOnProgressMark = () => {
        this.progressMark.addEventListener("mouseup", this.removeMouseMoveOnDurationBarEvent);
    }
    removeMouseEnterDurationBarEvent = () => {
        this.durationBar.removeEventListener("mouseenter", this.listenForMouseDownOnProgressMark);
    }
    removeMouseClickOnDurationBar = () => {
        this.durationBar.removeEventListener("click", player.updateProgressBarAndMark);
    }
    removeMouseDownOnProgressMarkEvent = () => {
        this.progressMark.removeEventListener("mousedown", this.listenForMouseMoveOnDurationBar);
    }
    removeMouseUpOnProgressMarkEvent = () => {
        this.progressMark.removeEventListener("mouseup", this.removeMouseMoveOnDurationBarEvent);
    }
    removeMouseMoveOnDurationBarEvent = () => {
        this.durationBar.removeEventListener("mousemove", player.updateProgressBarAndMark);
    }
    removeMouseOutFromDurationBar = () => {
        this.durationBar.removeEventListener("mouseout", this.removeMouseMoveOnDurationBarEvent);
    }
    registerHighlightSongEvent(){
        this.playerPlaylist.on("click", ".playerSongElement", this.highlightSong);
    }
    deRegisterHighlightSongEvent(){
        this.playerPlaylist.off("click", ".playerSongElement", this.highlightSong);
    }
    highlightSong(){
        let songIndex = $(this).index();
        let playerplaylist = $(".playerPlaylist");
        let playerSongElement = document.getElementsByClassName("playerSongElement");
        let audioElement = document.querySelector("audio");
        playlist.previousSongPlayedIndex = playlist.currentPlayingSongIndex;
        playlist.currentPlayingSongIndex = songIndex;
        if(playerplaylist.find(playerSongElement[playlist.previousSongPlayedIndex]).hasClass("currentSongPlaying")){
            playerplaylist.find(playerSongElement[playlist.previousSongPlayedIndex]).removeClass("currentSongPlaying");
        }
        playerplaylist.find(playerSongElement[playlist.currentPlayingSongIndex]).addClass("currentSongPlaying");
        audioElement.src = playlist.songs[playlist.currentPlayingSongIndex].audioSrc;
        if(audioElement.paused){
            audioElement.play();
            playlist.playing = true;
            playlist.updateIcon();
        }
        player.updateSongImg();
        player.updateTitle();
        player.updateArtist();
        player.updateSongDuration();
    }
    registerEvents = () => {
        this.player.addEventListener("mouseenter",()=>{
            this.togglePlaylist();
            this.next();
            this.previous();
            this.togglePlay();
            this.listenForMouseEnterDurationBar();
            this.listenForMouseUpOnProgressMark();
            this.listenForMouseClickOnDurationBar();
            this.listenForMouseOutFromDurationBar();
            this.registerHighlightSongEvent();
        })
    }
    deRegisterEvents = () =>  {
        this.player.addEventListener("mouseleave", ()=>{
            this.removePlaylistFn();
            this.removeNextFn();
            this.removePreviousFn();
            this.removeTogglePlayFn();
            this.removeMouseMoveOnDurationBarEvent();
            this.removeMouseClickOnDurationBar();
            this.removeMouseUpOnProgressMarkEvent();
            this.removeMouseDownOnProgressMarkEvent();
            this.removeMouseEnterDurationBarEvent();
            this.removeMouseOutFromDurationBar();
            this.deRegisterHighlightSongEvent();
        })
    }

}
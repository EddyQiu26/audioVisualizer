class Song {
    constructor({title = "Title", artist = "Artist", duration = "0:00", audioSrc = "N/A", mainImgSrc = "img/no-img-icon.png", thumbnailImgSrc = mainImgSrc}){
        this.title = title;
        this.artist = artist;
        this.duration = duration;
        this.audioSrc = audioSrc;
        this.mainImgSrc = mainImgSrc;
        this.thumbnailImgSrc = thumbnailImgSrc;
    }
}
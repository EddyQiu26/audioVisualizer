window.addEventListener("load", () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let songInfo = document.getElementsByClassName("songInfo")[0];
    songInfo.style.marginTop = "calc(100vh * 35 / " + " " + windowHeight + ")"; 
    songInfo.style.marginBottom = "calc(100vh * 25 / " + " " + windowHeight + ")"; 
    let title = document.getElementById("title");
    title.style.marginTop = "calc(100vh * 10 / " + " " + windowHeight + ")";
    let previous = document.getElementById("previous");
    previous.style.paddingRight = "calc(100vw * 20 / " + " " + windowWidth + ")";
    let next = document.getElementById("next");
    next.style.paddingLeft = "calc(100vw * 20 / " + " " + windowWidth + ")";
    let durationContainer = document.getElementsByClassName("durationContainer")[0];
    durationContainer.style.marginTop = "calc(100vh * 30 / " + " " + windowHeight + ")";
    durationContainer.style.marginBottom = "calc(100vh * 38 / " + " " + windowHeight + ")";
    let durationBar = document.getElementsByClassName("durationBar")[0];
    durationBar.style.height = "calc(100vh * 6 / " + " " + windowHeight + ")";
    let progressMark = document.getElementsByClassName("progressMark")[0];
    progressMark.style.width = "calc(100vw * 6 / " + " " + windowWidth + ")";
    progressMark.style.height = "calc(100vh * 18 / " + " " + windowHeight + ")";
    let durationInfo = document.getElementsByClassName("durationInfo")[0];
    durationInfo.style.marginTop = "calc(100vh * 5 / " + " " + windowHeight + ")";
    let songInfoContainer = document.getElementsByClassName("songInfoContainer")[0];
    songInfoContainer.style.paddingRight = "calc(100vw * 5 / " + " " + windowWidth + ")";
    let artist = document.getElementById("artist");
    artist.style.marginTop = "calc(100vh * 10 / " + " " + windowHeight + ")";
})
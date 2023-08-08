const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progressContainer");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const imgContainer = document.getElementById("imgContainer");

const songs = [
  {
    name: "song1",
    displayName: "Shape of you",
    artist: "Ed Shreen",
  },
  {
    name: "song2",
    displayName: "Enchanted",
    artist: "Taylor Swift",
  },
  {
    name: "song3",
    displayName: "Fly High",
    artist: "Salena Gomez",
  },
  {
    name: "song4",
    displayName: "Love Me Like You Do",
    artist: "Taylor Swift",
  },
  {
    name: "song5",
    displayName: "Kesariya",
    artist: "Arijit Singh",
  },
  {
    name: "song6",
    displayName: "Pehli Mulaqat",
    artist: "Gurnam Bhullar",
  },
];
const images = [
  `img/song1.jpg`,
  `img/song2.jpg`,
  `img/song3.jpg`,
  `img/song4.jpg`,
  `img/song5.jpg`,
  `img/song6.jpg`,
];
imgContainer.style.backgroundImage = `url(${images[0]})`;

//check if playing
let isPlaying = false;

function playSong() {
  // console.log("hello");
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
  // updateProgressBar();
}
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  music.pause();
}
//play or pause event listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  //image.src = `img/${song.name}.jpg`;
}
//current song
let songIndex = 0;
//previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
//next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  imgContainer.style.backgroundImage = `url(${images[songIndex]})`;

  loadSong(songs[songIndex]);
  playSong();
}
//on load- select first song
loadSong(songs[songIndex]);

function updateProgressBar(e) {
  //going to pass e for event
  if (isPlaying) {
    //console.log("here");
    const { duration, currentTime } = e.srcElement; //object destructuring
    //update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`; //converting into string
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`; //make a template string by using ``
    }

    //delay switching duration element to avoid NAN (not a number)
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}: ${durationSeconds}`;
    }
    //calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`; //make a template string by using ``
    }
    currentTimeEl.textContent = `${currentMinutes}: ${currentSeconds}`;
  }
}
//set progress bar
function setProgressBar(e) {
  const width = this.clientWidth; //here this refers to element that received the event
  //console.log("width", width);
  const clickX = e.offsetX; //this is for how much total width is and on which width we click
  //console.log("clickX", clickX);
  const { duration } = music;
  //console.log(clickX / width);
  //console.log((clickX / width) * duration); //on which sec we clicked
  music.currentTime = (clickX / width) * duration; //currentTime is an attribute which sets the progress bar time as we play our song.
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong); //ended is an attribute which fires to next song a previous song is ended
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);

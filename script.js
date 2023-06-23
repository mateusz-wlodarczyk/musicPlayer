const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Remix",
    artist: "Jacinto Design",
  },
];

let isPlaying = false;
const playSong = function () {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};

const pauseSong = function () {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("Pause", "title");
  music.pause();
};

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

const loadSong = function (song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};
let songIndex = 0;

const nextSong = function () {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

const prevSong = function () {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
loadSong(songs[songIndex]);
const updateProgressBar = function (e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`;
    const durationMinutes = String(Math.floor(duration / 60));
    let durationSeconds = String(Math.floor(duration % 60)).padStart(2, 0);

    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

    const currentMinutes = String(Math.floor(currentTime / 60));
    let currentSeconds = String(Math.floor(currentTime % 60)).padStart(2, 0);

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

const setProgressBar = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;

  const { duration } = music;

  music.currentTime = (clickX / width) * duration;
};

music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
music.addEventListener("ended", nextSong);

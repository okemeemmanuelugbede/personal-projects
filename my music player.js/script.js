let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let shuffle_btn = document.querySelector(".shuffle-track");
let Repeat_btn = document.querySelector(".repeat-track");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let tracklist = document.querySelector("#Tracklist");

let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let isRepeatOn = false;
let updateTimer;
let curr_track = document.createElement("audio");
let track_list = [
  {
    name: "80 film",
    artist: "Broke For free",
    Image: "image URL",
    path: "https://assets.mixkit.co/music/132/132.mp3",
  },
  {
    name: "Enthusiast",
    artist: "tours",
    Image: "image URL",
    path: "https://assets.mixkit.co/music/132/132.mp3",
  },
  {
    name: "shipping lanes",
    artist: "chad crouch",
    Image: "image URL",
    path: "https://assets.mixkit.co/music/132/132.mp3",
  },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();
  track_art.style.backgroundImage =
    "url(" + track_list[track_index].Image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent =
    "PLAYING" + "  " + (track_index + 1) + " " + "OF" + " " + track_list.length;
  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}
function random_bg_color() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  document.body.style.background = bgColor;
}
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();

  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function playTrack() {
  curr_track.play();
  isPlaying = true;

  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;

  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (track_index < track_list.length - 1) {
    track_index += 1;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = track_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function shuffleTrack() {
  let shuffleditems = [...track_list];
  for (let i = shuffleditems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleditems[i], shuffleditems[j]] = [shuffleditems[j], shuffleditems[i]];
  }
  return shuffleditems;
}
function shuffleList() {
  const shuffledItems = shuffleTrack();
  track_list = shuffledItems;
  loadTrack(track_index);
  playTrack();
}

shuffle_btn.addEventListener("click", shuffleList);

function RepeatTrack() {
  isRepeatOn = !isRepeatOn;
  curr_track.loop = isRepeatOn;
  if (isRepeatOn) {
    loadTrack(track_index);
    playTrack();
  }
}
Repeat_btn.addEventListener("click", RepeatTrack);

function seekTo() {
  let seekPosition = (seek_slider.value / 100) * curr_track.duration;
  curr_track.currentTime = seekPosition;
}

seek_slider.addEventListener("input", seekTo);

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
  if (!curr_track.paused) {
    playTrack();
  }
}
volume_slider.addEventListener("input", setVolume);

function seekUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
loadTrack(track_index);

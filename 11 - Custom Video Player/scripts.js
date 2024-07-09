const video = document.querySelector('.player__video.viewer');
const progressBarDiv = document.querySelector('.progress');
let isClicked = false;
const progressBar = document.querySelector('.progress__filled');
const volume = document.getElementsByName('volume')[0];
const playback = document.getElementsByName('playbackRate')[0];
const playerButtons = document.querySelectorAll('.player__button');
const toggleButton = playerButtons[0];
const forwardSkip = playerButtons[1];
const backwardSkip = playerButtons[2];

progressBar.style.flexBasis = `0%`;

function toggleStatus() {
    if (video.paused) {
        video.play();
        toggleButton.textContent = '⏸';
    } else {
        video.pause();
        toggleButton.textContent = '▶️';
    }
}

function handleEnd() {
    video.currentTime = 0;
    video.pause();
    toggleButton.textContent = '▶️';
}

function updateProgressBar(e) {
    if (isClicked) return;
    const progress = e.target.currentTime / e.target.duration
    progressBar.style.flexBasis = `${progress * 100}%`;
}

function setProgressBar(e) {
    const progress = e.offsetX / this.getBoundingClientRect().width;
    video.currentTime = video.duration * progress;
    // console.log(progress);
    progressBar.style.flexBasis = `${progress * 100}%`;
}

function handleProgressBarMouseDown(e) {
    isClicked = true;
}

function handleProgressBarMouseMove(e) {
    if (!isClicked) {
        return;
    }
    const progress = e.offsetX / progressBarDiv.getBoundingClientRect().width;
    progressBar.style.flexBasis = `${progress * 100}%`;
    video.currentTime = video.duration * progress;
    // console.log(progress);
    
}

function handleProgressBarMouseUp(e) {
    isClicked = false;
}



function setVolume() {
    // console.log(this.value);
    video.volume = this.value;
}

function setPlaybackRate() {
    // console.log(this.value);
    video.playbackRate = this.value;
}

function handleSkip() {
    const second = Number(this.getAttribute('data-skip'));
    const currentTime = video.currentTime;
    const duration = video.duration;
    if (currentTime + second < 0) {
        video.currentTime = 0;
    } else if (currentTime + second > duration) {
        video.currentTime = duration;
    } else {
        video.currentTime += second;
    }
}

video.addEventListener('click', toggleStatus);
video.addEventListener('ended', handleEnd);
video.addEventListener('timeupdate', updateProgressBar);
progressBarDiv.addEventListener('mousedown', handleProgressBarMouseDown);
progressBarDiv.addEventListener('mousemove', handleProgressBarMouseMove);
progressBarDiv.addEventListener('mouseup', handleProgressBarMouseUp);
progressBarDiv.addEventListener('mouseout', handleProgressBarMouseUp);
progressBarDiv.addEventListener('click', setProgressBar);
progressBar.addEventListener('click', setProgressBar);
toggleButton.addEventListener('click', toggleStatus);
volume.addEventListener('change', setVolume);
playback.addEventListener('change', setPlaybackRate);
forwardSkip.addEventListener('click', handleSkip);
backwardSkip.addEventListener('click', handleSkip);

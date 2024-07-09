const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    console.log("Let's get this party started")
}

function drawCanvas() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome!" />`;
    strip.insertBefore(link, strip.firstChild);
}

navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
        console.log(video);
        video.play();
        drawCanvas();
    })
    .catch((error) => {
        console.error('Error access the camera: ', error)   ;
    })

console.log('Stop');

video.addEventListener('timeupdate', drawCanvas);

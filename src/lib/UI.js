const $camVideo = document.querySelector('#cam-video');
const $camOverlay = document.querySelector('#cam-overlay');
const $camCanvas = $camOverlay.getContext("2d");

export const UI = {

  init: function() {

  },

  initVideo: async function(constraints) {

    // get video stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    $camVideo.srcObject = stream;

    return new Promise(resolve => {
      $camVideo.onloadeddata = () => {
        resolve($camVideo);
      };
    });
  },

  clearOverlay: function() {
    $camCanvas.clearRect(0, 0, $camOverlay.width, $camOverlay.height);
  },

  drawPoint: function(x, y, r, color) {
    $camCanvas.beginPath();
    $camCanvas.arc(x, y, r, 0, 2 * Math.PI);
    $camCanvas.fillStyle = color;
    $camCanvas.fill();
  },
}
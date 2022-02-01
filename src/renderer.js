/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

import { UI } from './lib/UI'
import MoveNet from './lib/Movenet';
import CameraConfig from './config/CameraConfig';

// store a reference to the player video
var camVideo;

const DETECTION_THRESHOLD = 0.35;

// setup & initialization
// -----------------------------------------------------------------------------
async function onInit() {

  const videoPromise = UI.initVideo(CameraConfig);
  const initModelPromise = MoveNet.init();

  console.log("Initializing application...");

  Promise.all([videoPromise, initModelPromise])
  .then(result => {

    // result[0] will contain the initialized video element
    camVideo = result[0];
    camVideo.play();

    startPrediction();
  });
}
//-----

function startPrediction() {

  const predict = async function() {

    setTimeout(() => {
      MoveNet.estimatePoses(camVideo).then(result => {
        UI.clearOverlay();
        result.forEach(keyPoint => {
          if(keyPoint.score >= DETECTION_THRESHOLD) {
            // source image is mirrored => x coordinate must be flipped
            UI.drawPoint(640 - keyPoint.x, keyPoint.y, 5, "blue");
          }
        });
        predict();
      });
    }, 0);
  }

  predict();
}

onInit();

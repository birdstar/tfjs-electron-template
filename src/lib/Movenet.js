// import MoveNet
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';

// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
// import '@tensorflow/tfjs-backend-wasm';

// store references
let detector;

const MoveNet = {

  init: async function() {

    const detectorConfig = {
      modelUrl: "static://models/movenet/model.json",
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING
    };

    detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet, detectorConfig
    );

    console.log("Detector created");
  },

  estimatePoses: async function(sourceElement) {
    const poses = await detector.estimatePoses(sourceElement);
    return poses[0].keypoints;
  },
}

export default MoveNet;

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceDetector() {
  const videoRef = useRef(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    async function loadModels() {
      const MODEL_URL = "/models";

      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

      startVideo();
    }
    loadModels();
  }, []);

  function startVideo() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => (videoRef.current.srcObject = stream))
      .catch((err) => console.error("Camera Error:", err));
  }

  const startDetection = () => {
    if (isDetecting) return; // avoid multiple starts
    setIsDetecting(true);

    const video = videoRef.current;

    intervalRef.current = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (!detections.length) {
        console.log("No face found");
        return;
      }

      const expressions = detections[0].expressions;
      let detec = null;

      for (let exp in expressions) {
        if (expressions[exp] > 0.5) {
          detec = exp;
        }
      }
    }, 200);
  };

  return (
    <div className="w-full flex justify-between items-center">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-1/2 rounded-2xl"
      ></video>

      <div className="w-1/2 flex justify-center">
        <button
          onClick={startDetection}
          className="bg-blue-600 text-white py-2 px-5 capitalize rounded-2xl cursor-pointer"
        >
          Detect
        </button>
      </div>
    </div>
  );
}

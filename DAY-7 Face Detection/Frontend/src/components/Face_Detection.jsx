import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export default function FaceDetector({ setsong, setinitalval }) {
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const lastMoodRef = useRef("");

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
    if (isDetecting) return;
    setIsDetecting(true);
    setinitalval(true);

    const video = videoRef.current;

    intervalRef.current = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (!detections.length) return;

      const expressions = detections[0].expressions;

      // find the highest expression
      const mood = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );

      // avoid calling API repeatedly
      if (mood === lastMoodRef.current) return;
      lastMoodRef.current = mood;

      try {
        const response = await axios.get(
          `http://localhost:3000/song?mood=${mood}`
        );
        setsong(response.data.songs ?? response.data.song ?? response.data);
      } catch (err) {
        console.log("API error:", err);
      }
    }, 300);
  };

  return (
    <div className="w-full flex flex-col justify-between items-center gap-5">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-1/2 rounded-2xl"
      ></video>

      <div className="w-1/2 flex justify-center">
        <button
          onClick={startDetection}
          className="bg-blue-600 text-white py-2 px-5 capitalize rounded cursor-pointer"
        >
          take expression
        </button>
      </div>
    </div>
  );
}

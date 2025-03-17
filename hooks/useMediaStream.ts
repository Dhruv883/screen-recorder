import { useState, useCallback } from "react";

interface MediaStreamOptions {
  screen: boolean;
  webcam: boolean;
  audio: boolean;
}

export const useMediaStream = () => {
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const getMediaStreams = useCallback(async (options: MediaStreamOptions) => {
    try {
      stopStreams();

      if (options.audio) {
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: {
              autoGainControl: true,
            },
          });
          setMicrophoneStream(audioStream);
          console.log("Audio Stream", audioStream);
        } catch (err) {
          console.error("Error getting microphone stream:", err);
        }
      }

      if (options.screen) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
        setScreenStream(stream);
      }

      if (options.webcam) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          setWebcamStream(stream);
        } catch (err) {
          console.error("Error getting webcam stream:", err);
        }
      }

      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to get media streams"
      );
      console.error("Error getting media streams:", err);
    }
  }, []);

  const stopStreams = useCallback(() => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
    }
    if (webcamStream) {
      webcamStream.getTracks().forEach((track) => track.stop());
      setWebcamStream(null);
    }
    if (microphoneStream) {
      microphoneStream.getTracks().forEach((track) => track.stop());
      setMicrophoneStream(null);
    }
  }, [screenStream, webcamStream, microphoneStream]);

  return {
    screenStream,
    webcamStream,
    microphoneStream,
    error,
    getMediaStreams,
    stopStreams,
  };
};

import React, { useEffect, useRef } from "react";

interface VideoPreviewProps {
  screenStream: MediaStream | null;
  webcamStream: MediaStream | null;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  screenStream,
  webcamStream,
}) => {
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const webcamVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (screenVideoRef.current && screenStream) {
      screenVideoRef.current.srcObject = screenStream;
    }
  }, [screenStream]);

  useEffect(() => {
    if (webcamVideoRef.current && webcamStream) {
      webcamVideoRef.current.srcObject = webcamStream;
    }
  }, [webcamStream]);

  return (
    <div className="relative w-full h-full flex justify-center items-center bg-gray-900">
      {screenStream && (
        <div className="relative w-full max-w-4xl">
          <video
            ref={screenVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}

      {webcamStream && (
        <div className="absolute top-4 right-4 w-64">
          <video
            ref={webcamVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}

      {!screenStream && !webcamStream && (
        <div className="text-white text-xl">
          No preview available. Start recording to see preview.
        </div>
      )}
    </div>
  );
};

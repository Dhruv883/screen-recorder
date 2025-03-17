"use client";

import React, { useState } from "react";
import { RecordingOptions } from "@/components/RecordingOptions";
import { VideoPreview } from "@/components/VideoPreview";
import { ControlBar } from "@/components/ControlBar";
import { useMediaStream } from "@/hooks/useMediaStream";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";

const RecordPage = () => {
  const [showOptions, setShowOptions] = useState(true);
  const {
    screenStream,
    webcamStream,
    microphoneStream,
    getMediaStreams,
    stopStreams,
  } = useMediaStream();

  const { isRecording, recordingData, startRecording, stopRecording } =
    useMediaRecorder();

  const handleStart = async (options: {
    screen: boolean;
    webcam: boolean;
    audio: boolean;
  }) => {
    await getMediaStreams(options);
    setShowOptions(false);
  };

  const handleBack = () => {
    stopStreams();
    setShowOptions(true);
  };

  const handleStartRecording = () => {
    const videoTracks: MediaStreamTrack[] = [];
    const audioTracks: MediaStreamTrack[] = [];

    if (screenStream) {
      screenStream.getVideoTracks().forEach((track) => videoTracks.push(track));
      screenStream.getAudioTracks().forEach((track) => audioTracks.push(track));
    }

    if (webcamStream) {
      webcamStream.getVideoTracks().forEach((track) => videoTracks.push(track));
    }

    if (microphoneStream) {
      microphoneStream
        .getAudioTracks()
        .forEach((track) => audioTracks.push(track));
    }

    const allTracks = [...videoTracks, ...audioTracks];

    if (allTracks.length > 0) {
      const combinedStream = new MediaStream(allTracks);
      startRecording(combinedStream);
    }
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {showOptions ? (
        <RecordingOptions onStart={handleStart} />
      ) : (
        <>
          <div className="h-screen pb-20">
            <VideoPreview
              screenStream={screenStream}
              webcamStream={webcamStream}
            />
          </div>
          <ControlBar
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            onBack={handleBack}
          />
        </>
      )}

      {recordingData && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg">
          <a
            href={recordingData.url}
            download="recording.webm"
            className="text-blue-600 hover:text-blue-800"
          >
            Download Recording
          </a>
        </div>
      )}
    </div>
  );
};

export default RecordPage;

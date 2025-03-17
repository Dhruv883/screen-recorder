import React, { useState } from "react";
import { RecordingOptions } from "./components/RecordingOptions";
import { VideoPreview } from "./components/VideoPreview";
import { ControlBar } from "./components/ControlBar";
import { useMediaStream } from "./hooks/useMediaStream";
import { useMediaRecorder } from "./hooks/useMediaRecorder";

export const App: React.FC = () => {
  const [showOptions, setShowOptions] = useState(true);
  const { screenStream, webcamStream, getMediaStreams, stopStreams } =
    useMediaStream();
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
    // Combine streams if both screen and webcam are present
    if (screenStream && webcamStream) {
      const tracks = [...screenStream.getTracks(), ...webcamStream.getTracks()];
      const combinedStream = new MediaStream(tracks);
      startRecording(combinedStream);
    } else {
      // Use whichever stream is available
      const stream = screenStream || webcamStream;
      if (stream) {
        startRecording(stream);
      }
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

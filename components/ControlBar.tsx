import React from "react";

interface ControlBarProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onBack: () => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  onBack,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Back to Options
        </button>
        <div className="flex items-center space-x-4">
          {!isRecording ? (
            <button
              onClick={onStartRecording}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <div className="w-3 h-3 rounded-full bg-white" />
              <span>Start Recording</span>
            </button>
          ) : (
            <button
              onClick={onStopRecording}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <div className="w-3 h-3 bg-white" />
              <span>Stop Recording</span>
            </button>
          )}
        </div>
        <div className="w-24" />
      </div>
    </div>
  );
};
